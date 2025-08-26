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
  // Asiganmos el token a una variable
  const authHeader = req.headers.authorization;
  try {
    const refreshToken = authHeader.split(" ")[1];
    // Verificamos el token de accesso
    const response = await AuthServices.verifyAccessToken(refreshToken);
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(
      res,
      response.data,
      response.message,
      response.code
    );
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};