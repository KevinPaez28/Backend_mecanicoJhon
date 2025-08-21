import express from "express";
import DetalleConsumibleController from "../controllers/DetalleConsumibleController.js";
// import { camposDetalleConsumible } from "../middlewares/DetalleServicioConsumible/ValidacionCampos.js";

const router = express.Router();

// GET - Obtener todos los registros
router.get("/", DetalleConsumibleController.getDetalleConsumibles);

// GET - Obtener un registro por ID
router.get("/:id", DetalleConsumibleController.getDetalleConsumibleById);

// POST - Crear un registro
// router.post("/DetalleServConsumible", camposDetalleConsumible, DetalleConsumibleController.postDetalleConsumible);

// PUT - Actualizar un registro por ID
// router.put("/DetalleServConsumible/:id", camposDetalleConsumible, DetalleConsumibleController.actualizarDetalleConsumible);

// DELETE - Eliminar un registro por ID
router.delete("/:id", DetalleConsumibleController.deleteDetalleConsumible);

export default router;
