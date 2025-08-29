import PermisosServices from "../services/PermisosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class PermisosController {
    static gerPermisos = async (req, res) => {
       const {id} = req.params;
        try {
            const response = await PermisosServices.permisoget(id);
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
}
export default PermisosController;
