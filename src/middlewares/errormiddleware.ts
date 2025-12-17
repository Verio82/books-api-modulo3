//Importamos los tipos especificos de express
import { Request, Response, NextFunction } from "express";

//Middleware global para capturar errores no manejados en la app
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error('Error: ', err.message);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });

};