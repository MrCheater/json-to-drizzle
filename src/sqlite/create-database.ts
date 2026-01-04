import Database from "better-sqlite3";

import { createRelationalStructure } from "../create-relational-structure";
import { normalize } from "../normalize";
import { createDataMigration } from "./create-data-migration";
import { createInitialMigration } from "./create-initial-migration";

export function createDatabase({
  path = ":memory:",
  tables = [],
}: {
  path?: string;
  tables?: { prefix: string; data: unknown[] }[];
}) {
  const db = new Database(path);
  for (const { prefix, data } of tables) {
    db.exec(
      createInitialMigration(
        createRelationalStructure(prefix, normalize(data)),
      ),
    );
  }
  for (const { prefix, data } of tables) {
    db.exec(
      createDataMigration(createRelationalStructure(prefix, normalize(data))),
    );
  }
}
