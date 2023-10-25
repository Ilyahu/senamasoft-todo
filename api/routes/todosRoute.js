import express from "express";
import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post('/', createTodo)

router.get("/",  getTodos)

router.put('/:id', toggleTodo)

router.put('/update/:id', updateTodo)

router.delete("/:id",  deleteTodo)

export default router