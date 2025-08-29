import Reparaciones from "../models/Reparaciones.js";

class ReparacionesServices {
    // Obtener todas las reparaciones
    static async getReparaciones() {
        try {
            const OBJReparacion = new Reparaciones();
            const reparaciones = await OBJReparacion.getall();
            if (reparaciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay reparaciones registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparaciones obtenidas correctamente",
                data: reparaciones,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las reparaciones",
            };
        }
    }

    // Obtener reparación por ID
    static async getReparacionById(id) {
        try {
            const OBJReparacion = new Reparaciones();
            const reparacion = await OBJReparacion.getbyid(id);
            if (!reparacion) {
                return {
                    error: true,
                    code: 404,
                    message: "Reparación no encontrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparación obtenida correctamente",
                data: reparacion,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener la reparación",
            };
        }
    }

    // Obtener consumibles por detalle
    static async getConsumiblesPorDetalle(detalleId) {
        try {
            const OBJConsumible = new ServiciosConsumibles();
            const consumibles = await OBJConsumible.getByDetalle(detalleId);
            if (!consumibles || consumibles.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron consumibles para esta reparación",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Consumibles obtenidos correctamente",
                data: consumibles,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los consumibles",
            };
        }
    }

    // Obtener reparaciones por usuario
    static async getReparacionesPorUsuario(usuarioId) {
        try {
            const OBJReparacion = new Reparaciones();
            const reparaciones = await OBJReparacion.getByUsuario(usuarioId);
            if (reparaciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "El usuario no tiene reparaciones registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparaciones obtenidas correctamente",
                data: reparaciones,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las reparaciones del usuario",
            };
        }
    }

    static async getReparacionesFecha() {
        try {
            const OBJReparacion = new Reparaciones();
            const reparaciones = await OBJReparacion.getfecha();
            if (reparaciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "El usuario no tiene reparaciones registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparaciones obtenidas correctamente",
                data: reparaciones,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las reparaciones del usuario",
            };
        }
    }
    static async getreparacionesadmin() {
        try {
            const OBJReparacion = new Reparaciones();
            const reparaciones = await OBJReparacion.getAdmin();
            console.log(reparaciones);
            
            if (reparaciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "El usuario no tiene reparaciones registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparaciones obtenidas correctamente",
                data: reparaciones,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las reparaciones del usuario",
            };
        }
    }

    // Crear nueva reparación
    static async createReparacion(servicio_id, vehiculo_id, fecha, observaciones, estado_id, nombre_mecanico, consumibles) {
        try {
            const OBJReparacion = new Reparaciones();
            const reparacionCreada = await OBJReparacion.Create(servicio_id, vehiculo_id, fecha, observaciones, estado_id, nombre_mecanico, consumibles);
            return {
                error: false,
                code: 201,
                message: "Reparación creada correctamente",
                data: reparacionCreada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear la reparación",
            };
        }
    }

    // Actualizar reparación
    static async patchReparacion(id, campos) {
        try {
            const OBJReparacion = new Reparaciones();
            const reparacionActualizada = await OBJReparacion.actualizar(id, campos);
            if (reparacionActualizada === null) {
                return {
                    error: true,
                    code: 400,
                    message: "No se pudo actualizar la reparación",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparación actualizada correctamente",
                data: reparacionActualizada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al actualizar la reparación",
            };
        }
    }

    // Eliminar reparación completa
    static async deleteReparacion(detalleId) {
        try {
            const OBJReparacion = new Reparaciones();
            const eliminado = await OBJReparacion.delete(detalleId, null);
            if (!eliminado) {
                return {
                    error: true,
                    code: 400,
                    message: "Reparación no encontrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Reparación eliminada correctamente",
                data: eliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar la reparación",
            };
        }
    }

    // Eliminar un consumible específico
    static async deleteConsumible(detalleId, productoId) {
        try {
            const OBJReparacion = new Reparaciones();
            const eliminado = await OBJReparacion.delete(detalleId, productoId);
            if (!eliminado) {
                return {
                    error: true,
                    code: 400,
                    message: "Reparación o consumible no encontrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Consumible eliminado correctamente",
                data: eliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el consumible",
            };
        }
    }
}

export default ReparacionesServices;
