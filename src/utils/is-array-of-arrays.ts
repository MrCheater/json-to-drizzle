export function isArrayOfArrays(arr: unknown[]): arr is unknown[][] {
  if (arr.length === 0) {
    return false;
  }
  return arr.every((item) => Array.isArray(item));
}
