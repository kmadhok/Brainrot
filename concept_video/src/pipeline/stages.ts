// The ordered stage list. Stages needing API keys are declared but not implemented yet;
// any stage can also be satisfied by placing a valid artifact in its folder by hand.
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { Brand, Edl, Script, Word } from "../schemas";
import { technicalChecks } from "./qa";
import { renderEdl } from "./render";
import { type Gate, readJson, type Run, writeJson } from "./run";
import { buildEdl, type BeatMedia } from "./timeline";

export type Stage = {
  name: string;
  dir: string;
  output: string;
  schema?: z.ZodType;
  env?: string[];
  gateAfter?: Gate;
  run?: (run: Run, stage: Stage) => Promise<string | void>;
};

const art = (run: Run, s: Stage) => path.join(run.dir, s.dir, s.output);
const optional = <T>(file: string): T | undefined => (existsSync(file) ? readJson<T>(file) : undefined);

export const STAGES: Stage[] = [
  { name: "ideate", dir: "01_ideate", output: "angles.json", env: ["ANTHROPIC_API_KEY"], gateAfter: "A" },
  { name: "research", dir: "02_research", output: "evidence.json", env: ["ANTHROPIC_API_KEY"] },
  { name: "script", dir: "03_script", output: "script.json", schema: Script, env: ["ANTHROPIC_API_KEY", "OPENAI_API_KEY"], gateAfter: "B" },
  { name: "voice", dir: "04_voice", output: "words.json", schema: Word.array(), env: ["ELEVENLABS_API_KEY"] },
  { name: "twin", dir: "05a_twin", output: "media.json", env: ["FAL_KEY"] },
  { name: "visuals", dir: "05b_visuals", output: "media.json", env: ["GEMINI_API_KEY", "FAL_KEY"] },
  { name: "audio", dir: "06_audio", output: "audio.json", env: ["ELEVENLABS_API_KEY"] },
  {
    name: "edl",
    dir: "07_edl",
    output: "edl.json",
    schema: Edl,
    run: async (run, s) => {
      const script = Script.parse(readJson(path.join(run.dir, "03_script/script.json")));
      const words = Word.array().parse(readJson(path.join(run.dir, "04_voice/words.json")));
      const media: BeatMedia = {
        ...optional<BeatMedia>(path.join(run.dir, "05b_visuals/media.json")),
        ...optional<BeatMedia>(path.join(run.dir, "05a_twin/media.json")),
      };
      const audio = optional<{ music?: string }>(path.join(run.dir, "06_audio/audio.json")) ?? {};
      const brand = Brand.parse(optional(path.join(run.dir, "brand.json")) ?? {});
      const voiceSrc = path.join(run.dir, "04_voice/voice.mp3");
      if (existsSync(voiceSrc)) copyFileSync(voiceSrc, path.join(run.assetsDir, "voice.mp3"));
      const edl = buildEdl({ script, words, media, brand, voice: existsSync(voiceSrc) ? "voice.mp3" : undefined, music: audio.music });
      writeJson(art(run, s), edl);
      const missing = edl.beats.filter((b) => b.source === "placeholder").map((b) => b.id);
      return missing.length ? `placeholders for ${missing.join(", ")}` : undefined;
    },
  },
  {
    name: "render",
    dir: "07_render",
    output: "master.mp4",
    run: async (run, s) => {
      const edl = Edl.parse(readJson(path.join(run.dir, "07_edl/edl.json")));
      const stillsAtMs = edl.beats.map((b) => Math.round((b.startMs + b.endMs) / 2));
      const { frames } = await renderEdl(edl, { assetsDir: run.assetsDir, outFile: art(run, s), stillsAtMs });
      return `${frames} frames`;
    },
  },
  { name: "package", dir: "08_package", output: "package.json", env: ["ANTHROPIC_API_KEY", "GEMINI_API_KEY"] },
  {
    name: "qa",
    dir: "09_qa",
    output: "qa.json",
    gateAfter: "C",
    run: async (run, s) => {
      const edl = Edl.parse(readJson(path.join(run.dir, "07_edl/edl.json")));
      const checks = technicalChecks(path.join(run.dir, "07_render/master.mp4"), edl);
      const placeholders = edl.beats.filter((b) => b.source === "placeholder").map((b) => b.id);
      checks.push({ name: "no placeholder beats", pass: placeholders.length === 0, detail: placeholders.join(", ") || "all beats have media" });
      writeJson(art(run, s), { checks, provenance: edl.beats.map((b) => ({ id: b.id, type: b.type, source: b.source })) });
      const failed = checks.filter((c) => !c.pass);
      if (failed.length) throw new Error(`QA failed: ${failed.map((c) => `${c.name} (${c.detail})`).join("; ")}`);
    },
  },
  { name: "publish", dir: "10_publish", output: "publish.json", env: ["YOUTUBE_CLIENT_SECRET_JSON"] },
];

export const artifactPath = art;
