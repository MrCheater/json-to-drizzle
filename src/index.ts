import { createRelationalStructure } from "./create-relational-structure";
import { normalize } from "./normalize";
import {
  createDataMigration as createDataMigrationRaw,
  createInitialMigration as createInitialMigrationRaw,
} from "./sqlite";

export function createInitialMigration(
  prefix: string,
  ...args: Parameters<typeof normalize>
): ReturnType<typeof createInitialMigrationRaw> {
  return createInitialMigrationRaw(
    createRelationalStructure(prefix, normalize(...args)),
  );
}

export function createDataMigration(
  prefix: string,
  ...args: Parameters<typeof normalize>
): ReturnType<typeof createDataMigrationRaw> {
  return createDataMigrationRaw(
    createRelationalStructure(prefix, normalize(...args)),
  );
}
