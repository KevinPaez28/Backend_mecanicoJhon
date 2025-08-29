import ReparacionesServices from "../services/ReparacionesServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class ReparacionesController {
    // GET - Obtener todas las reparaciones
    static getReparaciones = async (req, res) => {
        try {
            const response = await ReparacionesServices.getReparaciones();
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

    // GET - Obtener una reparación por ID
    static getReparacionById = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await ReparacionesServices.getReparacionById(id);
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

    // GET - Obtener consumibles por detalle
    static getConsumiblesPorDetalle = async (req, res) => {
        const { detalleId } = req.params;
        try {
            const response = await ReparacionesServices.getConsumiblesPorDetalle(detalleId);
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
                "Error interno al obtener los consumibles",
                500
            );
        }
    }

    // GET - Obtener reparaciones por usuario
    static getReparacionesPorUsuario = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await ReparacionesServices.getReparacionesPorUsuario(id);
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
                "Error interno al obtener las reparaciones",
                500
            );
        }
    }

    static getreparacionesFecha = async (req, res) => {
        try {
            const response = await ReparacionesServices.getReparacionesFecha();
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
                "Error interno al obtener las reparaciones",
                500
            );
        }
    }

    static reparacionesAdmin = async (req, res) => {
        try {
            const response = await ReparacionesServices.getreparacionesadmin();
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
                "Error interno al obtener las reparaciones",
                500
            );
        }
    }

    // POST - Crear nueva reparación
    static postReparacion = async (req, res) => {
       const {servicio_id, vehiculo_id, fecha, observaciones, estado_id, nombre_mecanico, consumibles} = req.body;
        
        try {
            const reparacion = await ReparacionesServices.createReparacion(servicio_id, vehiculo_id, fecha, observaciones, estado_id, nombre_mecanico, consumibles);
            if (reparacion.error) {
                return ResponseProvider.error(
                    res,
                    reparacion.message,
                    reparacion.code
                );
            }

            return ResponseProvider.success(
                res,
                reparacion,
                "Reparación registrada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear la reparación",
                500
            );
        }
    }

    // PATCH - Actualizar parcialmente una reparación
    static patchReparacion = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const reparacion = await ReparacionesServices.patchReparacion(id, campos);
            if (reparacion == null) {
                return ResponseProvider.error(
                    res,
                    "No se pudo actualizar la reparación",
                    400
                );
            }

            return ResponseProvider.success(
                res,
                reparacion,
                "Reparación actualizada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar la reparación",
                500
            );
        }
    }

    // DELETE - Eliminar una reparación completa
    static deleteReparacion = async (req, res) => {
        const { detalleId } = req.params;
        try {
            const eliminado = await ReparacionesServices.deleteReparacion(detalleId);
            if (!eliminado) {
                return ResponseProvider.error(
                    res,
                    "Reparación no encontrada",
                    400
                );
            }

            return ResponseProvider.success(
                res,
                eliminado,
                "Reparación eliminada correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar la reparación",
                500
            );
        }
    }

    // DELETE - Eliminar un consumible específico
    static deleteConsumible = async (req, res) => {
        const { detalleId, productoId } = req.params;
        try {
            const eliminado = await ReparacionesServices.deleteConsumible(detalleId, productoId);
            if (!eliminado) {
                return ResponseProvider.error(
                    res,
                    "Reparación o consumible no encontrado",
                    400
                );
            }

            return ResponseProvider.success(
                res,
                eliminado,
                "Consumible eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el consumible",
                500
            );
        }
    }
}

export default ReparacionesController;
