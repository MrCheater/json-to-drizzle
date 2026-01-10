#!/usr/bin/env -S node --import=tsx

async function main() {
  const { cli } = require("../src/commands/index.ts");
  return await cli();
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
