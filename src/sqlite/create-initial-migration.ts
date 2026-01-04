import { EOL } from "node:os";

import type { RelationalTable } from "../create-relational-structure";
import { getForeignKeys, getPrimaryKeys } from "../create-relational-structure";
import { getFieldType } from "./get-field-type";

export function createInitialMigration(tables: RelationalTable[]): string {
  return tables
    .map((table) => {
      const foreignKeys = getForeignKeys(table);
      return [
        `CREATE TABLE ${table.name} (`,
        [
          ...table.fields.map(
            (field) =>
              `  ${field.key} ${getFieldType(field)}${field.isNullable ? "" : " NOT NULL"}`,
          ),
          `  PRIMARY KEY (${getPrimaryKeys(table).join(", ")})`,
          ...(foreignKeys.length
            ? foreignKeys.map(
                ({ key, reference }) =>
                  `  FOREIGN KEY (${key}) REFERENCES ${reference.table} (${reference.key})`,
              )
            : []),
        ].join(`,${EOL}`),
        `);`,
        ...foreignKeys.map(
          ({ key }) =>
            `CREATE INDEX idx_${table.name}_${key} ON ${table.name} (${key});`,
        ),
      ].join(EOL);
    })
    .join(`${EOL}${EOL}`);
}
