import { Router } from "express";
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById
} from "../controllers/bookscontroller";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, addBook);
router.put("/:id", authMiddleware, updateBookById);
router.delete("/:id", authMiddleware, deleteBookById);

export default router;