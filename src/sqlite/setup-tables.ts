import Database from "better-sqlite3";

import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createDataMigration } from "./create-data-migration";
import { createInitialMigration } from "./create-initial-migration";

export function setupTables({
  path = ":memory:",
  prefix,
  data,
}: {
  path?: string;
  prefix: string;
  data: unknown[];
}) {
  const db = new Database(path);

  db.pragma("synchronous = FULL");

  db.exec(
    createInitialMigration(createRelationalStructure(prefix, normalize(data))),
  );

  db.exec(
    createDataMigration(createRelationalStructure(prefix, normalize(data))),
  );

  db.close();
}
