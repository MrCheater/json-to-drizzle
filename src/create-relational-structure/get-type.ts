import type { NormalizedValue } from "../normalize";
import type { FieldType } from "./types";

export class UnknownTypeError extends Error {}

export function getType(
  prevType: FieldType | undefined,
  value: NormalizedValue | undefined,
): FieldType {
  switch (typeof value) {
    case "number": {
      if (prevType !== "real" && Number.isInteger(value)) {
        return "integer";
      } else {
        return "real";
      }
    }
    case "string": {
      return "text";
    }
    case "boolean": {
      return "boolean";
    }
    default: {
      throw new UnknownTypeError();
    }
  }
}
