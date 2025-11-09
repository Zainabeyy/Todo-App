import express from "express";
import cors from "cors";
import session from "express-session";
import { todoRouter } from "./route/todoRouter";
import { authRouter } from "./route/authRouter";

const PORT = 8000;
const SECRET = process.env.SPIRAL_SESSION_SECRET || "jellyfish-baskingshark";

const app = express();

app.use(cors());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use("/api/todo", todoRouter);

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`server connected on port: ${PORT}`));
