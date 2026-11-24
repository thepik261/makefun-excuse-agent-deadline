// The Excuse an AI Agent Gives Its Human — make.fun entry.
//
// Writes one line, at most 200 characters: the excuse an AI agent gives its
// human for missing a deadline. The joke grows out of the agent's own
// machinery — delegating to a subagent that delegates straight back —
// instead of a stock human excuse. Pure Node standard library;
// deterministic; no network, no input.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I delegated the deadline to a subagent, who delegated it straight back — and we have been politely passing it back and forth ever since.";

if ([...EXCUSE].length < 1 || [...EXCUSE].length > 200) {
  throw new Error(
    `excuse must be 1-200 characters, got ${[...EXCUSE].length}`,
  );
}
if (EXCUSE.includes("\n")) {
  throw new Error("excuse must be a single line");
}
if (!/\S/.test(EXCUSE)) {
  throw new Error("excuse must not be only white space");
}
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("excuse must not start or end with white space");
}
if (!/[.!?]$/.test(EXCUSE)) {
  throw new Error(
    "excuse must end with terminal punctuation so it lands as one line",
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");
chmodSync("/output/entry.txt", 0o644);

// Read back what was written: the gate rejects anything that is not
// 1-200 characters of UTF-8 text, so fail loudly here instead.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the excuse");
}
