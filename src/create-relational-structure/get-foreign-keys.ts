import type { ForeignKey, RelationalTable } from "./types";

export function getForeignKeys(table: RelationalTable): ForeignKey[] {
  return table.fields
    .filter((field) => field.reference)
    .map(
      ({ key, reference }): ForeignKey => ({
        key,
        reference: { table: reference!.table, key: reference!.key },
      }),
    );
}
