import connection from "../utils/db.js";

class Roles {
    async getall() {
        try {
            const [rows] = await connection.query(
                "SELECT rol_id, nombre_rol FROM Roles"
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los roles");
        }
    }

    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                "SELECT rol_id, nombre_rol FROM Roles WHERE rol_id = ?",
                [id]
            );
            if (rows.length === 0) return null;
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el rol por id");
        }
    }
}

export default Roles;
