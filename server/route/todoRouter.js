import express from "express";
import {
  addTodo,
  deleteTask,
  getAllTodos,
  deleteCompTasks,
  changeCompStatus,
} from "../controller/TodoController.js";

export const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);

todoRouter.post("/", addTodo);

todoRouter.delete("/completed", deleteCompTasks);

todoRouter.delete("/:id", deleteTask);

todoRouter.put("/:id", changeCompStatus);
