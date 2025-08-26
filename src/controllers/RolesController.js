import RolesServices from "../services/RolesServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class RolController {
    static getRoles = async (req, res) => {
        try {
            const response = await RolesServices.getRoles();
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

    static getByidRoles = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await RolesServices.getRolById(id);
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

export default RolController;
