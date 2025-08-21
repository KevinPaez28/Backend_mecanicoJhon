import Categoria from "../models/categorias.js";

class CategoriasServices {
    static async getCategorias() {
        try {
            const OBJCategoria = new Categoria();
            const categorias = await OBJCategoria.getall();
            if (categorias.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay categorías registradas",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Categorías obtenidas correctamente",
                data: categorias,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las categorías",
            };
        }
    }

    static async getCategoriaByid(id) {
        try {
            const OBJCategoria = new Categoria();
            const categoria = await OBJCategoria.getbyid(id);
            if (categoria.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "Categoría no registrada",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Categoría obtenida correctamente",
                data: categoria,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener la categoría",
            };
        }
    }

    static async createCategoria(nombre) {
        try {
            const OBJCategoria = new Categoria();
            const categoriaCreada = await OBJCategoria.Create(nombre);
            return {
                error: false,
                code: 201,
                message: "Categoría creada correctamente",
                data: categoriaCreada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear la categoría",
            };
        }
    }

    static async actualizarCategoria(id, campos) {
        try {
            const OBJCategoria = new Categoria();
            const categoriaActualizada = await OBJCategoria.actualizar(id, campos);
            if (categoriaActualizada === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar la categoría",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Categoría actualizada correctamente",
                data: categoriaActualizada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar la categoría",
            };
        }
    }

    static async deleteCategoria(id) {
        try {
            const OBJCategoria = new Categoria();
            const categoriaEliminada = await OBJCategoria.delete(id);
            if (categoriaEliminada === null) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al eliminar la categoría",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Categoría eliminada correctamente",
                data: categoriaEliminada,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar la categoría",
            };
        }
    }
}

export default CategoriasServices;
