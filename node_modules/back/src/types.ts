export type VehicleStatus = 'ACTIVE' | 'INACTIVE';

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  status: VehicleStatus;
  createdAt: string;        // se você devolve ISO string
}