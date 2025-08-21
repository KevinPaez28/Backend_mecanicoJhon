import connection from "../utils/db.js";

class Producto {
    // Obtener todos los productos
    async getall() {
        try {
            const [rows] = await connection.query(
                "SELECT producto_id, nombre, precio, stock, categoria_id FROM Productos"
            );
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los productos");
        }
    }

    // Obtener un producto por ID
    async getbyid(id) {
        try {
            const [rows] = await connection.query(
                "SELECT producto_id, nombre, precio, stock, categoria_id FROM Productos WHERE producto_id = ?",
                [id]
            );
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el producto");
        }
    }

    // Crear un nuevo producto
    async Create(nombre, precio, stock, categoria_id) {
        try {
            const [result] = await connection.query(
                "INSERT INTO Productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)",
                [nombre, precio, stock, categoria_id]
            );
            return {
                id: result.insertId,
                nombre,
                precio,
                stock,
                categoria_id
            };
        } catch (error) {
            throw new Error("Error al crear el producto");
        }
    }

    // Actualizar un producto existente
    async actualizar(id, campos) {
        try {
            let query = "UPDATE Productos SET ";
            const params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }

            query = query.slice(0, -2); // Eliminar la última coma
            query += " WHERE producto_id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al actualizar el producto");
        }
    }

    // Eliminar un producto por ID
    async delete(id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM Productos WHERE producto_id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { id };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Error al eliminar el producto");
        }
    }
}

export default Producto;
