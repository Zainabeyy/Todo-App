import express from "express";
import {
  addTodo,
  deleteTask,
  getAllTodos,
  deleteCompTasks,
  changeCompStatus,
  updateOrder,
} from "../controller/TodoController";

export const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);

todoRouter.post("/", addTodo);

todoRouter.delete("/completed", deleteCompTasks);
todoRouter.put("/reorder", updateOrder);

todoRouter.delete("/:id", deleteTask);

todoRouter.put("/:id", changeCompStatus);
