// src/App.tsx
import { useState, useEffect } from 'react';
import { api } from './services/api';
import type { Vehicle } from '../../Back/src/types';
import { VehicleCreateModal } from '../src/components/VehicleCreateModal';
import { toggleTheme } from './main';
import './App.css';

type Stats = { total: number; active: number; inactive: number };

export default function App() {
  const [vehicles, setVehicles]   = useState<Vehicle[]>([]);
  const [stats,    setStats]      = useState<Stats>({ total: 0, active: 0, inactive: 0 });
  const [loading,  setLoading]    = useState<boolean>(true);
  const [error,    setError]      = useState<string | null>(null);

  /** Obtém veículos e calcula contadores */
  async function fetchVehicles() {
    try {
      setLoading(true);
      const res  = await api.get<Vehicle[]>('/vehicles');
      const list = res.data;
      setVehicles(list);

      const active   = list.filter(v => v.status === 'ACTIVE').length;
      const inactive = list.length - active;
      setStats({ total: list.length, active, inactive });
    } catch (err: unknown) {
      console.error(err);
      setError('Não foi possível carregar veículos');
    } finally {
      setLoading(false);
    }
  }

  const [showModal, setShowModal] = useState(false);

  /* Carrega logo que o componente monta */
  useEffect(() => { fetchVehicles(); }, []);

  return (
    <div className="app-shell">
      {/* ---------- Sidebar ---------- */}
      <aside className="sidebar">
        <h2 style={{ marginBottom: '1.5rem' }}>🚗 Fleet</h2>
        <a href="#" className="nav-item active">Dashboard</a>
        <a href="#" className="nav-item">Relatórios (WIP)</a>

        <button className="btn btn-ghost" onClick={toggleTheme} style={{ marginTop: '2rem' }}>
          🌓Tema
        </button>
      </aside>

      {/* ---------- Conteúdo ---------- */}
      <main className="content">
        {/* Loader ou erro */}
        {loading && <p>Carregando...</p>}
        {error   && <p style={{ color: 'var(--error)' }}>{error}</p>}

        {/* ---------- Cards ---------- */}
        {!loading && !error && (
          <>
            <section className="cards-grid">
              <Card icon="🚗" label="Veículos" value={stats.total} />
              <Card icon="✅" label="Ativos"   value={stats.active} />
              <Card icon="💤" label="Inativos" value={stats.inactive} />
            </section>

            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
              style={{ marginBottom: '1rem' }}
            >
              + Novo veículo
            </button>

            {showModal && (
              <VehicleCreateModal
                onClose={() => setShowModal(false)}
                onCreated={fetchVehicles}
              />
            )}

            {/* ---------- Tabela ---------- */}
            <VehicleTable
              data={vehicles}
              refresh={fetchVehicles}   /* depois de editar/excluir */
            />
          </>
        )}
      </main>
    </div>
  );
}

/* ---------- Card auxiliar ---------- */
function Card({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="card">
      <span className="icon">{icon}</span>
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </div>
  );
}

/* ---------- Tabela simples ---------- */
function VehicleTable({
  data,
  refresh,
}: {
  data: Vehicle[];
  refresh: () => void;
}) {
  if (!data.length) return <p>Nenhum veículo cadastrado.</p>;

  return (
    <div className="table-wrapper">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Placa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.plate}</td>
              <td>
                <span
                  className={`status-pill ${
                    v.status === 'ACTIVE' ? 'status-active' : 'status-inactive'
                  }`}
                >
                  {v.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                {/* Exemplo de ação */}
                <button className="btn btn-ghost" onClick={() => console.log('Editar', v.id)}>
                  ✏️
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={async () => {
                    const route = v.status === 'ACTIVE' ? 'archive' : 'unarchive';
                    await api.patch(`/vehicles/${v.id}/${route}`);
                    refresh(); // atualiza
                  }}
                >
                  {v.status === 'ACTIVE' ? '🗃️' : '♻️'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (confirm('Excluir veículo?')) {
                      await api.delete(`/vehicles/${v.id}`);
                      refresh();
                    }
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
