import express from "express";
const router = express.Router();

import controller from "../controllers/usuarioControllers.js";
import authControllers from "../controllers/authControllers.js";

router.get("/", authControllers.verificarToken, controller.getAll);
router.post("/criar", controller.criarUsuario);
router.get("/teste", async (req, res) => {
    return res.json({
        msg: "teste realizado"
    })
})
router.post("/login", authControllers.login)
router.get("/rotaAutenticada", authControllers.verificarToken, controller.rotaAutenticada)

export default router;