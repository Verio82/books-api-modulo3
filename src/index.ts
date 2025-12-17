//Importamos express y algunos tipos especificos
import express from 'express';

//Importamos las rutas
import booksRoutes from './routes/booksroutes';

//Importamos middlewares
import { loggerMiddleware } from './middlewares/loggermiddleware';
import { errorMiddleware } from './middlewares/errormiddleware';
import cors from 'cors';

//Creamos una instancia de app
const app = express();

// Middlewares globales
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());

//Configuracion de rutas principales de la app
app.use('/books', booksRoutes);

// Middleware de errores (SIEMPRE AL FINAL)
app.use(errorMiddleware);

//Definimos el puerto
const PORT = 3000;

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});