// Deterministic QA (stage 9a). The ASR diff and multimodal judge are added once API keys exist.
import { execFileSync, spawnSync } from "node:child_process";
import type { Edl } from "../schemas";

export type Check = { name: string; pass: boolean; detail: string };

function probe(file: string) {
  const out = execFileSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", file]);
  return JSON.parse(out.toString()) as {
    streams: { codec_type: string; width?: number; height?: number; sample_rate?: string }[];
    format: { duration: string };
  };
}

// ffmpeg's loudnorm filter prints its measurement as a JSON block on stderr.
function measureLufs(file: string): number | null {
  const { stderr } = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-af", "loudnorm=print_format=json", "-f", "null", "-"], {
    encoding: "utf8",
  });
  const json = stderr.slice(stderr.lastIndexOf("{"), stderr.lastIndexOf("}") + 1);
  try {
    const v = Number(JSON.parse(json).input_i);
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

export function technicalChecks(file: string, edl: Edl): Check[] {
  const info = probe(file);
  const video = info.streams.find((s) => s.codec_type === "video");
  const audio = info.streams.find((s) => s.codec_type === "audio");
  const duration = Number(info.format.duration);
  const expected = edl.meta.durationMs / 1000;
  const wantsAudio = Boolean(edl.audio.voice || edl.audio.music);

  const checks: Check[] = [
    {
      name: "resolution",
      pass: video?.width === edl.meta.width && video?.height === edl.meta.height,
      detail: `${video?.width}x${video?.height} (want ${edl.meta.width}x${edl.meta.height})`,
    },
    { name: "duration", pass: Math.abs(duration - expected) < 0.5, detail: `${duration.toFixed(2)}s (want ${expected.toFixed(2)}s)` },
    { name: "audio stream", pass: !wantsAudio || Boolean(audio), detail: audio ? `${audio.sample_rate} Hz` : "none" },
  ];
  if (wantsAudio && audio) {
    const lufs = measureLufs(file);
    checks.push({
      name: "loudness",
      pass: lufs !== null && Math.abs(lufs + 14) <= 1.5,
      detail: lufs === null ? "unmeasured" : `${lufs.toFixed(1)} LUFS (want -14 ±1.5)`,
    });
  }
  return checks;
}
