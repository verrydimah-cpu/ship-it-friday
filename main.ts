import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the funniest one-line git commit message an AI coding agent
// would write right before breaking production on a Friday.
// Confident, cheerful, single-prompt bravado, zero tests, 4:59 PM timing.
const ENTRY =
  "feat: one-shot rewrote the payment service from a single prompt, no tests, deploying Friday 4:59 PM - ship it!";

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

  // Create the output directory if needed; never remove the directory itself.
  mkdirSync(outputDir, { recursive: true });

  // Clear the output directory's contents entry-by-entry.
  for (const name of readdirSync(outputDir)) {
    rmSync(join(outputDir, name), { recursive: true, force: true });
  }

  // Write exactly the one line, with no trailing newline, so the sealed
  // gate measures the commit message itself and nothing else.
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, { encoding: "utf8" });
}

main();
