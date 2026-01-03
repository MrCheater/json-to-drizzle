import { snakeCase } from "../utils";

export function normalizeDeepObjects(
  obj: any,
  parentKey: string | number = "",
  res: any = {},
): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeDeepObjects(item));
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      const newKey = snakeCase(parentKey ? `${parentKey}.${key}` : key);

      const value = obj[key];
      if (Array.isArray(value)) {
        res[newKey] = value.map((item) => normalizeDeepObjects(item));
      } else if (typeof value === "object" && value !== null) {
        normalizeDeepObjects(value, newKey, res);
      } else {
        res[newKey] = value;
      }
    }
    return res;
  } else {
    return obj;
  }
}
