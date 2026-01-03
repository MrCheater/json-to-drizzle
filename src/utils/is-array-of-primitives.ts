const simpleTypes = ["string", "number", "boolean"];

export function isArrayOfPrimitives(arr: unknown[]): arr is string[] {
  const firstNotNullItem = arr.find((item) => item !== null);
  const firstNotNullItemType = typeof firstNotNullItem;

  if (!simpleTypes.includes(firstNotNullItemType)) {
    return false;
  }

  return arr.every(
    (item) => item === null || typeof item === firstNotNullItemType,
  );
}
