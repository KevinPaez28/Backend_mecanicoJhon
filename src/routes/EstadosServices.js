import express from "express";

import estadosServiciosController from "../controllers/estadosServiciosController.js";

const router = express.Router();

// Obtener todos los estados de servicios
router.get("/", estadosServiciosController.getEstadosServicios);

// Obtener un estado de servicio por ID
router.get("/:id", estadosServiciosController.getByIdEstadosServicios);


export default router;
