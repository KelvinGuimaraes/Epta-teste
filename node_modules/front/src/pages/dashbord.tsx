import { useEffect, useState } from 'react';
import { api } from '../services/api';
import VehicleTable from '../components/Vetabela';
import VehicleModal from '../components/Vemodal';

type Vehicle = {
  id: string;
  status: string;
  name: string;
};


export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [openModal, setOpenModal] = useState(false);

  async function fetchVehicles() {
    const res = await api.get('/vehicles');
    setVehicles(res.data);
    const active = res.data.filter((v: Vehicle) => v.status === 'ACTIVE').length;
    const inactive = res.data.length - active;
    setStats({ total: res.data.length, active, inactive });
  }

  useEffect(() => { fetchVehicles(); }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Veículos', value: stats.total, icon: '🚗' },
          { label: 'Ativos', value: stats.active, icon: '✅' },
          { label: 'Inativos', value: stats.inactive, icon: '💤' },
        ].map((c) => (
          <div key={c.label} className="card">
            <span className="text-4xl">{c.icon}</span>
            <span className="text-2xl font-semibold">{c.value}</span>
            <span className="text-gray-500">{c.label}</span>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={() => setOpenModal(true)}>
        Novo Veículo
      </button>

      <VehicleTable
        data={vehicles}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nome' },
          { key: 'status', label: 'Status' },
        ]}
      />

      {openModal && (
        <VehicleModal
          onClose={() => setOpenModal(false)}
          onSuccess={fetchVehicles}
        />
      )}
    </div>
  );
}
