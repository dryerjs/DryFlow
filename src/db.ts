import { Database } from 'sqlite3';
import Knex from 'knex';
export const db = new Database('db.sqlite');

export function prepare(): void {
  // create table job if it doesn't exist with id as primary key, input as json, progress as integer, and status as text
  db.run(`
    CREATE TABLE IF NOT EXISTS job (
      id INTEGER PRIMARY KEY,
      input JSON,
      progress INTEGER,
      status TEXT DEFAULT 'pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});
