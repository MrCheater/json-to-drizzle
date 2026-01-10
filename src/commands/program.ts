import { Command } from "commander";

import { description } from "../../package.json";

export const program = new Command();

program.name("jsonormalize").description(description);
