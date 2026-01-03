import type { Field } from "../create-relational-structure";

export function getFieldType(field: Field) {
  switch (field.type) {
    case "boolean":
    case "integer": {
      return "INTEGER";
    }
    case "real": {
      return "REAL";
    }
    case "text": {
      return "TEXT";
    }
  }
}
