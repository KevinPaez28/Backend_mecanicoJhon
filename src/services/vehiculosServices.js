import Vehiculo from "../models/vehiculos.js";

class VehiculosServices {
    static async getVehiculos() {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculos = await OBJVehiculo.getall();
            if (vehiculos.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay Vehículos registrados",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Vehículos obtenidos correctamente",
                data: vehiculos,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los vehículos",
            };
        }
    }

    static async getVehiculoByid(id) {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculo = await OBJVehiculo.getbyid(id);
            if (!vehiculo) {
                return {
                    error: true,
                    code: 404,
                    message: "Vehículo no registrado",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Vehículo obtenido correctamente",
                data: vehiculo,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el vehículo",
            };
        }
    }

    static async createVehiculo(placa, marca, modelo, usuarioNombre) {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculoCreado = await OBJVehiculo.Create(
                placa,
                marca,
                modelo,
                usuarioNombre
            );
            return {
                error: false,
                code: 201,
                message: "Vehículo creado correctamente",
                data: vehiculoCreado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al crear el vehículo",
            };
        }
    }

    static async actualizarVehiculo(id, campos) {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculoActualizado = await OBJVehiculo.actualizar(id, campos);
            if (!vehiculoActualizado) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al actualizar el vehículo",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Vehículo actualizado correctamente",
                data: vehiculoActualizado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al editar el vehículo",
            };
        }
    }

    static async eliminarVehiculo(id) {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculoEliminado = await OBJVehiculo.delete(id);
            if (!vehiculoEliminado) {
                return {
                    error: true,
                    code: 400,
                    message: "Error al eliminar el vehículo",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Vehículo eliminado correctamente",
                data: vehiculoEliminado,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el vehículo",
            };
        }
    }

    static async getVehiculosByUsuario(id) {
        try {
            const OBJVehiculo = new Vehiculo();
            const vehiculos = await OBJVehiculo.getByUsuarioId(id);
            if (!vehiculos || vehiculos.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No hay vehículos para este usuario",
                };
            }
            return {
                error: false,
                code: 200,
                message: "Vehículos obtenidos correctamente",
                data: vehiculos,
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los vehículos",
            };
        }
    }
}

export default VehiculosServices;
