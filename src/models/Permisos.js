import connection from "../utils/db.js";

class Permisos {
    // Obtener todos los permisos
    async obtenerPermisos(id) {
        try {
            const [rows] = await connection.query(
                `SELECT r.rol_id, r.nombre_rol AS rol, p.id AS permiso_id, p.permiso
                FROM permisos_roles pr
                INNER JOIN Roles r ON pr.rol_id = r.rol_id
                INNER JOIN permisos p ON pr.id_permiso = p.id
                WHERE r.rol_id = ?;`,
                [id]
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los permisos");
        }
    }
    async permisos() {
        try {
            const [rows] = await connection.query(
                `select * from permisos;`
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los permisos");
        }
    }
}

export default Permisos;