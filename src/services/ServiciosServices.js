import Servicio from "../models//Servicios.js";

class ServiciosServices {
    static async getServicios() {
        try {
            const OBJServicio = new Servicio();
            const servicios = await OBJServicio.getall();
            if (servicios.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay servicios registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Servicios obtenidos correctamente",
                data: servicios,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los servicios",
            };
        }
    }

    static async getServicioByid(id) {
        try {
            const OBJServicio = new Servicio();
            const servicio = await OBJServicio.getbyid(id);
            if (servicio.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Servicio no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Servicio obtenido correctamente",
                data: servicio,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el servicio",
            };
        }
    }

    static async createServicio(nombre_servicio, descripcion, precio) {
        try {
            const OBJServicio = new Servicio();
            const servicioCreado = await OBJServicio.Create(nombre_servicio, descripcion, precio);
            return {
                error: false,
                code: 201,
                message: "Servicio creado correctamente",
                data: servicioCreado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear el servicio",
            };
        }
    }

    static async actualizarServicio(id, campos) {
        try {
            const OBJServicio = new Servicio();
            const servicioActualizado = await OBJServicio.actualizar(id, campos);
            if (servicioActualizado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el servicio",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Servicio actualizado correctamente",
                data: servicioActualizado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el servicio",
            };
        }
    }

    static async deleteServicio(id) {
        try {
            const OBJServicio = new Servicio();
            const servicioEliminado = await OBJServicio.delete(id);
            if (servicioEliminado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al eliminar el servicio",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Servicio eliminado correctamente",
                data: servicioEliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el servicio",
            };
        }
    }
}

export default ServiciosServices;
