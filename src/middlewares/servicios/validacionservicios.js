import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

import connection from "../../utils/db.js";


export async function camposServicios(req, res, next) {
    const { id } = req.params;
    console.log(id);

    const errors = [];
    // Capturamos los campos del body de la petición
    const bodyKeys = Object.keys(req.body);
    // Validar que el body no esté vacío
    const camposPermitidos = campos.map((c) => c.name);
    // Validar que al menos un campo permitido esté presente
    const camposPresentes = bodyKeys.filter((key) =>
        camposPermitidos.includes(key)
    );
    // Si no hay campos presentes, solo saltar la validación si el método es DELETE
    if (camposPresentes.length === 0) {
        if (req.method === "DELETE") {
            // Validar si el servicio está asociado a una reparación antes de eliminar
            const servicioId = req.params.id || req.body.servicio_id;
            if (servicioId) {
                try {
                    const [rows] = await connection.query(
                        `SELECT detalle_id FROM serviciosRealizados WHERE servicio_id = ?`,
                        [servicioId]
                    );
                    if (rows.length > 0) {
                        return ResponseProvider.error(
                            res,
                            "No se puede eliminar el servicio porque está asociado a una reparación.",
                            400
                        );
                    }
                } catch (err) {
                    return ResponseProvider.error(
                        res,
                        `Error al consultar asociación con reparación: ${err.message}`,
                        500
                    );
                }
            }
            return next();
        }
        return ResponseProvider.error(
            res,
            "Debe enviar al menos un campo válido para actualizar",
            400
        );
    }

    // Recorremos el arreglo de campos a validar
    for (const campo of campos) {
        const {
            name, // Nombre del campo a validar
            required, // Si el campo es requerido
            minLength, // si el campo tiene un tamaño mínimo
            maxLength, // si el campo tiene un tamaño máximo
        } = campo;
        const valor = req.body[name];
        if (valor !== undefined) {
            if (required && valor === "") {
                errors.push({
                    campo: name,
                    message: `El campo ${name} es obligatorio y no puede estar vacío.`,
                });
                continue;
            }
            if (minLength && valor.length < minLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} debe tener al menos ${minLength} caracteres.`,
                });
                continue;
            }
            if (maxLength && valor.length > maxLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
                });
                continue;
            }
            // Validar si el servicio está asociado a una reparación
            if (name === "servicio_id") {
                try {
                    const [rows] = await connection.query(
                        `SELECT reparacion_id FROM Reparaciones WHERE servicio_id = ?`,
                        [valor]
                    );
                    if (rows.length > 0) {
                        errors.push({
                            campo: name,
                            message: `El servicio está asociado a una reparación.`
                        });
                    } else {
                        errors.push({
                            campo: name,
                            message: `El servicio no está asociado a ninguna reparación.`
                        });
                    }
                } catch (err) {
                    errors.push({
                        campo: name,
                        message: `Error al consultar asociación con reparación: ${err.message}`
                    });
                }
            }
        }
    }

    // Si hay errores, devolver una respuesta con los errores
    if (errors.length > 0) {
        // Retornamos y Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, "Error de validación", 400, errors);
    }
    // Si todo está bien, pasamos al siguiente middleware o controlador
    next();
}