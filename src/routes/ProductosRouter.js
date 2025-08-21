import express from "express";
import productosController from "../controllers/ProdcutosController.js"
import { camposProductos } from "../middlewares/Productos/validacionProductos.js";

const router = express.Router();

// GET - Listar todos los productos
router.get("/", productosController.getProductos);

// GET - Obtener un producto por ID
router.get("/:id", productosController.getByIdProducto);

// POST - Crear un nuevo producto
router.post("/", camposProductos, productosController.postProducto);

// PUT - Actualizar un producto
router.put("/:id", camposProductos, productosController.actualizarProducto);

// DELETE - Eliminar un producto
router.delete("/:id", productosController.deleteProducto);

export default router;
