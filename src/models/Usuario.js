import connection from "../utils/db.js";

class Usuario {
    async getall() {
        try {
            const [rows] = await connection.query(`SELECT usuario_id, cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado FROM Usuarios`)
            return rows
        } catch (error) {

            throw new Error("Error al obtener los usuarios")
        }
    }

    async getbyUsuario(usuario) {
        try {
            const [rows] = await connection.query(`SELECT usuario_id, usuario, contrasena FROM Usuarios 
            WHERE usuario = ?`, [usuario])
            if (rows.length === 0) {
                return [];
            }
            return rows[0]
        } catch (error) {
            throw new Error("Error al obtener el usuario")
        }
    }

    async getbyid(id) {
        try {
            const [rows] = await connection.query(`SELECT usuario_id, cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado FROM Usuarios 
            WHERE usuario_id = ?`, [id])
            if (rows.length === 0) {
                // Retorna un array vacío si no se encuentra el producto
                return [];
            }
            return rows[0]
        } catch (error) {
            throw new Error("Error al obtener el usuario")
        }
    }
    async create(cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado) {
        try {
            const [rows] = await connection.query(
                `INSERT INTO Usuarios (cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado]
            );

            return {
                id: rows.insertId,
                cedula,
                nombre,
                correo,
                telefono,
                usuario,
                contrasena
            };

        } catch (error) {
            // Mostrar error real
            console.error("Error en Usuario.create:", error);
            throw error; // lanzamos el error real
        }
    }

    async actualizar(id, campos) {
        try {
            let query = "UPDATE Usuarios SET ";
            let params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `
                params.push(value)
            }
            query = query.slice(0, -2);

            query += " WHERE usuario_id = ?";
            params.push(id);
            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener el usuario")
        }
    }
    async activar(id) {
        try {
            const [result] = await connection.query(
                "UPDATE Usuarios SET id_estado = 1 WHERE usuario_id = ?",
                [id]
            );

            if (result.affectedRows > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al activar el usuario");
        }
    }
    async desactivar(id) {
        try {
            const [result] = await connection.query(
                "UPDATE Usuarios SET id_estado = 2 WHERE usuario_id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al activar el usuario");
        }
    }
}

export default Usuario;