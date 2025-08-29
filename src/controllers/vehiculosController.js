import VehiculosServices from "../services/vehiculosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class VehiculoController {
    static getVehiculos = async (req, res) => {
        try {
            const response = await VehiculosServices.getVehiculos();
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, response.code);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static getByidVehiculos = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await VehiculosServices.getVehiculoByid(id);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, response.code);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }

    static postVehiculos = async (req, res) => {
        const { placa, marca, modelo, usuario } = req.body;
        try {
            const response = await VehiculosServices.createVehiculo(placa, marca, modelo, usuario);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 201);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno al crear el vehículo", 500);
        }
    }

    static actualizarVehiculos = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const response = await VehiculosServices.actualizarVehiculo(id, campos);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno al actualizar el vehículo", 500);
        }
    }

    static deleteVehiculo = async (req, res) => {
        const { id } = req.params;
        console.log(id);
        
        try {
            const response = await VehiculosServices.eliminarVehiculo(id);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno al eliminar el vehículo", 500);
        }
    }

    static getVehiculosByUsuario = async (req, res) => {
        const { id } = req.params;        
        try {
            const response = await VehiculosServices.getVehiculosByUsuario(id);
            if (response.error) return ResponseProvider.error(res, response.message, response.code);
            return ResponseProvider.success(res, response.data, response.message, 200);
        } catch (error) {
            return ResponseProvider.error(res, "Error interno en el servidor", 500);
        }
    }
}

export default VehiculoController;
