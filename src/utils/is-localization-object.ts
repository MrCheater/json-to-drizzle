export function isLocalizationObject(obj: Record<string, unknown>) {
  return "en" in obj && "zh" in obj;
}
