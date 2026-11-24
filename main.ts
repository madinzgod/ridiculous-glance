// Ridiculous at First Glance, Real by the Second — entry program.
// Writes the one-sentence pitch to the output directory's entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "We insure first dates: if your match ghosts you, a vetted stand-in finishes dinner with you, and dating apps pay every claim because one rescued evening stops users deleting the app.";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  // The gate takes UTF-8 text of 1 to 200 characters, not only white space:
  // refuse to write anything outside it rather than be scored invalid.
  if (PITCH.length < 1 || PITCH.length > 200 || PITCH.trim().length === 0) {
    throw new Error(`pitch outside the gate: ${PITCH.length} characters`);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // Clear only the contents: the grader owns the directory itself.
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
  writeFileSync(join(dir, "entry.txt"), PITCH, "utf8");
}

main();
