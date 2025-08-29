import express from "express";
import productosController from "../controllers/ProdcutosController.js"
import { camposProductos } from "../middlewares/Productos/validacionProductos.js";
import { TienePermisos } from "../middlewares/Permisos/tienepermisos.js";
const router = express.Router();

// GET - Listar todos los productos
router.get("/",TienePermisos("Productos_Listar"), productosController.getProductos);

// GET - Obtener un producto por ID
router.get("/:id",TienePermisos("Productos_Listar"), productosController.getByIdProducto);

// POST - Crear un nuevo producto
router.post("/", camposProductos,TienePermisos("Productos_Crear"), productosController.postProducto);

// PUT - Actualizar un producto
router.put("/:id", camposProductos,TienePermisos("Productos_Actualizar"), productosController.actualizarProducto);

// DELETE - Eliminar un producto
router.delete("/:id",TienePermisos("Productos_Eliminar"), productosController.deleteProducto);

export default router;
