import express , { Express } from "express";
import BookController from "../controllers/BookController";

const bookRouter:Express = express();

bookRouter.get('/:id?',BookController.getBooks)
bookRouter.post('/',BookController.addBook)

export default bookRouter;