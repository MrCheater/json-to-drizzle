import fs from "node:fs";
import path from "node:path";

import fetch from "node-fetch";

import { isURL, snakeCase } from "../utils";

export async function prepare(jsonPath: string) {
  const rawData: unknown = isURL(jsonPath)
    ? await (await fetch(jsonPath)).json()
    : JSON.parse(fs.readFileSync(jsonPath).toString());
  const data: unknown[] = Array.isArray(rawData) ? rawData : [rawData];

  const jsonPathNameWithoutExt = path.basename(
    jsonPath,
    path.extname(jsonPath),
  );

  const prefix = snakeCase(jsonPathNameWithoutExt);

  return { data, prefix };
}
