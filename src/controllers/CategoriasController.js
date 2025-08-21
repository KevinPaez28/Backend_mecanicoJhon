import CategoriasServices from "../services/CategoriasServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class CategoriaController {
    static getCategorias = async (req, res) => {        
        try {
            const response = await CategoriasServices.getCategorias();
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

    static getByIdCategorias = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await CategoriasServices.getCategoriaByid(id);
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

    static postCategoria = async (req, res) => {
        const { nombre } = req.body;
        try {
            const categoria = await CategoriasServices.createCategoria(nombre);
            if (categoria.error) {
                return ResponseProvider.error(
                    res,
                    categoria.message,
                    categoria.code
                );
            }
            return ResponseProvider.success(
                res,
                categoria,
                "Categoría creada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear la categoría",
                500
            );
        }
    }

    static actualizarCategorias = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const categoria = await CategoriasServices.actualizarCategoria(id, campos);
            if (categoria == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar la categoría",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                categoria,
                "Categoría modificada correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar la categoría",
                500
            );
        }
    }

     static deleteCategorias = async (req, res) => {
        const { id } = req.params;
        try {
            const categoria = await CategoriasServices.deleteCategoria(id);
            if (categoria == null) {
                return ResponseProvider.error(
                    res,
                    "Error al eliminar la categoría",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                categoria,
                "Categoría eliminada correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar la categoría",
                500
            );
        }
    }
}

export default CategoriaController;
