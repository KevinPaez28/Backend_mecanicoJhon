import express from "express";

import usuariosController from "../controllers/usuarioController.js";
import { camposUsuarios } from "../middlewares/usuarios/ValidacionCampos.js";
import { verifyToken } from "../middlewares/AuthToken/AuthToken.js"; 
import { login, refreshToken, register } from "../controllers/AuthController.js";
import { TienePermisos } from "../middlewares/Permisos/tienepermisos.js";
const router = express.Router();

// Rutas públicas
router.post("/", TienePermisos("Usuarios_Crear"), camposUsuarios, register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Rutas protegidas con token
router.get("/",  usuariosController.getUsuarios);
router.get("/buscar", usuariosController.getByidUsuarios);
router.get("/:id", verifyToken, usuariosController.getByidUsuarios);
router.put("/activar/:id",TienePermisos("Usuarios_Actualizar"), verifyToken, usuariosController.ActivarUsuarios);
router.put("/:id", TienePermisos("Usuarios_Actualizar"),verifyToken,usuariosController.actualizarUsuarios);
router.put("/desactivar/:id",TienePermisos("Usuarios_Actualizar"), verifyToken, usuariosController.desactivarUsuarios);

export default router;
