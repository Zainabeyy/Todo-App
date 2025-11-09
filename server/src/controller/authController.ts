import { Request, Response } from "express";
import { getDBConnection } from "../db";
import validator from "validator";
import bcrypt from "bcryptjs";

export async function registerUser(req: Request, res: Response) {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const db = await getDBConnection();
    const emailExist = await db.get(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword =await bcrypt.hash(password, 10);

    const result= await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?,?,?,?)`,
      [name, email, username, hashedPassword]
    );
    req.session.userId= result.lastID;
    res.status(201).json({ message: "User registered successfully" });
  } catch (err: Error | any) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }

  console.log(req.body);
}
