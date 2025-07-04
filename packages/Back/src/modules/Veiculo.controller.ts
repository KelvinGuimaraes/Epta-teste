import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { z } from 'zod';

const vehicleSchema = z.object({
  name: z.string().min(2),
  plate: z.string().regex(/^[A-Z]{3}-\d{4}$/)
});

export async function createVehicle(req: Request, res: Response) {
  try {
    const { nome, placa } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { nome, placa, status: 'ACTIVE' }, // status inicial ativo
    });
    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar veículo.' });
  }
}

export const findAll = (req: Request, res: Response) => {
  // Sua lógica para buscar todos os veículos
  res.send([]);
};

export const update = (req: Request, res: Response) => {
  // Sua lógica para atualizar um veículo
  res.send('Veículo atualizado');
};

export const archive = (req: Request, res: Response) => {
  // Sua lógica para arquivar um veículo
  res.send('Veículo arquivado');
};

export const unarchive = (req: Request, res: Response) => {
  // Sua lógica para desarquivar um veículo
  res.send('Veículo desarquivado');
};

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.vehicle.delete({ where: { id: Number(id) } });
  res.status(204).send();
}