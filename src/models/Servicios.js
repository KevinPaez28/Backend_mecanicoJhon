import connection from "../utils/db.js";

class Servicio {
    // Obtener todos los servicios
    async getall() {
        try {
            const [rows] = await connection.query(
                `SELECT servicio_id, nombre_servicio, descripcion, precio 
                 FROM Servicios`
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los servicios");
        }
    }

    // Obtener servicio por id
    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                `SELECT servicio_id, nombre_servicio, descripcion, precio 
                 FROM Servicios 
                 WHERE servicio_id = ?`,
                [id]
            );
            if (rows.length === 0) {
                return []; // igual que en Usuario
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el servicio");
        }
    }

    // Crear nuevo servicio
    async Create(nombre_servicio, descripcion, precio) {
        try {
            const [rows] = await connection.query(
                `INSERT INTO Servicios (nombre_servicio, descripcion, precio) 
                 VALUES (?, ?, ?)`,
                [nombre_servicio, descripcion, precio]
            );
            return {
                id: rows.insertId,
                nombre_servicio,
                descripcion,
                precio
            };
        } catch (error) {
            throw new Error("Error al crear el servicio");
        }
    }

    // Actualizar un servicio por id
    async actualizar(id, campos) {
        try {
            let query = "UPDATE Servicios SET ";
            let params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }
            query = query.slice(0, -2); // quitar última coma
            query += " WHERE servicio_id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al actualizar el servicio");
        }
    }

    // Eliminar un servicio
    async delete(id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM Servicios WHERE servicio_id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { id };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al eliminar el servicio");
        }
    }
}

export default Servicio;
