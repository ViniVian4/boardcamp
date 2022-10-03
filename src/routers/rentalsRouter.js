import express from 'express';

import { getRentals, postNewRental, completeRental, deleteRental } from '../controllers/rentalsController.js';
import { verifyNewRental, verifyDbRental } from '../middlewares/rentalsMiddleware.js';


const router = express.Router();

router.get('/rentals', getRentals);
router.post('/rentals', verifyNewRental, postNewRental);
router.post('/rentals/:id/return', verifyDbRental, completeRental);
router.delete('/rentals/:id', verifyDbRental, deleteRental);

export default router;