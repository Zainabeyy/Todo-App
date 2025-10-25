import { getDBConnection } from "../db.js";

// ---- get all todo -----

export async function getAllTodos(req, res) {
  try {
    const db = await getDBConnection();

    const todos = await db.all(`SELECT * FROM todos ORDER BY position`);

    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: err.message });
  }
}

// ---- add new task -----

export async function addTodo(req, res) {
  const { task, completed, position } = req.body;
  try {
    const db = await getDBConnection();
    const result = await db.run(
      `INSERT INTO todos (task, completed, position)
        VALUES (?,?,?)`,
      [task, completed, position]
    );
    const newTodo = {
      id: result.lastID,
      task,
      completed,
      position,
    };
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Database insert failed" });
  }
}

// ---- delete one task -----

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    const db = await getDBConnection();

    await db.run(`DELETE FROM todos WHERE id = ?`, [id]);
    res.status(200).json({ deletedId: id });
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

// ---- delete all completed tasks -----

export async function deleteCompTasks(req, res) {
  try {
    const db = await getDBConnection();

    await db.run(`DELETE FROM todos WHERE completed = 1`);
    res.status(201).json("deleted completed tasks");
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

// ---- check and uncheck task status -----

export async function changeCompStatus(req, res) {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const db = await getDBConnection();

    await db.run(`UPDATE todos SET completed = ? WHERE id = ?`, [
      completed ? 0 : 1,
      id,
    ]);

    res.status(201).json("update the complete status of task");
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

// ---- update task position -----

export async function updateOrder(req, res) {
  const todo = req.body; 

  try {
    const db = await getDBConnection();

    await db.run("BEGIN TRANSACTION");
    for (const { id, position } of todo) {
      await db.run(`UPDATE todos SET position = ? WHERE id = ?`, [
        position,
        id,
      ]);
    }

    await db.exec("COMMIT");
    res.status(200).json("updated task postions");
  } catch (err) {
    console.error("Error reordering todos:", err);
    if (db) await db.run("ROLLBACK"); // Roll back changes if something fails
    res.status(500).json({ error: "Database reorder failed" });
  }
}
