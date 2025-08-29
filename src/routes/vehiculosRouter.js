import express from "express";
import vehiculosController from "../controllers/vehiculosController.js";
import { camposVehiculos } from "../middlewares/vehiculos/ValidacionCampos.js";
import { verifyToken } from "../middlewares/AuthToken/AuthToken.js"; 
import { TienePermisos } from "../middlewares/Permisos/tienepermisos.js";
const router = express.Router();

// Obtener todos los vehículos
router.get("/", TienePermisos("Vehiculos_Listar"),verifyToken, vehiculosController.getVehiculos);

// Rutas específicas primero
router.get("/usuarios/:id", vehiculosController.getVehiculosByUsuario);

// Luego la genérica
router.get("/:id", TienePermisos("Vehiculos_Listar"), verifyToken, vehiculosController.getByidVehiculos);

// Crear vehículo
router.post("/", TienePermisos("Vehiculos_Crear"), verifyToken, camposVehiculos, vehiculosController.postVehiculos);

// Actualizar vehículo
router.put("/:id",TienePermisos("Vehiculos_Actualizar"), verifyToken, camposVehiculos, vehiculosController.actualizarVehiculos);

// Eliminar vehículo
router.delete("/:id",TienePermisos("Vehiculos_Eliminar") ,verifyToken, vehiculosController.deleteVehiculo);

export default router;
