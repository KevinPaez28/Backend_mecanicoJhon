import Rol from "../models/Roles.js";

class RolesServices {
    static async getRoles() {
        try {
            const OBJRol = new Rol();
            const roles = await OBJRol.getall();
            if (roles.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay Roles registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Roles obtenidos correctamente",
                data: roles,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los roles",
            };
        }
    }

    static async getRolById(id) {
        try {
            const OBJRol = new Rol();
            const rol = await OBJRol.getbyid(id);
            if (rol.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Rol no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Rol obtenido correctamente",
                data: rol,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el rol",
            };
        }
    }
}

export default RolesServices;
