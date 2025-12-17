import path from 'path';
import { Request, Response } from 'express';
import { BookModel } from '../models/booksmodels';

const booksFilePath = path.join(__dirname, '../database/books.json');

export const getAllBooks = (req: Request, res: Response): void => {
   //  console.log("🔥 ENTRÉ A getAllBooks 🔥");
   // console.log("QUERY:", req.query);
    const { author } = req.query;

    if (author) {
        const books = BookModel.findBooksByAuthor(author as string);
        res.json(books);
        return;
    }

    const books = BookModel.getAllBooks();
    res.json(books);
};

export const deleteBookById = (req: Request, res: Response): void => {
    const id = req.params.id; //Extrae el parametro id de la solicitud
    //Llamamos al metodo del modelo
    const isDeleted = BookModel.deleteBookById(Number(id));
    //Verificamos que exista el ID
    if (!isDeleted) {
        res.status(404).json({ message: 'Libro no encontrado' });
        return;
    }
    //Si es eliminado, devolvemos un mensaje de exito
    res.json({ message: 'Libro eliminado exitosamente' });
};

export const addBook = (req: Request, res: Response): void => {
    const { title, author } = req.body;

    if (!title || !author) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
    }

    const newBook = BookModel.addBook({ title, author });

    res.status(201).json(newBook);
};

export const updateBookById = (req: Request, res: Response): void => {
    //llamamos al metodo del modelo
    const updateBook = BookModel.updateBookById(Number(req.params.id), req.body);
    //Verificamos que exista el ID
    if (!updateBook) {
        res.status(404).json({ message: 'Libro no encontrado' });
        return;
    }
    //Si es actualizado, devolvemos un mensaje de exito
    res.json({ message: 'Libro actualizado exitosamente', updateBook });
    
};

export const getBookById = (req: Request, res: Response): void => {
    const { id } = req.params; //Extrae el parametro id de la solicitud
    //Lllamamos al metodo del modelo
    const book = BookModel.getBookById(Number(id));
    //Verificamos que exista el ID
    if (!book) {
        res.status(404).json({ message: 'Libro no encontrado' });
        return;
    }
    //Si lo encuentra, devolvemos el libro
    res.json(book);
};