import type { NormalizedValue } from "../normalize";

export function getIsNullable(
  prevIsNullable: boolean | undefined,
  value: NormalizedValue | undefined,
): boolean {
  return prevIsNullable || value === null || value === undefined;
}
