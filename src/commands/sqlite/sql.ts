import * as fs from "node:fs";
import { EOL } from "node:os";

import { createMigrations } from "../../sqlite";
import { prepare } from "../prepare";
import { program } from "../program";

program
  .command("sqlite:sql")
  .description(
    "🛠️ Generate SQL for create tables, indexes and seed with data from JSON",
  )
  .argument(
    "<json-path>",
    "Path to JSON file with any data (table structure will be inferred)",
  )
  .argument("<sql-path>", "Path to .sql file")
  .action(async (jsonPath: string, sqlPath: string) => {
    const { data, prefix } = await prepare(jsonPath);

    const { initialMigration, dataMigration } = createMigrations({
      prefix,
      data,
    });

    fs.writeFileSync(
      sqlPath,
      `${initialMigration}${EOL}${EOL}${dataMigration}`,
    );
  });
