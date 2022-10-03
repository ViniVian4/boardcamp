import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import categoriesRouter from './routers/categoriesRouter.js';
import gamesRouter from './routers/gamesRouter.js';
import customersRouter from './routers/customersRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

app.listen(5000, () => console.log(`Magic Happens on ${process.env.PORT}`));