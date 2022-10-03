import express from 'express';

import { getCustomers, getCustomer, insertCustomer, editCustomer } from '../controllers/customersControllers.js';
import { verifyCustomer } from '../middlewares/customersMiddleware.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomer);
router.post('/customers', verifyCustomer, insertCustomer);
router.put('/customers/:id', verifyCustomer, editCustomer);

export default router;