import connection from "../utils/db.js";

class EstadosServicios {
    async getall() {
        try {
            const [rows] = await connection.query(
                "SELECT estado_id, nombre_estado FROM EstadosServicio"
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los estados de servicio");
        }
    }

    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                "SELECT estado_id, nombre_estado FROM EstadosServicio WHERE estado_id = ?",
                [id]
            );
            if (rows.length === 0) {
                return [];
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el estado de servicio");
        }
    }
}

export default EstadosServicios;
