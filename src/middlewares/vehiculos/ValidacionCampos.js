import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./camposvehiculos.js";
import connection from "../../utils/db.js";

export async function camposVehiculos(req, res, next) {
    const errors = [];
    console.log("Campos a validar:", campos);
    console.log("Body recibido:", req.body);
    const { vehiculo_id } = req.params;

    // Capturamos los campos del body de la petición
    const bodyKeys = Object.keys(req.body);

    // Campos permitidos según tu arreglo de configuración
    const camposPermitidos = campos.map(c => c.name);

    // Verificamos que al menos un campo permitido esté presente
    const camposPresentes = bodyKeys.filter(key => camposPermitidos.includes(key));
    if (camposPresentes.length === 0) {
        return ResponseProvider.error(
            res,
            "Debe enviar al menos un campo válido para actualizar",
            400
        );
    }

    // Recorremos cada campo a validar
    for (const campo of campos) {
        const { name, required, minLength, maxLength } = campo;
        const valor = req.body[name];

        if (valor !== undefined) {
            // Validar campo obligatorio
            if (required && valor === "") {
                errors.push({
                    campo: name,
                    message: `El campo ${name} es obligatorio y no puede estar vacío.`
                });
                continue;
            }

            // Validar longitud mínima
            if (minLength && valor.length < minLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} debe tener al menos ${minLength} caracteres.`
                });
                continue;
            }

            // Validar longitud máxima
            if (maxLength && valor.length > maxLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`
                });
                continue;
            }

            // Validar existencia del usuario en DB
            if (name === "usuario") {
                console.log("Validando usuario:", valor, "Campo:", name);

                try {
                    const [rows] = await connection.query(
                        `SELECT usuario_id FROM Usuarios WHERE usuario = ?`,
                        [valor]
                    );
                    console.log("Resultado query:", rows);

                    if (rows.length === 0) {
                        console.log("Usuario no encontrado en la base de datos");
                        errors.push({
                            campo: name,
                            message: `El usuario "${valor}" no está registrado.`
                        });
                    }
                } catch (err) {
                    console.log(err);
                    
                    errors.push({
                        campo: name,
                        message: `Error al validar el usuario: ${err.message}`
                    });
                }

                continue;
            }

            if (name === "placa") {
                try {
                    const [resultado] = await connection.query(
                        `SELECT placa FROM vehiculos WHERE placa = ? AND vehiculo_id != ?`,
                        [valor, vehiculo_id] // idVehiculo = el id del vehículo que estás actualizando
                    );

                    if (resultado.length > 0) {
                        errors.push({
                            campo: name,
                            message: `La placa "${valor}" ya está registrada en otro vehículo.`
                        });
                    }
                } catch (err) {
                    errors.push({
                        campo: name,
                        message: `Error al validar la placa: ${err.message}`
                    });
                }

                continue;
            }
        }
    }

    // Si hay errores, devolvemos la respuesta con todos ellos
    if (errors.length > 0) {
        return ResponseProvider.error(res, "Error de validación", 400, errors);
    }

    // Todo OK, pasamos al siguiente middleware/controlador
    next();
}
