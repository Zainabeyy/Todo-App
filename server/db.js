import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export function getDBConnection() {
  return open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });
}
