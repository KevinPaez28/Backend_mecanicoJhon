import connection from "../utils/db.js";

class DetalleConsumible {
    // Obtener todos los registros
    async getall() {
        try {
            const [rows] = await connection.query(
                "SELECT * FROM ServiciosConsumibles"
            );
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los detalles consumibles");
        }
    }

    // Obtener registro por ID
    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                "SELECT * FROM ServiciosConsumibles WHERE id = ?",
                [id]
            );
            if (rows.length === 0) return [];
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el detalle consumible");
        }
    }

    // Crear un registro
    async Create( detalle_id, producto_id, cantidad_usada, precio_unitario, total ) {
        try {
            const [result] = await connection.query(
                "INSERT INTO ServiciosConsumibles (detalle_id, producto_id, cantidad_usada, precio_unitario, total) VALUES (?, ?, ?, ?, ?)",
                [ detalle_id, producto_id, cantidad_usada, precio_unitario, total]
            );
            return {
                id: result.insertId,
                detalle_id,
                producto_id,
                cantidad_usada,
                precio_unitario,
                total
            };
        } catch (error) {
                        console.log(error);

            throw new Error("Error al crear el detalle consumible");
        }
    }


    // Actualizar un registro
    async actualizar(id, campos) {
        try {
            let query = "UPDATE ServiciosConsumibles SET ";
            const params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }
            query = query.slice(0, -2);
            query += " WHERE id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al actualizar el detalle consumible");
        }
    }

    // Eliminar un registro
    async delete(id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM ServiciosConsumibles WHERE id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { id };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al eliminar el detalle consumible");
        }
    }
}

export default DetalleConsumible;
