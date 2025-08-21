import express from "express"

import usuariosController from "../controllers/usuarioController.js"
import { camposUsuarios } from "../middlewares/usuarios/ValidacionCampos.js";

const router = express.Router();

router.get("/",usuariosController.getUsuarios)
router.get("/:id", usuariosController.getByidUsuarios)
router.post("",camposUsuarios,usuariosController.postUsuarios)
router.put("/:id",camposUsuarios,usuariosController.actualizarUsuarios)
router.put("/activar/:id",camposUsuarios,usuariosController.ActivarUsuarios)
router.put("/desactivar/:id",camposUsuarios,usuariosController.desactivarUsuarios)
export default router;