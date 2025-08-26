import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ResponseProvider } from "../../providers/ResponseProvider.js";

dotenv.config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return ResponseProvider.error(res, "Token no encontrado", 401, "TOKEN_MISSING");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return ResponseProvider.error(res, "Formato de token inválido", 401, "TOKEN_INVALID_FORMAT");
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return ResponseProvider.error(res, 'Token expirado', 401, 'TOKEN_EXPIRED');
        }
        return ResponseProvider.error(res, 'Token inválido', 401, 'TOKEN_INVALID');
    }
}
