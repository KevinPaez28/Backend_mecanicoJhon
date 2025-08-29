import e from "express";
import Usuario from "../models/Usuario.js";

class UsuariosServices {
    static async getUsuarios() {
        try {
            const OBJUsuario = new Usuario();
            const usuarios = await OBJUsuario.getall();
            if (usuarios.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay Usuarios registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Usuarios obtenidos correctamente",
                data: usuarios,
            };
        } catch (error) {            
            return {
                error: true,
                code: 500,
                message: "Error al obtener los usuarios",
            };
        }
    }
    static async getusuarioByid(id) {
        try {
            const OBJUsuario = new Usuario();
            const usuarios = await OBJUsuario.getbyid(id);
            if (usuarios.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No Usuario registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Usuario obtenido correctamente",
                data: usuarios,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el usuario",
            };
        }
    }
    static async CreateUsuario(cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado) {
        try {
            const OBJUsuario = new Usuario();
            const UsuariosCreado = await OBJUsuario.Create(cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado)
            return {
                error: false,
                code: 201,
                message: "Usuario creado correctamente",
                data: UsuariosCreado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear el Usuario",
            };
        }
    }
    static async actualizarUsuario(id, campos) {
        try {
            const OBJUsuario = new Usuario();
            const UsuariosActualizado = await OBJUsuario.actualizar(id, campos);
            if (UsuariosActualizado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el Usuario",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Usuario actualizado correctamente",
                data: UsuariosActualizado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el Usuario",
            };
        }
    }
    static async ActivarUsuario(id) {
        try {
            const OBJUsuario = new Usuario();
            const ActivarUsuario = await OBJUsuario.activar(id);
            if (ActivarUsuario === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al activar el Usuario",
                }
            }
            return {
                error: false,
                code: 200,
                message: "Usuario Activado correctamente",
                data: ActivarUsuario,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el Usuario",
            };
        }
    }
    static async desactivarUsuario(id) {
        try {
            const OBJUsuario = new Usuario();
            const ActivarUsuario = await OBJUsuario.desactivar(id);
            if (ActivarUsuario === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al desactivar el Usuario",
                }
            }
            return {
                error: false,
                code: 200,
                message: "Usuario desactivado correctamente",
                data: ActivarUsuario,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el Usuario",
            };
        }
    }
}
export default UsuariosServices;