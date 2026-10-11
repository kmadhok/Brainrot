// Stage 7 renderer: EDL -> Remotion -> ffmpeg loudness-normalised master.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import type { Edl } from "../schemas";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ENTRY = path.join(ROOT, "src/remotion/index.ts");
// Pre-installed in the cloud container; override with CHROME_PATH elsewhere.
const DEFAULT_CHROME = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const browserExecutable = process.env.CHROME_PATH ?? (existsSync(DEFAULT_CHROME) ? DEFAULT_CHROME : null);

export async function renderEdl(edl: Edl, opts: { assetsDir: string; outFile: string; stillsAtMs?: number[] }) {
  mkdirSync(path.dirname(opts.outFile), { recursive: true });
  mkdirSync(opts.assetsDir, { recursive: true });
  const serveUrl = await bundle({ entryPoint: ENTRY, publicDir: opts.assetsDir });
  const inputProps = edl as unknown as Record<string, unknown>;
  const composition = await selectComposition({ serveUrl, id: "Main", inputProps, browserExecutable });

  const raw = opts.outFile.replace(/\.mp4$/, ".raw.mp4");
  let lastPct = -1;
  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    codec: "h264",
    crf: 18,
    outputLocation: raw,
    browserExecutable,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== lastPct) process.stdout.write(`  render ${(lastPct = pct)}%\n`);
    },
  });

  // Platform-friendly master: -14 LUFS integrated, -1 dBTP, AAC 48 kHz. Silent renders just get copied.
  const hasAudio = Boolean(edl.audio.voice || edl.audio.music);
  execFileSync(
    "ffmpeg",
    [
      "-y", "-loglevel", "error", "-i", raw,
      ...(hasAudio ? ["-af", "loudnorm=I=-14:TP=-1:LRA=11", "-c:a", "aac", "-b:a", "192k", "-ar", "48000"] : []),
      "-c:v", "copy", "-movflags", "+faststart", opts.outFile,
    ],
    { stdio: "inherit" },
  );

  const stills: string[] = [];
  for (const ms of opts.stillsAtMs ?? []) {
    const file = opts.outFile.replace(/\.mp4$/, `.still-${ms}.png`);
    await renderStill({ serveUrl, composition, inputProps, frame: Math.round((ms / 1000) * composition.fps), output: file, browserExecutable });
    stills.push(file);
  }
  return { file: opts.outFile, stills, frames: composition.durationInFrames };
}
