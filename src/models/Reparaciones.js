import connection from "../utils/db.js";

class Reparacion {
    // Obtener todas las reparaciones con detalles completos y consumibles
    async getall() {
        try {
            const sql = `
                SELECT sr.detalle_id, sr.servicio_id, s.nombre_servicio, sr.vehiculo_id, v.placa,
                       v.usuario_id, u.nombre AS cliente, sr.fecha, sr.observaciones, sr.nombre_mecanico,
                       sr.estado_id, es.nombre_estado,
                       sc.id AS consumible_id,
                       p.producto_id, p.nombre AS nombre_producto,
                       CONCAT(p.nombre, ' - ', IFNULL(sc.cantidad_usada, 0), ' unidades') AS producto_detalle,
                       sc.cantidad_usada
                  FROM ServiciosRealizados sr
                  INNER JOIN Servicios s ON sr.servicio_id = s.servicio_id
                  INNER JOIN Vehiculos v ON sr.vehiculo_id = v.vehiculo_id
                  INNER JOIN Usuarios u ON v.usuario_id = u.usuario_id
                  INNER JOIN EstadosServicio es ON sr.estado_id = es.estado_id
                  LEFT JOIN ServiciosConsumibles sc ON sr.detalle_id = sc.detalle_id
                  LEFT JOIN Productos p ON sc.producto_id = p.producto_id
            `;
            const [rows] = await connection.query(sql);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener las reparaciones");
        }
    }

    // Obtener reparaciones por usuario
    async getByUsuario(usuarioId) {
        try {
            const sql = `
                SELECT sr.detalle_id, sr.fecha, sr.observaciones, sr.nombre_mecanico,
                       v.placa, u.nombre AS cliente, es.nombre_estado AS estado, s.nombre_servicio AS servicio
                  FROM ServiciosRealizados sr
                  INNER JOIN Vehiculos v ON sr.vehiculo_id = v.vehiculo_id
                  INNER JOIN Usuarios u ON v.usuario_id = u.usuario_id
                  INNER JOIN EstadosServicio es ON sr.estado_id = es.estado_id
                  INNER JOIN Servicios s ON sr.servicio_id = s.servicio_id
                 WHERE v.usuario_id = ?
            `;
            const [rows] = await connection.query(sql, [usuarioId]);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener reparaciones por usuario");
        }
    }

    // Obtener reparación por ID
    async getbyid(id) {
        try {
            const sql = `
                SELECT sr.detalle_id, sr.servicio_id, s.nombre_servicio, sr.vehiculo_id, v.placa,
                       v.usuario_id, u.nombre AS cliente, sr.fecha, sr.observaciones, sr.nombre_mecanico,
                       sr.estado_id, es.nombre_estado,
                       sc.id AS consumible_id,
                       p.producto_id, p.nombre AS nombre_producto,
                       CONCAT(p.nombre, ' - ', IFNULL(sc.cantidad_usada, 0), ' unidades') AS producto_detalle,
                       sc.cantidad_usada
                  FROM ServiciosRealizados sr
                  INNER JOIN Servicios s ON sr.servicio_id = s.servicio_id
                  INNER JOIN Vehiculos v ON sr.vehiculo_id = v.vehiculo_id
                  INNER JOIN Usuarios u ON v.usuario_id = u.usuario_id
                  INNER JOIN EstadosServicio es ON sr.estado_id = es.estado_id
                  LEFT JOIN ServiciosConsumibles sc ON sr.detalle_id = sc.detalle_id
                  LEFT JOIN Productos p ON sc.producto_id = p.producto_id
                 WHERE sr.detalle_id = ?
            `;
            const [rows] = await connection.query(sql, [id]);
            return rows[0] || null;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener la reparación");
        }
    }
    
    async getfecha(){
        try {
            const sql = `SELECT sr.fecha, v.placa, s.nombre_servicio FROM serviciosrealizados sr
            INNER JOIN vehiculos v ON sr.vehiculo_id = v.vehiculo_id 
            INNER JOIN servicios s ON sr.servicio_id = s.servicio_id`
            const [rows] = await connection.query(sql);
            return rows;
        } catch (error) {
           throw new Error("Error al crear la reparación");
        }
    }

    async getAdmin(){
        try {
            const [rows] = await connection.query (` SELECT sr.detalle_id, sr.fecha, sr.observaciones,
               v.placa,
               u.nombre AS usuario,
               es.nombre_estado AS estado,
               s.nombre_servicio AS servicio
        FROM serviciosrealizados sr
        INNER JOIN vehiculos v ON sr.vehiculo_id = v.vehiculo_id
        INNER JOIN usuarios u ON v.usuario_id = u.usuario_id
        INNER JOIN estadosservicio es ON sr.estado_id = es.estado_id
        INNER JOIN servicios s ON sr.servicio_id = s.servicio_id`)
            ;
            console.log(rows);
            return rows
        } catch (error) {
           throw new Error("Error al encontrar la reparacion");
        }
    }

    // Insertar nueva reparación
    async Create(data) {
        try {
             const [rows] = await connection.query(`
                INSERT INTO ServiciosRealizados (servicio_id, vehiculo_id, fecha, observaciones, estado_id, nombre_mecanico)
                VALUES (?, ?, ?, ?, ?, ?)
            `);
            const [result] = await connection.query(sql, [
                data.servicio_id,
                data.vehiculo_id,
                data.fecha,
                data.observaciones,
                data.estado_id,
                data.nombre_mecanico,
            ]);
            return { id: result.insertId, ...data };
        } catch (error) {
            throw new Error("Error al crear la reparación");
        }
    }

    // Actualizar reparación
    async actualizar(id, campos) {
        try {
            let query = "UPDATE ServiciosRealizados SET ";
            const params = [];

            for (const [key, value] of Object.entries(campos)) {
                query += `${key} = ?, `;
                params.push(value);
            }
            query = query.slice(0, -2);
            query += " WHERE detalle_id = ?";
            params.push(id);

            const [result] = await connection.query(query, params);
            if (result.affectedRows > 0) {
                return { id, ...campos };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error al actualizar la reparación");
        }
    }

    // Obtener consumibles por detalle
    async getConsumiblesPorDetalle(detalleId) {
        try {
            const sql = `
                SELECT sc.id AS consumible_id, sc.detalle_id, sc.producto_id, p.nombre, sc.cantidad_usada
                  FROM ServiciosConsumibles sc
                  INNER JOIN Productos p ON sc.producto_id = p.producto_id
                 WHERE sc.detalle_id = ?
            `;
            const [rows] = await connection.query(sql, [detalleId]);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los consumibles de la reparación");
        }
    }

    // Eliminar consumible o reparación completa
    async delete(detalleId, consumibleId = null) {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            if (consumibleId !== null) {
                // Eliminar solo consumible
                const [rows] = await conn.query(
                    "SELECT cantidad_usada FROM ServiciosConsumibles WHERE detalle_id = ? AND producto_id = ?",
                    [detalleId, consumibleId]
                );

                if (rows.length === 0) {
                    await conn.rollback();
                    return null;
                }

                const cantidadUsada = rows[0].cantidad_usada;

                await conn.query(
                    "UPDATE Productos SET stock = stock + ? WHERE producto_id = ?",
                    [cantidadUsada, consumibleId]
                );

                const [result] = await conn.query(
                    "DELETE FROM ServiciosConsumibles WHERE detalle_id = ? AND producto_id = ?",
                    [detalleId, consumibleId]
                );

                await conn.commit();
                return result.affectedRows > 0 ? { detalleId, consumibleId } : null;
            } else {
                // Eliminar todos los consumibles y la reparación
                const [consumibles] = await conn.query(
                    "SELECT producto_id, cantidad_usada FROM ServiciosConsumibles WHERE detalle_id = ?",
                    [detalleId]
                );

                for (const c of consumibles) {
                    await conn.query(
                        "UPDATE Productos SET stock = stock + ? WHERE producto_id = ?",
                        [c.cantidad_usada, c.producto_id]
                    );
                }

                await conn.query(
                    "DELETE FROM ServiciosConsumibles WHERE detalle_id = ?",
                    [detalleId]
                );

                const [result] = await conn.query(
                    "DELETE FROM ServiciosRealizados WHERE detalle_id = ?",
                    [detalleId]
                );

                await conn.commit();
                return result.affectedRows > 0 ? { detalleId } : null;
            }
        } catch (error) {
            console.log(error);
            await conn.rollback();
            throw new Error("Error al eliminar la reparación o consumible");
        } finally {
            conn.release();
        }
    }
}

export default Reparacion;
