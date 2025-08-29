import express from "express";

import ServiciosController from "../controllers/serviciosController.js";
import { camposServicios } from "../middlewares/servicios/validacionservicios.js";
import { TienePermisos } from "../middlewares/Permisos/tienepermisos.js";
const router = express.Router();

router.get("/", TienePermisos("Servicios_Listar"),ServiciosController.getServicios);
router.get("/:id", TienePermisos("Servicios_Listar"),ServiciosController.getByIdServicios);
router.post("/", camposServicios, TienePermisos("Servicios_Crear"),ServiciosController.postServicio);
router.put("/:id", camposServicios, TienePermisos("Servicios_Actualizar"),ServiciosController.actualizarServicios);
router.delete("/:id",camposServicios ,TienePermisos("Servicios_Eliminar"),ServiciosController.deleteServicios);

export default router;
