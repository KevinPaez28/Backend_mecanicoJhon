import DetalleConsumibleServices from "../services/DetalleConsumibleServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class DetalleConsumibleController {
    static getDetalleConsumibles = async (req, res) => {
        try {
            const response = await DetalleConsumibleServices.getDetalleConsumibles();
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

    static getDetalleConsumibleById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await DetalleConsumibleServices.getDetalleConsumibleById(id);
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

    static postDetalleConsumible = async (req, res) => {
        const { detalle_id, producto_id, cantidad_usada, precio_unitario, total } = req.body; // Ajusta según tus campos de la base de datos
        try {
            const detalle = await DetalleConsumibleServices.createDetalleConsumible( detalle_id, producto_id, cantidad_usada, precio_unitario, total );
            if (detalle.error) {
                return ResponseProvider.error(
                    res,
                    detalle.message,
                    detalle.code
                );
            }
            return ResponseProvider.success(
                res,
                detalle,
                "Detalle consumible creado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear el detalle consumible",
                500
            );
        }
    }


    static actualizarDetalleConsumible = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const detalle = await DetalleConsumibleServices.actualizarDetalleConsumible(id, campos);
            if (detalle == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el detalle consumible",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                detalle,
                "Detalle consumible modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el detalle consumible",
                500
            );
        }
    }

    static deleteDetalleConsumible = async (req, res) => {
        const { id } = req.params;
        try {
            const detalle = await DetalleConsumibleServices.deleteDetalleConsumible(id);
            if (detalle == null) {
                return ResponseProvider.error(
                    res,
                    "Error al eliminar el detalle consumible",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                detalle,
                "Detalle consumible eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el detalle consumible",
                500
            );
        }
    }
}

export default DetalleConsumibleController;
