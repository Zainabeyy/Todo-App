import { getDBConnection } from "./db.js";

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