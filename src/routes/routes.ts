import express from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
} from "../controllers/todo.controller";
const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);

export default router;
