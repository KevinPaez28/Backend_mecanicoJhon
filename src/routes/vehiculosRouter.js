import express from "express";
import vehiculosController from "../controllers/vehiculosController.js";
import { camposVehiculos } from "../middlewares/vehiculos/ValidacionCampos.js";

const router = express.Router();

// Obtener todos los vehículos
router.get("/", vehiculosController.getVehiculos);

// Obtener vehículo por ID
router.get("/:id", vehiculosController.getByidVehiculos);

// Crear vehículo
router.post("/", camposVehiculos, vehiculosController.postVehiculos);

// Actualizar vehículo
router.put("/:id", camposVehiculos, vehiculosController.actualizarVehiculos);

// Obtener vehículos por usuario (con query param ?id_usuario=)
router.get("/usuarios/porUsuario", vehiculosController.getVehiculosByUsuario);

// Eliminar vehículo
router.delete("/:id", vehiculosController.deleteVehiculo);

export default router;
