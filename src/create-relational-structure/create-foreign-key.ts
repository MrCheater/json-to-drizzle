import type { ForeignKey, RelationalTable } from "./types";

export function createForeignKey<const T extends RelationalTable>(
  table: T,
  key: T["fields"][number]["key"],
): ForeignKey["reference"] {
  return { table: table.name, key };
}
