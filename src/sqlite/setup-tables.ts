import Database from "better-sqlite3";

import { createMigrations } from "./create-migrations";

export function setupTables({
  path = ":memory:",
  prefix,
  data,
}: {
  path?: string;
  prefix: string;
  data: unknown[];
}) {
  const { initialMigration, dataMigration } = createMigrations({
    prefix,
    data,
  });

  const db = new Database(path);

  db.pragma("synchronous = FULL");

  db.exec(initialMigration);

  db.exec(dataMigration);

  db.close();
}
