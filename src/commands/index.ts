import * as fs from "node:fs";
import * as path from "node:path";

import { Command } from "commander";

import { description } from "../../package.json";
import { SQLite, utils } from "../index";

const program = new Command();

program.name("json-to-drizzle").description(description);

program
  .command("sqlite:setup")
  .description("🗄️ Setup tables, indexes and seed with data from JSON")
  .argument(
    "<json-path>",
    "JSON file with any data array (table structure will be inferred)",
  )
  .argument(
    "<db-path>",
    "Path to SQLite database file or ':memory:' (no file, RAM only)",
  )
  .action(async (jsonPath, dbPath) => {
    console.log(jsonPath, dbPath);
    // TODO jsonFile maybe url
    const data = JSON.parse(fs.readFileSync(jsonPath).toString());

    const jsonPathNameWithoutExt = path.basename(
      jsonPath,
      path.extname(jsonPath),
    );

    const prefix = utils.snakeCase(jsonPathNameWithoutExt);

    SQLite.setupTables({
      path: dbPath,
      data,
      prefix,
    });
  });

export async function cli() {
  return program.parse();
}
