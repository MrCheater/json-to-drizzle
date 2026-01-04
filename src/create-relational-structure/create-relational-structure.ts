import type { NormalizedData, NormalizedValue } from "../normalize";
import { createForeignKey } from "./create-foreign-key";
import { getIsNullable } from "./get-is-nullable";
import { getType, UnknownTypeError } from "./get-type";
import type { Field, RelationalTable } from "./types";

export function createRelationalStructure(
  prefix: string,
  data: NormalizedData,
  parentTable?: RelationalTable,
): RelationalTable[] {
  const fields: Map<string, Field> = new Map();
  const fieldTypes: Map<string, Field["type"]> = new Map();
  const fieldIsNullable: Map<string, Field["isNullable"]> = new Map();
  const nestedData: Map<string, NormalizedData> = new Map();
  const selfData: Record<string, NormalizedValue>[] = [];

  fields.set("_id", { key: "_id", type: "integer", isPrimaryKey: true });
  if (parentTable) {
    fields.set("_parent_id", {
      key: "_parent_id",
      type: "integer",
      reference: createForeignKey(parentTable, "_id"),
    });
  }

  const keys = new Set(data.map((row) => Object.keys(row)).flat());

  data.forEach((row, _parent_id) => {
    for (const key of keys) {
      const value = row[key];
      if (Array.isArray(value)) {
        if (!nestedData.has(key)) {
          nestedData.set(key, []);
        }
        const nestedDataByKey = nestedData.get(key)!;
        value.forEach((item) => nestedDataByKey.push({ ...item, _parent_id }));
      } else {
        try {
          fieldTypes.set(key, getType(fieldTypes.get(key), value));
        } catch (error) {
          if (!(error instanceof UnknownTypeError)) {
            throw error;
          }
        }
        fieldIsNullable.set(
          key,
          getIsNullable(fieldIsNullable.get(key), value),
        );
      }
    }
  });

  data.forEach((row, _id) => {
    const selfDataItem: Record<string, NormalizedValue> = { _id };
    for (const [key, value] of Object.entries(row)) {
      if (Array.isArray(value)) {
        continue;
      }
      selfDataItem[key] = value;
    }
    selfData.push(selfDataItem);
  });

  fieldTypes.delete("_parent_id");

  for (const [key, type] of fieldTypes.entries()) {
    const isNullable = fieldIsNullable.get(key);
    fields.set(key, {
      key,
      type,
      ...(isNullable ? { isNullable } : {}),
    });
  }

  const relationalTable: RelationalTable = {
    name: prefix,
    fields: [...fields.values()],
    data: selfData,
  };

  const nestedRelationalTables = [...nestedData.entries()]
    .map((entry) =>
      createRelationalStructure(
        `${prefix}_${entry[0]}`,
        entry[1],
        relationalTable,
      ),
    )
    .flat();

  return [relationalTable, ...nestedRelationalTables];
}
