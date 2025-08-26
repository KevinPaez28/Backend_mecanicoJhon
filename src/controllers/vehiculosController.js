import VehiculosServices from "../services/vehiculosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class VehiculoController {
    static getVehiculos = async (req, res) => {
        try {
            const response = await VehiculosServices.getVehiculos();
            if (response.error) {
                return ResponseProvider.error(
                    res,
                    response.message,
                    response.code
                );
            }
            return ResponseProvider.success(
                res,
                response.data,
                response.message,
                response.code
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno en el servidor",
                500
            );
        }
    }

    static getByidVehiculos = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await VehiculosServices.getVehiculoByid(id);
            if (response.error) {
                return ResponseProvider.error(
                    res,
                    response.message,
                    response.code
                );
            }
            return ResponseProvider.success(
                res,
                response.data,
                response.message,
                response.code
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno en el servidor",
                500
            );
        }
    }

    static postVehiculos = async (req, res) => {
        const { placa, marca, modelo, usuario_id } = req.body;

        try {
            const vehiculo = await VehiculosServices.createVehiculo(
                placa,
                marca,
                modelo,
                usuario_id
            );

            if (vehiculo.error) {
                return ResponseProvider.error(
                    res,
                    vehiculo.message,
                    vehiculo.code
                );
            }

            return ResponseProvider.success(
                res,
                vehiculo.data,
                "Vehículo creado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear el vehículo",
                500
            );
        }
    }



    static actualizarVehiculos = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const vehiculo = await VehiculosServices.actualizarVehiculo(id, campos);
            if (vehiculo == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el vehículo",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                vehiculo,
                "Vehículo modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el vehículo",
                500
            );
        }
    }
    static getVehiculosByUsuario = async (req, res) => {
        const { id_usuario } = req.query;
        try {
            const response = await VehiculosServices.getVehiculosByUsuario(id_usuario);
            if (response.error) {
                return ResponseProvider.error(
                    res,
                    response.message,
                    response.code
                );
            }
            return ResponseProvider.success(
                res,
                response.data,
                response.message,
                response.code
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno en el servidor",
                500
            );
        }
    }
    static deleteVehiculo = async (req, res) => {
        const { id } = req.params;
        try {
            const eliminado = await VehiculosServices.eliminarVehiculo(id);
            if (!eliminado) {
                return ResponseProvider.error(
                    res,
                    "Vehículo no encontrado",
                    404
                );
            }
            return ResponseProvider.success(
                res,
                null,
                "Vehículo eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el vehículo",
                500
            );
        }
    }
}

export default VehiculoController;
