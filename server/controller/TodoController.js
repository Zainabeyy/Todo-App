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
    const result = await db.run(
      `INSERT INTO todos (task, completed, "order")
        VALUES (?,?,?)`,
      [task, completed, order]
    );
    const newTodo = {
      id: result.lastID,
      task,
      completed,
      order,
    };
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Database insert failed" });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    const db = await getDBConnection();

    await db.run(`DELETE FROM todos WHERE id = ?`, [id]);

    const updateTodoList = await db.all("SELECT * FROM todos;");
    res.status(201).json(updateTodoList);
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

export async function deleteCompTasks(req, res) {
  try {
    const db = await getDBConnection();

    await db.run(`DELETE FROM todos WHERE completed = 1`);

    const updateTodoList = await db.all("SELECT * FROM todos;");
    res.status(201).json(updateTodoList);
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

export async function changeCompStatus(req, res) {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const db = await getDBConnection();

    await db.run(`UPDATE todos SET completed = ? WHERE id = ?`, [
      completed ? 0 : 1,
      id,
    ]);

    const updateTodoList = await db.all("SELECT * FROM todos;");
    res.status(201).json(updateTodoList);
  } catch (error) {
    res.status(500).json({ error: "Database delete failed" });
  }
}

export async function updateOrder(req, res) {
  const { orderedIds } = req.body; // [3,1,2,4,...]
  const update = db.prepare("UPDATE todos SET position = ? WHERE id = ?");
  const transaction = db.transaction((ids) => {
    ids.forEach((id, index) => update.run(index, id));
  });
  transaction(orderedIds);

  res.json({ message: "Order updated successfully" });
}
