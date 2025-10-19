import { getDBConnection } from "../db.js";

export async function getAllTodos(req, res) {
  try {
    const db = await getDBConnection();

    const todos =await db.all("SELECT * FROM todos");

    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: err.message });
  }
}
