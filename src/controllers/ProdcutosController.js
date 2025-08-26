import ProductosServices from "../services/ProductosServices.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";

class ProductosController {
    static getProductos = async (req, res) => {
        try {
            const response = await ProductosServices.getProductos();
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

    static getByIdProducto = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await ProductosServices.getProductoById(id);
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

    static postProducto = async (req, res) => {
        const { nombre, precio, stock, categoria_id } = req.body;
        try {
            const producto = await ProductosServices.createProducto(nombre, precio, stock, categoria_id);
            if (producto.error) {
                return ResponseProvider.error(
                    res,
                    producto.message,
                    producto.code
                );
            }
            return ResponseProvider.success(
                res,
                producto,
                "Producto creado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al crear el producto",
                500
            );
        }
    }

    static actualizarProducto = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const producto = await ProductosServices.actualizarProducto(id, campos);
            if (producto == null) {
                return ResponseProvider.error(
                    res,
                    "Error al actualizar el producto",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                producto,
                "Producto modificado correctamente",
                201
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al actualizar el producto",
                500
            );
        }
    }

    static deleteProducto = async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await ProductosServices.deleteProducto(id);
            if (producto == null) {
                return ResponseProvider.error(
                    res,
                    "Error al eliminar el producto",
                    400
                );
            }
            return ResponseProvider.success(
                res,
                producto,
                "Producto eliminado correctamente",
                200
            );
        } catch (error) {
            return ResponseProvider.error(
                res,
                "Error interno al eliminar el producto",
                500
            );
        }
    }
}

export default ProductosController;
