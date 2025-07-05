import { Router } from 'express';
import { newVehicle, findAll, update, archive, unarchive, remove } from './Veiculo.controller';
import { ensureAuth } from '../middlewares/auth';
import { RequestHandler } from 'express';

export const router = Router();

router.use(ensureAuth as RequestHandler);

router.get('/vehicles', findAll);
router.post('/vehicles', newVehicle);
router.patch('/vehicles/:id', update);
router.patch('/vehicles/:id/archive', archive);
router.patch('/vehicles/:id/unarchive', unarchive);
router.delete('/vehicles/:id', remove);

export { router as vehicleRouter };
