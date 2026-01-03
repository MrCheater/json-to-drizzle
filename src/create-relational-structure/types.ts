import type { NormalizedValue } from "../normalize";

export type FieldType = "integer" | "real" | "text" | "boolean";
export type Field = {
  type: FieldType;
  key: string;
  isPrimaryKey?: boolean;
  isNullable?: boolean;
  reference?: { table: RelationalTable["name"]; key: Field["key"] };
};

export type RelationalTable = {
  name: string;
  fields: Field[];
  data: Record<string, NormalizedValue>[];
};

export type ForeignKey = {
  key: string;
  reference: { table: string; key: string };
};
