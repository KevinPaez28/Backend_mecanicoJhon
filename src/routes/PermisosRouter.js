import express from "express";
import PermisosController from "../controllers/PermisosController.js";
import { verifyToken } from "../middlewares/AuthToken/AuthToken.js";

const router = express.Router();
// GET - Listar todas las facturas completas
router.get("/:id", PermisosController.gerPermisos);

export default router;
