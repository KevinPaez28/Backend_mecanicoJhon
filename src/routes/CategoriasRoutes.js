import express from "express";
import categoriasController from "../controllers/categoriasController.js";
import { camposCategorias } from "../middlewares/Categorias/ValidacionCampos.js";

const router = express.Router();

// GET - Listar todas las categorias
router.get("/", categoriasController.getCategorias);

// GET - Obtener una categoria por ID
router.get("/:id", categoriasController.getByIdCategorias);

// POST - Crear una nueva categoria
router.post("/", camposCategorias, categoriasController.postCategoria);

// PUT - Actualizar una categoria
router.put("/:id", camposCategorias, categoriasController.actualizarCategorias);

// DELETE - Eliminar una categoria
router.delete("/:id", categoriasController.deleteCategorias);

export default router;
