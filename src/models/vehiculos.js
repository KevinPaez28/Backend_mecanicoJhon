import connection from "../utils/db.js";

class Vehiculo {
    async getall() {
        try {
            const [rows] = await connection.query(
                "SELECT vehiculo_id, placa, marca, modelo, usuario_id FROM Vehiculos"
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los vehículos");
        }
    }

    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                `SELECT vehiculo_id, placa, marca, modelo, usuario_id FROM Vehiculos WHERE vehiculo_id = ?`,
                [id]
            );
            if (rows.length === 0) return [];
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el vehículo");
        }
    }

    async getByUsuarioId(id) {
        console.log(id);
        
        try {
            const [rows] = await connection.query(
                `SELECT vehiculo_id, placa, marca, modelo, usuario_id FROM Vehiculos WHERE usuario_id = ?`,
                [id]
            );
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los vehículos por usuario");
        }
    }
    async getUsuarioIdPorNombre(usuarioNombre) {
        try {
            const [rows] = await connection.query(
                `SELECT usuario_id FROM Usuarios WHERE usuario = ?`,
                [usuarioNombre]
            );
            console.log(rows);
            
            if (rows.length > 0) {
                return rows[0].usuario_id; // Retorna el ID del usuario
            } else {
                throw new Error("Usuario no existe");
            }
        } catch (error) {
            throw new Error("Error al buscar usuario: " + error.message);
        }
    }

    async Create(placa, marca, modelo, usuarioNombre) {
        // console.log(placa,marca,modelo,usuarioNombre);
        
        try {
            const usuarioId = await this.getUsuarioIdPorNombre(usuarioNombre);

            const [result] = await connection.query(
                `INSERT INTO Vehiculos (placa, marca, modelo, usuario_id) VALUES (?, ?, ?, ?)`,
                [placa, marca, modelo, usuarioId]
            );

            return {
                id: result.insertId,
                placa,
                marca,
                modelo,
                usuario_id: usuarioId,
            };
        } catch (error) {
            console.error(error.message);
            throw new Error("No se pudo crear el vehículo");
        }
    }

    async actualizar(id, campos) {
        try {
            let query = "UPDATE Vehiculos SET ";
            const params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }
            query = query.slice(0, -2);
            query += " WHERE vehiculo_id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al actualizar el vehículo");
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM Vehiculos WHERE vehiculo_id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { id };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al eliminar el vehículo");
        }
    }
}

export default Vehiculo;
