import connection from "../utils/db.js";

class Categoria {
    async getall() {
        try {
            const [rows] = await connection.query("SELECT categoria_id, nombre FROM Categorias");
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener las categorías");
        }
    }

    async getbyid(id) {
        try {
            const [rows] = await connection.query(`SELECT categoria_id, nombre FROM Categorias WHERE categoria_id = ?`,[id]);
            if (rows.length === 0){
                return [];
            } 
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener la categoría");
        }
    }

    async Create(nombre_categoria) {
        try {
            const [result] = await connection.query(
                `INSERT INTO Categorias (nombre) VALUES (?)`,
                [nombre_categoria]
            );
            return {
                id: result.insertId,
                nombre_categoria,
            };
        } catch (error) {
            throw new Error("Error al crear la categoría");
        }
    }

    async actualizar(id, campos) {
        try {
            let query = "UPDATE Categorias SET ";
            const params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }
            query = query.slice(0, -2);
            query += " WHERE categoria_id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al actualizar la categoría");
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM Categorias WHERE categoria_id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { id };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al eliminar la categoría");
        }
    }
}

export default Categoria;
