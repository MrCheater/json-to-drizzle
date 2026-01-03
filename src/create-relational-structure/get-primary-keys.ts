import type { RelationalTable } from "./types";

export function getPrimaryKeys(table: RelationalTable): string[] {
  return table.fields
    .filter((field) => field.isPrimaryKey)
    .map(({ key }) => key);
}
