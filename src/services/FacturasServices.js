import Factura from "../models/Facturas.js";

class FacturasServices {

    // Obtener todas las facturas completas
    static async getAll() {
        try {
            const OBJFactura = new Factura();
            const facturas = await OBJFactura.obtenerFacturas();
            if (facturas.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay facturas registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Facturas obtenidas correctamente",
                data: facturas,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las facturas",
            };
        }
    }

    // Obtener factura por ID
    static async getById(id) {
        try {
            const OBJFactura = new Factura();
            const factura = await OBJFactura.obtenerFactura(id);
            if (!factura) {
                return {
                    error: true,
                    code: 404,
                    message: "Factura no registrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Factura obtenida correctamente",
                data: factura,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener la factura",
            };
        }
    }

    // Crear una nueva factura
    static async create(detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total) {
        try {
            const OBJFactura = new Factura();
            const facturaCreada = await OBJFactura.crearFactura({ detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total });
            return {
                error: false,
                code: 201,
                message: "Factura creada correctamente",
                data: facturaCreada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear la factura",
            };
        }
    }

    // Actualizar una factura
    static async actualizarFactura(id, campos) {
        try {
            const OBJFactura = new Factura();
            const facturaActualizada = await OBJFactura.actualizarFactura({ factura_id: id, ...campos });
            if (!facturaActualizada) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar la factura",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Factura actualizada correctamente",
                data: facturaActualizada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al actualizar la factura",
            };
        }
    }

    // Eliminar una factura
    static async eliminarFactura(id) {
        try {
            const OBJFactura = new Factura();
            const facturaEliminada = await OBJFactura.eliminarFactura(id);
            if (!facturaEliminada) {
                return {
                    error: true,
                    code: 404,
                    message: "Factura no encontrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Factura eliminada correctamente",
                data: facturaEliminada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar la factura",
            };
        }
    }

    // Listar facturas simples
    static async listarFacturas() {
        try {
            const OBJFactura = new Factura();
            const facturas = await OBJFactura.listarFacturas();
            if (facturas.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay facturas registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Facturas simples obtenidas correctamente",
                data: facturas,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al listar las facturas",
            };
        }
    }

    // Obtener facturas por usuario
    static async getFacturasByUsuario(usuario_id = null) {
        try {
            const OBJFactura = new Factura();
            const facturas = await OBJFactura.obtenerFacturas(usuario_id);
            if (facturas.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay facturas registradas para el usuario",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Facturas obtenidas correctamente",
                data: facturas,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las facturas por usuario",
            };
        }
    }

    // Eliminar detalles de una factura
    static async eliminarDetallesFactura(facturaId) {
        try {
            const OBJFactura = new Factura();
            const detallesEliminados = await OBJFactura.eliminarDetallesFactura(facturaId);
            if (!detallesEliminados) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron detalles de la factura para eliminar",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Detalles de la factura eliminados correctamente",
                data: detallesEliminados,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar los detalles de la factura",
            };
        }
    }

    // Obtener el total de ventas
    static async obtenerTotalDeVentas() {
        try {
            const OBJFactura = new Factura();
            const total = await OBJFactura.obtenerSumaTotalFacturas();
            return {
                error: false,
                code: 200,
                message: "Total de ventas obtenido correctamente",
                data: total,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al calcular el total de ventas",
            };
        }
    }
}

export default FacturasServices;
