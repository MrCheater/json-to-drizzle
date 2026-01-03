import { isLocalizationObject } from "../utils";

export function normalizeLocalization(data: any): any {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeLocalization(item));
  } else if (Object(data) === data) {
    if (isLocalizationObject(data)) {
      return Object.entries(data).map(([lang, text]) => ({ lang, text }));
    } else {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          normalizeLocalization(value),
        ]),
      );
    }
  } else {
    return data;
  }
}
