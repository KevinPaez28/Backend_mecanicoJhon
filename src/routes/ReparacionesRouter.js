import express from "express";
import reparacionesController from "../controllers/ReparacionesController.js";

const router = express.Router();

// GET - Listar todas las reparaciones
router.get("/", reparacionesController.getReparaciones);

router.get("/admin",reparacionesController.reparacionesAdmin)

router.get("/:detalleId/consumibles", reparacionesController.getConsumiblesPorDetalle);
// GET - Obtener consumibles de una reparación

router.get("/fecha",reparacionesController.getreparacionesFecha)

// GET - Reparaciones de un usuario específico

router.get("/usuario/:id", reparacionesController.getReparacionesPorUsuario);

// GET - Obtener una reparación por ID
router.get("/:id", reparacionesController.getReparacionById);
// POST - Crear una nueva reparación
router.post("/", reparacionesController.postReparacion);

// PATCH - Actualizar parcialmente una reparación
router.patch("/:id", reparacionesController.patchReparacion);

// DELETE - Eliminar una reparación completa
router.delete("/:detalleId", reparacionesController.deleteReparacion);

// DELETE - Eliminar un consumible de una reparación
router.delete("/:detalleId/consumibles/:productoId", reparacionesController.deleteConsumible);



export default router;
