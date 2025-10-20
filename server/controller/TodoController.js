import { getDBConnection } from "../db.js";

export async function getAllTodos(req, res) {
  try {
    const db = await getDBConnection();

    const todos = await db.all("SELECT * FROM todos");

    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: err.message });
  }
}

export async function addTodo(req, res) {
  const { task, completed, order } = req.body;
  try {
    const db = await getDBConnection();
    const result=await db.run(
      `INSERT INTO todos (task, completed, "order")
        VALUES (?,?,?)`,
      [task, completed, order]
    );
    const newTodo={
      id: result.lastID,
      task,
      completed,
      order
    }
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ error: "Database insert failed" });
  }
}


export async function deleteTask(req, res) {
  const { id } = req.params;
  console.log(id, typeof id)
  try {
    const db = await getDBConnection();

    const result=await db.run(
      `DELETE FROM todos WHERE id = ?`,
      [id]
    );
    const updateTodoList=await db.exec('SELECT * FROM todos;')
    res.status(201).json(updateTodoList);
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}
