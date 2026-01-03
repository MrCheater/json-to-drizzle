import { normalizePrimitiveArrays } from "./normalize-array-of-arrays";
import { normalizeArrayOfPrimitives } from "./normalize-array-of-primitives";
import { normalizeDeepObjects } from "./normalize-deep-objects";
import { normalizeLocalization } from "./normalize-localization";
import type { NormalizedData } from "./types";

export function normalize(data: unknown[]): NormalizedData {
  /* replace {a:{b:'c'}} to {'a_b':'c'} */
  return normalizeDeepObjects(
    /* replace [[...],[...]] to [{items:[...]},{items:[...]}] */
    normalizePrimitiveArrays(
      /* replace [1,2,3] to [{value:1},{value:2},{value:3}] */
      normalizeArrayOfPrimitives(
        /* replace { en: string, zh: string, ... } to { lang: string, text: string }[]*/
        normalizeLocalization(data),
      ),
    ),
  );
}
