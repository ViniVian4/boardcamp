import express from 'express';
import { getCategories, postCategories } from '../controllers/categoriesControllers.js';
import verifyCategoryInput from '../middlewares/categoriesMiddlewares.js';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', verifyCategoryInput, postCategories);

export default router;