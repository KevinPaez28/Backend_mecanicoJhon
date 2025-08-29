import express from "express";
import categoriasController from "../controllers/categoriasController.js";
import { camposCategorias } from "../middlewares/Categorias/ValidacionCampos.js";
import { TienePermisos } from "../middlewares/Permisos/tienepermisos.js";
const router = express.Router();

// GET - Listar todas las categorias
router.get("/", TienePermisos("Categorias_Listar"),categoriasController.getCategorias);

// GET - Obtener una categoria por ID
router.get("/:id", TienePermisos("Categorias_Listar"),categoriasController.getByIdCategorias);

// POST - Crear una nueva categoria
router.post("/", camposCategorias, TienePermisos("Categorias_Crear"),categoriasController.postCategoria);

// PUT - Actualizar una categoria
router.put("/:id", camposCategorias, TienePermisos("Categorias_Actualizar"),categoriasController.actualizarCategorias);

// DELETE - Eliminar una categoria
router.delete("/:id", TienePermisos("Categorias_Eliminar"),categoriasController.deleteCategorias);

export default router;
