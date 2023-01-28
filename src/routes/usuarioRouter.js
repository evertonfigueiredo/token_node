import express from "express";
const router = express.Router();

import controller from "../controllers/usuarioControllers.js";
import authControllers from "../controllers/authControllers.js";

router.get("/", controller.getAll);
router.post("/criar", controller.criarUsuario);

router.post("/login", authControllers.login)
router.post("/rotaAutenticada", authControllers.verificarToken, controller.rotaAutenticada)

export default router;