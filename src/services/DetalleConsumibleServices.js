import DetalleConsumible from "../models/DetalleConsumible.js";

class DetalleConsumibleServices {
    static async getDetalleConsumibles() {
        try {
            const OBJDetalle = new DetalleConsumible();
            const detalles = await OBJDetalle.getall();
            if (detalles.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay detalles de consumibles registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Detalles de consumibles obtenidos correctamente",
                data: detalles,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los detalles de consumibles",
            };
        }
    }

    static async getDetalleConsumibleById(id) {
        try {
            const OBJDetalle = new DetalleConsumible();
            const detalle = await OBJDetalle.getbyid(id);
            if (detalle.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Detalle consumible no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Detalle consumible obtenido correctamente",
                data: detalle,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el detalle consumible",
            };
        }
    }

    static async createDetalleConsumible(data) {
        try {
            const OBJDetalle = new DetalleConsumible();
            const detalleCreado = await OBJDetalle.Create(data);
            return {
                error: false,
                code: 201,
                message: "Detalle consumible creado correctamente",
                data: detalleCreado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear el detalle consumible",
            };
        }
    }

    static async actualizarDetalleConsumible(id, campos) {
        try {
            const OBJDetalle = new DetalleConsumible();
            const detalleActualizado = await OBJDetalle.actualizar(id, campos);
            if (detalleActualizado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el detalle consumible",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Detalle consumible actualizado correctamente",
                data: detalleActualizado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el detalle consumible",
            };
        }
    }

    static async deleteDetalleConsumible(id) {
        try {
            const OBJDetalle = new DetalleConsumible();
            const detalleEliminado = await OBJDetalle.delete(id);
            if (detalleEliminado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al eliminar el detalle consumible",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Detalle consumible eliminado correctamente",
                data: detalleEliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el detalle consumible",
            };
        }
    }
}

export default DetalleConsumibleServices;
