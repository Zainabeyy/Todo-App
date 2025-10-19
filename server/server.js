import express from "express";
import { todoRouter } from "./route/todoRouter.js";
import cors from "cors";

const PORT = 8000;

const app = express();

app.use(cors());

app.use("/api/todo", todoRouter);

app.listen(PORT, () => console.log(`server connected on port: ${PORT}`));
