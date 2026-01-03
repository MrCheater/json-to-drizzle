import type { RelationalTable } from "./types";

export function createRelationalTable<const T extends RelationalTable>(
  schema: T,
): T {
  return schema;
}
