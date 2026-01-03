import { isArrayOfArrays } from "../utils";

export function normalizePrimitiveArrays(data: any): any {
  if (Array.isArray(data)) {
    if (isArrayOfArrays(data)) {
      return data.map((items) => ({ items: normalizePrimitiveArrays(items) }));
    } else {
      return data.map((item) => normalizePrimitiveArrays(item));
    }
  } else if (Object(data) === data) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        normalizePrimitiveArrays(value),
      ]),
    );
  } else {
    return data;
  }
}
