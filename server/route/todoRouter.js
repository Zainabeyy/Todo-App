import express from 'express';
import { addTodo, deleteTask, getAllTodos } from '../controller/TodoController.js';

export const todoRouter= express.Router();

todoRouter.get('/', getAllTodos);

todoRouter.post('/', addTodo);

todoRouter.delete('/:id', deleteTask);