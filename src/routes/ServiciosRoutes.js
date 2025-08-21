import express from "express";

import ServiciosController from "../controllers/serviciosController.js";
import { camposServicios } from "../middlewares/servicios/validacionservicios.js";

const router = express.Router();

router.get("/", ServiciosController.getServicios);
router.get("/:id", ServiciosController.getByIdServicios);
router.post("/", camposServicios, ServiciosController.postServicio);
router.put("/:id", camposServicios, ServiciosController.actualizarServicios);
router.delete("/:id", ServiciosController.deleteServicios);

export default router;
