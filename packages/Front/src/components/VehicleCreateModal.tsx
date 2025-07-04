// src/VehicleCreateModal.tsx
import { useState } from 'react';
import { api } from '../services/api';

export function VehicleCreateModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/vehicles', { name, plate });
      onCreated();
      onClose();
    } catch {
      setError('Erro ao cadastrar veículo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Novo Veículo</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome do Veículo:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />

          <label>Placa (ex: ABC-1234):</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            required
            pattern="[A-Z]{3}-\d{4}"
            title="Formato: ABC-1234"
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
