// Builds fixtures/demo/edl.json from the demo script with SYNTHETIC word timings (no voice audio),
// so the renderer and captions can be exercised before any API keys exist.
import path from "node:path";
import { Brand, Script, type Word } from "../schemas";
import { ROOT, readJson, writeJson } from "./run";
import { buildEdl, lineTokens } from "./timeline";

const script = Script.parse(readJson(path.join(ROOT, "fixtures/demo/script.json")));
const words: Word[] = [];
let t = 150;
for (const beat of script.beats) {
  for (const tok of lineTokens(beat.line)) {
    const dur = 180 + tok.length * 28;
    words.push({ text: tok, startMs: t, endMs: t + dur });
    t += dur + 40 + (/[.,:?!]$/.test(tok) ? 260 : 0);
  }
}
const edl = buildEdl({ script, words, media: {}, brand: Brand.parse({ creatorName: "Creator Name" }) });
writeJson(path.join(ROOT, "fixtures/demo/edl.json"), edl);
console.log(`fixture: ${edl.beats.length} beats, ${(edl.meta.durationMs / 1000).toFixed(1)}s`);
