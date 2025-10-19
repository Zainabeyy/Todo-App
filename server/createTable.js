import { getDBConnection } from "./db.js";

async function createTable() {
  const db = await getDBConnection();

  try {
    await db.exec(`
            CREATE TABLE IF NOT EXISTS todos (
            ID SERIAL PRIMARY KEY AUTOINCREMENT, 
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL,
            "order" INTEGER NOT NULL
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
//             INSERT INTO todos ("text", completed, "order")
//             VALUES (?,?,?)
//             `, ['first task', true, 2]);

//     await db.close();
//   } catch (err) {
//     console.log("can not create table:", err);
//   }
// }

// seedTable();
createTable();