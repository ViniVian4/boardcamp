import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cors from 'cors';

import categoriesRouter from './routers/categoriesRouter.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);


app.listen(process.env.PORT, () => console.log(`Magic Happens on ${process.env.PORT}`));