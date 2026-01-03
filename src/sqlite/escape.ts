import type { NormalizedValue } from "../normalize";

export function escape(value: NormalizedValue | undefined): string {
  if (value === null || value === undefined) {
    return "NULL";
  }
  switch (typeof value) {
    case "boolean": {
      return `${Number(value)}`;
    }
    case "string": {
      return `'${String(value).replace(/(['])/gi, "$1$1")}'`;
    }
    case "number": {
      return `${value}`;
    }
  }
}
