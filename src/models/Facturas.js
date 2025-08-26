import connection from "../utils/db.js";

class Factura {
    // Crear Factura
    async crearFactura({ detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total }) {
        try {
            const [result] = await connection.query(
                `INSERT INTO Facturas (detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total]
            );
            return { id: result.insertId, detalle_id, empresa_id, usuario_id, fecha_emision, subtotal, total };
        } catch (error) {
            throw new Error("Error al crear la factura");
        }
    }

    // Suma total de todas las facturas
    async obtenerSumaTotalFacturas() {
        try {
            const [rows] = await connection.query(`SELECT SUM(total) AS total_facturas FROM Facturas`);
            return rows[0]?.total_facturas || 0;
        } catch (error) {
            throw new Error("Error al obtener la suma de facturas");
        }
    }

    // Obtener factura completa por ID
    async obtenerFactura(id) {
        try {
            const [rows] = await connection.query(
                `SELECT f.factura_id, f.usuario_id, u.nombre AS cliente, v.placa,
                        e.nombre AS empresa, e.nit, e.direccion, e.correo, e.representante_legal,
                        f.fecha_emision, f.subtotal, (f.total - f.subtotal) AS impuestos, f.total,
                        p.nombre AS producto, sc.cantidad_usada AS cantidad, sc.precio_unitario, sc.total AS total_producto
                 FROM Facturas f
                 JOIN Usuarios u ON f.usuario_id = u.usuario_id
                 JOIN Empresa e ON f.empresa_id = e.empresa_id
                 LEFT JOIN ServiciosRealizados sr ON f.detalle_id = sr.detalle_id
                 LEFT JOIN Vehiculos v ON sr.vehiculo_id = v.vehiculo_id
                 LEFT JOIN ServiciosConsumibles sc ON sr.detalle_id = sc.detalle_id
                 LEFT JOIN Productos p ON sc.producto_id = p.producto_id
                 WHERE f.factura_id = ?`,
                [id]
            );

            if (rows.length === 0) return null;

            const factura = {
                factura_id: rows[0].factura_id,
                usuario_id: rows[0].usuario_id,
                cliente: rows[0].cliente,
                placa: rows[0].placa,
                empresa: rows[0].empresa,
                nit: rows[0].nit,
                direccion: rows[0].direccion,
                correo: rows[0].correo,
                representante_legal: rows[0].representante_legal,
                fecha_emision: rows[0].fecha_emision,
                subtotal: rows[0].subtotal,
                impuestos: rows[0].impuestos,
                total: rows[0].total,
                detalles: []
            };

            rows.forEach(row => {
                if (row.producto) {
                    factura.detalles.push({
                        descripcion: row.producto,
                        cantidad: row.cantidad,
                        precio_unitario: row.precio_unitario,
                        total: row.total_producto
                    });
                }
            });

            return factura;
        } catch (error) {
            throw new Error("Error al obtener la factura");
        }
    }

    // Obtener todas las facturas completas
    async obtenerFacturas(usuario_id = null) {
        try {
            let sql = `SELECT f.factura_id, f.usuario_id, u.nombre AS cliente, v.placa,
                              e.nombre AS empresa, e.nit, e.direccion, e.correo, e.representante_legal,
                              f.fecha_emision, f.subtotal, (f.total - f.subtotal) AS impuestos, f.total,
                              p.nombre AS producto, sc.cantidad_usada AS cantidad, sc.precio_unitario, sc.total AS total_producto
                       FROM Facturas f
                       JOIN Usuarios u ON f.usuario_id = u.usuario_id
                       JOIN Empresa e ON f.empresa_id = e.empresa_id
                       JOIN ServiciosRealizados sr ON f.detalle_id = sr.detalle_id
                       JOIN Vehiculos v ON sr.vehiculo_id = v.vehiculo_id
                       LEFT JOIN ServiciosConsumibles sc ON sr.detalle_id = sc.detalle_id
                       LEFT JOIN Productos p ON sc.producto_id = p.producto_id`;

            const params = [];
            if (usuario_id) {
                sql += " WHERE u.usuario_id = ?";
                params.push(usuario_id);
            }

            const [rows] = await connection.query(sql, params);

            const facturasMap = {};
            rows.forEach(row => {
                if (!facturasMap[row.factura_id]) {
                    facturasMap[row.factura_id] = {
                        factura_id: row.factura_id,
                        usuario_id: row.usuario_id,
                        cliente: row.cliente,
                        placa: row.placa,
                        empresa: row.empresa,
                        nit: row.nit,
                        direccion: row.direccion,
                        correo: row.correo,
                        representante_legal: row.representante_legal,
                        fecha_emision: row.fecha_emision,
                        subtotal: row.subtotal,
                        impuestos: row.impuestos,
                        total: row.total,
                        detalles: []
                    };
                }

                if (row.producto) {
                    facturasMap[row.factura_id].detalles.push({
                        descripcion: row.producto,
                        cantidad: row.cantidad,
                        precio_unitario: row.precio_unitario,
                        total: row.total_producto
                    });
                }
            });

            return Object.values(facturasMap);
        } catch (error) {
            throw new Error("Error al obtener facturas");
        }
    }

    // Listar facturas simples
    async listarFacturas() {
        try {
            const [rows] = await connection.query("SELECT * FROM Facturas");
            return rows;
        } catch (error) {
            throw new Error("Error al listar facturas");
        }
    }

    // Actualizar Factura
    async actualizarFactura({ factura_id, detalle_id, usuario_id, empresa_id, fecha_emision, subtotal, total }) {
        try {
            const [result] = await connection.query(
                `UPDATE Facturas 
                 SET detalle_id=?, usuario_id=?, empresa_id=?, fecha_emision=?, subtotal=?, total=? 
                 WHERE factura_id=?`,
                [detalle_id, usuario_id, empresa_id, fecha_emision, subtotal, total, factura_id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error al actualizar la factura");
        }
    }

    // Eliminar Factura
    async eliminarFactura(factura_id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM Facturas WHERE factura_id = ?",
                [factura_id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error al eliminar la factura");
        }
    }

    // Eliminar Detalles de una Factura
    async eliminarDetallesFactura(factura_id) {
        try {
            const [result] = await connection.query(
                "DELETE FROM FacturaItems WHERE factura_id = ?",
                [factura_id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error al eliminar los detalles de la factura");
        }
    }
}

export default Factura;
