import { Request, Response } from "express";
import Todo from "../model/todo.model";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const todo = { name: name, description: description, completed: false };
    const savedTodo = await new Todo(todo).save();
    return res.status(201).json({
      success: true,
      todo: savedTodo,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const savedTodos = await Todo.find({});
    if (savedTodos.length < 1) {
      throw new Error("There is no todos");
    } else {
      return res.status(200).json({
        success: true,
        todos: savedTodos,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      todo: todo,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
