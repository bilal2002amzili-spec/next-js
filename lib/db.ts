import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Database {
  users: { id: string; email: string; password: string }[];
  projects: Project[];
  columns: { id: string; title: string; tasks: string[] }[];
}

export function readDB(): Database {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as Database;
  return data;
}

export function writeDB(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
