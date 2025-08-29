import Permisos from "../models/Permisos.js";
class PermisosServices {

    // Obtener todas las facturas completas
    static async permisoget(id) {
        try {
            const OBJFactura = new Permisos();
            const facturas = await OBJFactura.obtenerPermisos(id);
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
}

export default PermisosServices;