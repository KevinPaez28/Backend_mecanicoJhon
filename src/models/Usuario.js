import connection from "../utils/db.js";

class Usuario {
    async getall() {
        try {
            const [rows] = await connection.query(`SELECT usuario_id, cedula, nombre, correo, telefono, usuario, contrasena, rol_id, estado_usuario_id FROM Usuarios`)
            return rows
        } catch (error) {
            throw new Error("Error al obtener los usuarios")
        }
    }



    async getbyid(id) {
        try {
            const [rows] = await connection.query(`SELECT usuario_id, cedula, nombre, correo, telefono, usuario, contrasena, rol_id, estado_usuario_id FROM Usuarios 
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
    async Create(cedula, nombre, correo, telefono, usuario, contrasena) {
        try {
            const [rows] = await connection.query(`INSERT INTO Usuarios (cedula, nombre, correo, telefono, usuario, contrasena, rol_id, estado_usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [cedula, nombre, correo, telefono, usuario, contrasena])
            return {
                id: rows.insertId,
                cedula: cedula,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                usuario: usuario,
                contrasena: contrasena
            }
        } catch (error) {
            throw new Error("Error al obtener el usuario")
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
                "UPDATE Usuarios SET estado_usuario_id = 1 WHERE usuario_id = ?",
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
                "UPDATE Usuarios SET estado_usuario_id = 2 WHERE usuario_id = ?",
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