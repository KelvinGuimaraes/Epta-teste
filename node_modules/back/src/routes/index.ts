import { authRouter } from './auth/auth.router';
import { vehicleRouter } from '../modules/veiculo.rota';
import { Router } from 'express';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/vehicles', vehicleRouter);