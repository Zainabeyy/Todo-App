import { getDBConnection } from "./db";

async function createTable() {
  const db = await getDBConnection();

  try {
    await db.exec(`
            CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0,
            position INTEGER NOT NULL UNIQUE
            )
            `);

    await db.close();
  } catch (err) {
    console.log("can not create table:", err);
  }
}

// async function createTable() {
//   const db = await getDBConnection();

//   await db.exec(`
//             CREATE TABLE users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             email TEXT UNIQUE NOT NULL,
//             username TEXT UNIQUE NOT NULL,
//             password TEXT NOT NULL,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//             );
//       `);

//   await db.close();
//   console.log("table created");
// }

// async function seedTable() {
//   const db = await getDBConnection();

//   try {
//     await db.run(`
//             INSERT INTO todos ("text", completed, position)
//             VALUES (?,?,?)
//             `, ['first task', true, 2]);

//     await db.close();
//   } catch (err) {
//     console.log("can not create table:", err);
//   }
// }

// seedTable();
createTable();
