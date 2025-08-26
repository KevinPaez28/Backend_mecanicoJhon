import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";
import connection from "../../utils/db.js";

export async function camposUsuarios(req, res, next) {
    const errors = [];
    const bodyKeys = Object.keys(req.body);
    const camposPermitidos = campos.map((c) => c.name);
    const camposPresentes = bodyKeys.filter((key) =>
        camposPermitidos.includes(key)
    );

    if (camposPresentes.length === 0) {
        return ResponseProvider.error(
            res,
            "Debe enviar al menos un campo válido",
            400
        );
    }

    for (const campo of campos) {
        const { name, required, minLength, maxLength } = campo;
        const valor = req.body[name];

        if (valor !== undefined) {
            // Campos obligatorios
            if (required && valor === "") {
                errors.push({
                    campo: name,
                    message: `El campo ${name} es obligatorio y no puede estar vacío.`,
                });
                continue;
            }

            // Validar longitud mínima
            if (minLength && valor.length < minLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} debe tener al menos ${minLength} caracteres.`,
                });
                continue;
            }

            // Validar longitud máxima
            if (maxLength && valor.length > maxLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
                });
                continue;
            }

            // Validar formato de correo
            if (name === "correo") {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(valor)) {
                    errors.push({
                        campo: name,
                        message: `El campo ${name} tiene un formato inválido.`,
                    });
                }
                continue;
            }

            // Validar duplicados (POST = creación)
            if (name === "cedula") {
                const [rows] = await connection.query(
                    `SELECT cedula FROM usuarios WHERE cedula = ?`,
                    [valor]
                );
                if (rows.length > 0) {
                    errors.push({
                        campo: name,
                        message: `La ${name} ya está registrada.`,
                    });
                }
                continue;
            }

            if (name === "usuario") {
                const [rows] = await connection.query(
                    `SELECT usuario FROM usuarios WHERE usuario = ?`,
                    [valor]
                );
                if (rows.length > 0) {
                    errors.push({
                        campo: name,
                        message: `El ${name} ya está registrado.`,
                    });
                }
                continue;
            }
        }
    }

    // Retornar todos los errores encontrados
    if (errors.length > 0) {
        return ResponseProvider.error(res, "Errores de validación", 400, errors);
    }

    // Si no hay errores, continuar con el registro
    next();
}
