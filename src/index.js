import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
server.use(cors());
server.use(express.json());




app.listen(process.env.PORT, () => console.log(`Magic Happens on ${process.env.PORT}`));