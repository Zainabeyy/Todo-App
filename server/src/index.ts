import express from "express";
import cors from "cors";
import { todoRouter } from "./route/todoRouter";

const PORT = 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/todo", todoRouter);

app.use("/api/auth", todoRouter);

app.listen(PORT, () => console.log(`server connected on port: ${PORT}`));
