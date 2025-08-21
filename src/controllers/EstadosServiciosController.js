import EstadosServiciosServices from "../services/EstadosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class EstadosServiciosController {
    static getEstadosServicios = async (req, res) => {        
        try {
            const response = await EstadosServiciosServices.getEstadosServicios();
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

    static getByIdEstadosServicios = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await EstadosServiciosServices.getByidEstadosServicios(id);
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

    static postEstadoServicio = async (req, res) => {
        const { nombre } = req.body;
        try {
            const estado = await EstadosServiciosServices.createEstadoServicio(nombre);
            if (estado.error) {
                return ResponseProvider.error(
                    res,
                    estado.message,
                    estado.code
                );
            }
            return ResponseProvider.success(
                res,
                estado,
                "Estado de servicio creado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear el estado de servicio",
                500
            );
        }
    }

    static actualizarEstadosServicios = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const estado = await EstadosServiciosServices.actualizarEstadoServicio(id, campos);
            if (estado == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el estado de servicio",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                estado,
                "Estado de servicio modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el estado de servicio",
                500
            );
        }
    }

    static deleteEstadosServicios = async (req, res) => {
        const { id } = req.params;
        try {
            const estado = await EstadosServiciosServices.deleteEstadoServicio(id);
            if (estado == null) {
                return ResponseProvider.error(
                    res,
                    "Error al eliminar el estado de servicio",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                estado,
                "Estado de servicio eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el estado de servicio",
                500
            );
        }
    }
}

export default EstadosServiciosController;
