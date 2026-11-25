// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
// Entry word: "glorp" — the sound of an agent's gears gurgling to a halt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "glorp";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// The gate: exactly one word, 1-99 characters, no whitespace at all.
if (WORD.length < 1 || WORD.length > 99) {
  throw new Error(`entry must be 1-99 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word (no whitespace)");
}
if (WORD.trim() !== WORD || WORD.length === 0) {
  throw new Error("entry must not be blank or padded");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Round-trip check: what we wrote is what lands on disk.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== WORD) {
  throw new Error("round-trip mismatch writing entry.txt");
}
