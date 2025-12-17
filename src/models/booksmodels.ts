//Importamos los modulos necesarios
import fs from 'fs';
import path from 'path';
import { book } from '../types/book';

//Definimos la ruta del archivo JSON
const booksFilePath = path.join(__dirname, '../database/books.json');

//Encapsulamos todas las operaciones relacionadas con los libros en una clase
export class BookModel {
   
    //Metodo para obtener todos los libros
    static getAllBooks(): book[] {
        //Obtenemos todos los libros
        const data = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
        return data.books;
    }
   
    //Metodo para eliminar un libro por su ID
    static deleteBookById(id: number): boolean {
        //Leer el JSON y buscar por index
        const data = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
        const index = data.books.findIndex((book: book) => book.id === id);
        //Si no lo encuentra nos devuelve false
        if (index === -1) return false;
        
        //Eliminamos el libro del array
        data.books.splice(index, 1);
        //Guardamos los cambios en el archivo JSON
        fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
        return true;
    }

    //Metodo para agregar un nuevo libro
    static addBook(newBook: Omit<book, 'id'>): book {
        //Leemos el archivo JSON
        const data = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
        //Creamos un nuevo ID para el libro
        const newID = (data.books.length + 1);
        //Creamos el nuevo libro con el ID generado
        const bookToAdd = { ...newBook, id: newID };
        //Agregamos el nuevo libro al array
        data.books.push(bookToAdd);
        //Guardamos los cambios en el archivo JSON
        fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));

        return bookToAdd;
    }

    //Metodo para actualizar un libro existente por su ID
    static updateBookById(id: number, updatedBook: Partial<book>): book | null {
        //Leemos el archivo JSON
        const data = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
        const index = data.books.findIndex((book: book) => book.id === id);
        //Si no lo encuentra nos devuelve false
        if (index === -1) return null
        //Actualizamos los datos del libro
        data.books[index] = { ...data.books[index], ...updatedBook };
        //Guardamos los cambios en el archivo JSON
        fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
        return data.books[index];  //Devolvemos el libro actualizado
    }

    //Metodo para buscar libros por autor
    static findBooksByAuthor(author: string): book[] {
    const data = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));

    return data.books.filter((book: book) =>
        book.author
            .toLowerCase()
            .trim() ===
        author.toLowerCase().trim()
    );
    }

    //Metodo para mostrar la informacion de un libro por su ID
    static getBookById(id: number): book | undefined {
        //Leemos el archivo JSON
        const data = this.getAllBooks();
        //Buscamos el libro por su ID
        return data.find((book) => book.id === id);
    }
};