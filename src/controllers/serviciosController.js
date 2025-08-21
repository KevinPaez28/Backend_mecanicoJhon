import ServiciosServices from "../services/ServiciosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class ServiciosController {
    static getServicios = async (req, res) => {        
        try {
            const response = await ServiciosServices.getServicios();
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

    static getByIdServicios = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await ServiciosServices.getServicioByid(id);
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

    static postServicio = async (req, res) => {
        const { nombre_servicio, descripcion, precio } = req.body;
        try {
            const servicio = await ServiciosServices.createServicio(
                nombre_servicio,
                descripcion,
                precio
            );
            if (servicio.error) {
                return ResponseProvider.error(
                    res,
                    servicio.message,
                    servicio.code
                );
            }
            return ResponseProvider.success(
                res,
                servicio,
                "Servicio creado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear el servicio",
                500
            );
        }
    }

    static actualizarServicios = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const servicio = await ServiciosServices.actualizarServicio(id, campos);
            if (servicio == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el servicio",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                servicio,
                "Servicio modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el servicio",
                500
            );
        }
    }

    static deleteServicios = async (req, res) => {
        const { id } = req.params;
        try {
            const servicio = await ServiciosServices.deleteServicio(id);
            if (servicio == null) {
                return ResponseProvider.error(
                    res,
                    "Error al eliminar el servicio",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                servicio,
                "Servicio eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el servicio",
                500
            );
        }
    }
}

export default ServiciosController;
