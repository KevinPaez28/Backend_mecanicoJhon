import FacturasServices from "../services/FacturasServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class FacturaController {

    // Listar todas las facturas completas
    static getFacturas = async (req, res) => {
        try {
            const response = await FacturasServices.getAll();
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

    // Obtener factura por ID
    static getByidFacturas = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await FacturasServices.getById(id);
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

    // Crear factura
    static postFacturas = async (req, res) => {
        const { detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total } = req.body;
        try {
            const factura = await FacturasServices.create(detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total);
            if (factura.error) {
                return ResponseProvider.error(
                    res,
                    factura.message,
                    factura.code
                );
            }
            return ResponseProvider.success(
                res,
                factura.data,
                "Factura creada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear la factura",
                500
            );
        }
    }

    // Actualizar factura
    static actualizarFacturas = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const factura = await FacturasServices.actualizarFactura(id, campos);
            if (factura.error) {
                return ResponseProvider.error(
                    res,
                    factura.message,
                    factura.code
                );
            }
            return ResponseProvider.success(
                res,
                factura.data,
                "Factura modificada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar la factura",
                500
            );
        }
    }

    // Eliminar factura
    static deleteFactura = async (req, res) => {
        const { id } = req.params;
        try {
            const eliminado = await FacturasServices.eliminarFactura(id);
            if (eliminado.error) {
                return ResponseProvider.error(
                    res,
                    eliminado.message,
                    eliminado.code
                );
            }
            return ResponseProvider.success(
                res,
                null,
                "Factura eliminada correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar la factura",
                500
            );
        }
    }

    // Obtener facturas por usuario
    static getFacturasByUsuario = async (req, res) => {
        const { usuario_id } = req.query;
        try {
            const response = await FacturasServices.getFacturasByUsuario(usuario_id);
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

    // Eliminar detalles de una factura
    static deleteDetallesFactura = async (req, res) => {
        const { facturaId } = req.params;
        try {
            const eliminado = await FacturasServices.eliminarDetallesFactura(facturaId);
            if (eliminado.error) {
                return ResponseProvider.error(
                    res,
                    eliminado.message,
                    eliminado.code
                );
            }
            return ResponseProvider.success(
                res,
                null,
                "Detalles eliminados correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar los detalles de la factura",
                500
            );
        }
    }

    // Listar facturas simples
    static listarFacturasSimples = async (req, res) => {
        try {
            const response = await FacturasServices.listarFacturas();
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
                "Error al listar facturas simples",
                500
            );
        }
    }

    // Obtener total de ventas
    static obtenerTotalVentas = async (req, res) => {
        try {
            const response = await FacturasServices.obtenerTotalDeVentas();
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
                "Error al calcular el total de ventas",
                500
            );
        }
    }
}

export default FacturaController;
