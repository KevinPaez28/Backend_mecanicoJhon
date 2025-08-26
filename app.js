import express from "express";
// import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UsuarioRouter from "./src/routes/UsuariosRoutes.js"
import VehiculosRouter from "./src/routes/vehiculosRouter.js"
import Categoriasrouter from "./src/routes/CategoriasRoutes.js";
import ServiciosRouter from "./src/routes/ServiciosRoutes.js"
import EstadosServicios from "./src/routes/EstadosServices.js"
import ProductosRouter from "./src/routes/ProductosRouter.js"
import ProductosConsumidosRouter from "./src/routes/ProductosConsumidosRouter.js"
import ReparacionesRouter from "./src/routes/ReparacionesRouter.js"
import RolesRouter from "./src/routes/RolesRoutes.js";
import facturasRoutes from "./src/routes/FacturasRouter.js"
dotenv.config();

// Crear la instancia de Express
const app = express();
// Middleware
// Habilita CORS
app.use(cors()); 
// Permite que la app acepte datos JSON
app.use(bodyParser.json()); 
// app.use(express.json());
// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({ extended: true }));
// Permite manejar cookies en las respuestas.
app.use(cookieParser());
// Rutas
app.use('/api/Usuarios/',UsuarioRouter)
app.use('/api/Vehiculos/',VehiculosRouter)
app.use('/api/Categorias/',Categoriasrouter)
app.use('/api/Servicios',ServiciosRouter)
app.use('/api/EstadoServicios/',EstadosServicios)
app.use('/api/Productos/',ProductosRouter)
app.use('/api/ProductosConsumidos/',ProductosConsumidosRouter)
app.use('/api/reparaciones/',ReparacionesRouter)
app.use('/api/Roles/',RolesRouter)
app.use('/api/Facturas/',facturasRoutes)

// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});