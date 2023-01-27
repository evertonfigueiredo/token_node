import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import * as dotenv from "dotenv";
dotenv.config()

app.use(express.json());

import db from "./database/mongoConfig.js"
db.connect();

import usarioRoutes from "./routes/usuarioRouter.js"

app.use("/usuario", usarioRoutes)

export default app;