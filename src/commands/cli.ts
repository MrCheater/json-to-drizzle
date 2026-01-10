import { program } from "./program";

export async function cli() {
  return program.parse();
}
