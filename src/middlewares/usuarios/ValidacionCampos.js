import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";
import connection from "../../utils/db.js";


export async function camposUsuarios(req, res, next) {
    const { id } = req.params;
    console.log(id);
    
    const errors = [];
    const bodyKeys = Object.keys(req.body);
    const camposPermitidos = campos.map((c) => c.name);
    const camposPresentes = bodyKeys.filter((key) =>
        camposPermitidos.includes(key)
    );
    if (camposPresentes.length === 0) {
        return ResponseProvider.error(
            res,
            "Debe enviar al menos un campo válido para actualizar",
            400
        );
    }

    for (const campo of campos) {
        const {
            name, 
            required, 
            minLength, 
            maxLength, 
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
            // Validar el tamaño máximo del campo
            if (maxLength && valor.length > maxLength) {
                errors.push({
                    campo: name,
                    message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
                });
                continue;
            }
            if (name === "correo") {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                if (!regex.test(valor)) {
                    errors.push({
                        campo: name,
                        mensaje: `El campo ${name} tiene un formato invalido`
                    })
                }
                continue
            }
            if (name == "cedula") {
                const [campos_repetidos] = await connection.query(`SELECT cedula FROM usuarios WHERE cedula = ? AND usuario_id <> ?`,[valor,id])
                
                if (campos_repetidos.length > 0) {
                    errors.push({
                        campo: name,
                        mensaje: `la ${name} ya esta registrada`
                    })
                }
                continue
            }
            if (name == "usuario") {
                const [campos_repetidos] = await connection.query(`SELECT usuario FROM usuarios WHERE usuario = ? AND usuario_id <> ? `, [valor, id])
                if (campos_repetidos.length > 0) {
                    errors.push({
                        campo: name,
                        mensaje: `el ${name} ya esta registrado`
                    })
                }
                continue
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