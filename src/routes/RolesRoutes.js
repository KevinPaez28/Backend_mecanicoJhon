import express from "express";
import rolesController from "../controllers/RolesController.js";

const router = express.Router();

// Obtener todos los roles
router.get("/", rolesController.getRoles);

// Obtener rol por ID
router.get("/:id", rolesController.getByidRoles);

export default router;
