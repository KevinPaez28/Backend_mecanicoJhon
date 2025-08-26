import express from "express";
import facturasController from "../controllers/FacturasController.js";

const router = express.Router();

// GET - Listar todas las facturas completas
router.get("/", facturasController.getFacturas);

// GET - Obtener una factura por ID
router.get("/id/:id", facturasController.getByidFacturas);

// GET - Obtener facturas por usuario (consulta por query ?usuario_id=)
router.get("/usuario", facturasController.getFacturasByUsuario);

// GET - Obtener el total de ventas
router.get("/totalventas", facturasController.getFacturasByUsuario); // Si quieres otro método específico, se puede ajustar

// POST - Crear una nueva factura
router.post("/", facturasController.postFacturas);

// PUT - Actualizar una factura existente
router.put("/:id", facturasController.actualizarFacturas);

// DELETE - Eliminar una factura
router.delete("/:id", facturasController.deleteFactura);

// DELETE - Eliminar detalles asociados a una factura
router.delete("/detalles/:facturaId", facturasController.deleteDetallesFactura);

export default router;
