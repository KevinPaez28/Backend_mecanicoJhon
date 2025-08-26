import express from "express";

import usuariosController from "../controllers/usuarioController.js";
import { camposUsuarios } from "../middlewares/usuarios/ValidacionCampos.js";
import { verifyToken } from "../middlewares/AuthToken/AuthToken.js"; 
import { login, refreshToken, register } from "../controllers/AuthController.js";

const router = express.Router();

// Rutas públicas
router.post("/", camposUsuarios, register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Rutas protegidas con token
router.get("/", usuariosController.getUsuarios);
router.get("/buscar", verifyToken, usuariosController.getByidUsuarios);
router.get("/:id", verifyToken, usuariosController.getByidUsuarios);
router.put("/activar/:id", verifyToken, usuariosController.ActivarUsuarios);
router.put("/:id", verifyToken,usuariosController.actualizarUsuarios);
router.put("/desactivar/:id", verifyToken, usuariosController.desactivarUsuarios);

export default router;
