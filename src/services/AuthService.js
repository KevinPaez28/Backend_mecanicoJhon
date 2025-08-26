import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;
const refreshExpiration = process.env.REFRESH_EXPIRATION;

class AuthServices {
  static async register(cedula, nombre, correo, telefono, usuario, contrasena, rol_id, id_estado) {
    try {
      const contraseñaEncriptada = await bcrypt.hash(contrasena, 10)

      const Userid = new Usuario()
      const usuarios = await Userid.create(cedula, nombre, correo, telefono, usuario, contraseñaEncriptada, rol_id, id_estado)
      return { error: false, code: 201, message: "Usuario creado" };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: "Error al crear el usuario" };
    }
  }

  static async login(usuario, contrasena) {
    try {
      const Userid = new Usuario()
      const usuarios = await Userid.getbyUsuario(usuario);
      console.log(usuarios);

      if (!usuarios)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };

      const validPassword = await bcrypt.compare(contrasena, usuarios.contrasena);
      if (!validPassword)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      const accessToken = await this.generarToken(usuarios);
      const refreshToken = this.generarTokenRefresco(usuarios);
      // await Usuario.updateRefreshToken(user.id, refreshToken);
      return {
        error: false,
        code: 201,
        message: "Usuario autenticado correctamente",
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: "Error en el servidor" };
    }
  }
  static async generarToken(user) {
    return jwt.sign({
      id: user.usuario_id,
      usuario: user.usuario
    },
      secretKey,
      { expiresIn: tokenExpiration }
    )
  }

  static generarTokenRefresco(user) {
    return jwt.sign(
      {
        id: user.usuario_id,
        usuario: user.usuario
      },
      refreshSecretKey,
      { expiresIn: refreshExpiration }
    );
  }
  static async verifyAccessToken(refreshToken) {
  try {
    // Verifica el refresh token
    const decoded = jwt.verify(refreshToken, refreshSecretKey);

    // Reconstruye el usuario para generar el accessToken
    const user = {
      usuario_id: decoded.id,
      usuario: decoded.usuario
    };

    // Genera un nuevo accessToken correctamente
    const accessToken = await this.generarToken(user);

    // Genera un nuevo refreshToken
    const newRefreshToken = this.generarTokenRefresco(user);

    return {
      error: false,
      code: 201,
      message: "Token actualizado correctamente",
      data: {
        accessToken,       
        refreshToken: newRefreshToken,
      },
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        error: true,
        code: 403,
        message: "Token expirado, solicita un nuevo login",
      };
    }
    return { error: true, code: 403, message: "Token inválido" };
  }
}




  static async renovarTokenAcceso(refreshToken, decoded) {
    let newRefreshToken = "";
    const tiempoRestante = decoded.exp - Math.floor(Date.now() / 1000);

    if (tiempoRestante < 60 * 60 * 24) {
      // Si quedan menos de 24 horas
      newRefreshToken = jwt.sign(
        { id: decoded.id, usuario: decoded.usuario },
        refreshSecretKey,
        { expiresIn: refreshExpiration }
      );
    }
    return newRefreshToken;
  }


}
export default AuthServices;