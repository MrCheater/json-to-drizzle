import { isArrayOfPrimitives } from "../utils";

export function normalizeArrayOfPrimitives(data: any): any {
  if (Array.isArray(data)) {
    if (isArrayOfPrimitives(data)) {
      return data.map((value) => ({ value }));
    } else {
      return data.map((item) => normalizeArrayOfPrimitives(item));
    }
  } else if (Object(data) === data) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        normalizeArrayOfPrimitives(value),
      ]),
    );
  } else {
    return data;
  }
}
