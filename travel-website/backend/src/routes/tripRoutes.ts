import { Router } from 'express';
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController';

const router = Router();

router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;
