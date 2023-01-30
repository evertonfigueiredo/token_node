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

app.use("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Teste"
    })
})


app.get('/api', (req, res) => {
    const randomId = `${Math.random()}`.slice(2);
    const path = `/api/item/${randomId}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});


export default app;