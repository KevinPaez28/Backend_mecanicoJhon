import AuthServices from "../services/AuthService.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

export const register = async (req, res) => {
  const { cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado } = req.body;
  try {
    const response = await AuthServices.register(cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado);
    if (response.error) {
      ResponseProvider.error(res, response.message, response.code);
    } else {
      ResponseProvider.success(res, response.data || {}, response.message, response.code);
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}
export const login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const response = await AuthServices.login(usuario, contrasena);
    if (response.error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(
        res,
        response.message,
        response.code
      );
    } else {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return ResponseProvider.error(res, "No se envió el refresh token", 400);
    }
    const response = await AuthServices.verifyAccessToken(refreshToken);
    ResponseProvider.success(
      res,
      response.data,
      response.message,
      response.code
    );
  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};