import Permisos from "../../models/Permisos.js"

export const TienePermisos = (permiso) => {
    return async (req, res, next) => {
        try {
            const ConsultaPermisos = new Permisos();
            const permisos = await ConsultaPermisos.permisos();
            if (Array.isArray(permisos) && permisos.some(p => p.permiso === permiso)) {
                // Permiso válido, dejar pasar
                return next();
            } else {
                // Permiso no válido, bloquear acceso
                return res.status(403).json({ message: "No tienes permisos suficientes" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los permisos", error: error.message });
        }
    };
}
