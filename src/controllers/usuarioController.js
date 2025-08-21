import UsuariosServices from "../services/usuariosService.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class UsuarioController {
    static getUsuarios = async (req, res) => {
        try {
            const response = await UsuariosServices.getUsuarios();
            if (response.error) {
                return ResponseProvider.error(
                    res,
                    response.message,
                    response.code
                );
            }
            return ResponseProvider.success(
                res,
                response.data,
                response.message,
                response.code
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno en el servidor",
                500
            );
        }
    }
    static getByidUsuarios = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await UsuariosServices.getusuarioByid(id);
            if (response.error) {
                return ResponseProvider.error(
                    res,
                    response.message,
                    response.code
                );
            }
            return ResponseProvider.success(
                res,
                response.data,
                response.message,
                response.code
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno en el servidor",
                500
            );
        }
    }
    static postUsuarios = async (req, res) => {
        const { cedula, nombre, correo, telefono, usuario, contrasena } = req.body;
        try {
            const Usuarios = await UsuariosServices.CreateUsuario(cedula, nombre, correo, telefono, usuario, contrasena);
            // Validamos que la respuesta no tenga error
            if (Usuarios.error) {
                // Llamamos el provider para centralizar los mensajes de respuesta
                return ResponseProvider.error(
                    res,
                    Usuarios.message,
                    Usuarios.code
                );
            }
            // Retornamos el producto creado
            return ResponseProvider.success(
                res,
                Usuarios,
                "Usuario creado correctamente",
                201
            );
        } catch (error) {
            // Llamamos el provider para centralizar los mensajes de respuesta
            return ResponseProvider.error(
                res,
                "Error interno al crear el usuario",
                500
            );
        }
    }
    static actualizarUsuarios = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const Usuario = await UsuariosServices.actualizarUsuario(id, campos);
            if (Usuario == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el usuario",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                Usuario,
                "Usuario modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el usuario",
                500
            );
        }
    }
    static ActivarUsuarios = async (req, res) => {
        const { id } = req.params;
        try {
            const Usuarios = await UsuariosServices.ActivarUsuario(id)
            if (Usuarios == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el usuario",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                Usuarios,
                "Usuario activado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el usuario",
                500
            );
        }
    }
    static desactivarUsuarios = async (req, res) => {
        const { id } = req.params;
        try {
            const Usuarios = await UsuariosServices.desactivarUsuario(id)
            if (Usuarios == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el usuario",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                Usuarios,
                "Usuario desactivado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el usuario",
                500
            );
        }
    }
}

export default UsuarioController;