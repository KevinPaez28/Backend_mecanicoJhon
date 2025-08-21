import EstadosServicios from "../models/EstadosServicios.js";

class EstadosServiciosServices {
    static async getEstadosServicios() {
        try {
            const OBJEstado = new EstadosServicios();
            const estados = await OBJEstado.getall();
            if (estados.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay estados de servicios registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Estados de servicios obtenidos correctamente",
                data: estados,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los estados de servicios",
            };
        }
    }

    static async getEstadoServicioByid(id) {
        try {
            const OBJEstado = new EstadosServicios();
            const estado = await OBJEstado.getbyid(id);
            if (estado.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Estado de servicio no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Estado de servicio obtenido correctamente",
                data: estado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el estado de servicio",
            };
        }
    }
}

export default EstadosServiciosServices;
