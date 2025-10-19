import express from 'express';
import { getAllTodos } from '../controller/getTodoController.js';

export const todoRouter= express.Router();

todoRouter.get('/', getAllTodos)