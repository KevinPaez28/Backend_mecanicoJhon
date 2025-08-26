import Producto from "../models/Productos.js";

class ProductosServices {
    static async getProductos() {
        try {
            const OBJProducto = new Producto();
            const productos = await OBJProducto.getall();
            if (productos.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay productos registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Productos obtenidos correctamente",
                data: productos,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los productos",
            };
        }
    }

    static async getProductoById(id) {
        try {
            const OBJProducto = new Producto();
            const producto = await OBJProducto.getbyid(id);
            if (!producto) {
                return {
                    error: true,
                    code: 404,
                    message: "Producto no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Producto obtenido correctamente",
                data: producto,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el producto",
            };
        }
    }

    static async createProducto(nombre, precio, stock, categoria_id) {
        try {
            const OBJProducto = new Producto();
            const productoCreado = await OBJProducto.Create(nombre, precio, stock, categoria_id);
            return {
                error: false,
                code: 201,
                message: "Producto creado correctamente",
                data: productoCreado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear el producto",
            };
        }
    }

    static async actualizarProducto(id, campos) {
        try {
            const OBJProducto = new Producto();
            const productoActualizado = await OBJProducto.actualizar(id, campos);
            if (productoActualizado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el producto",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Producto actualizado correctamente",
                data: productoActualizado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el producto",
            };
        }
    }

    static async deleteProducto(id) {
        try {
            const OBJProducto = new Producto();
            const productoEliminado = await OBJProducto.delete(id);
            if (productoEliminado === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al eliminar el producto",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Producto eliminado correctamente",
                data: productoEliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el producto",
            };
        }
    }
}

export default ProductosServices;
