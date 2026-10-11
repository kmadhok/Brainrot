// Pure helpers that turn a voice timeline + approved script into an edit decision list.
import { Edl, type Brand, type EdlBeat, type Script, type Word } from "../schemas";

// ElevenLabs `with-timestamps` returns per-character timings; group them into words.
export type CharAlignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

export function alignmentToWords(a: CharAlignment): Word[] {
  const words: Word[] = [];
  let text = "";
  let start = 0;
  let end = 0;
  const flush = () => {
    if (text) words.push({ text, startMs: Math.round(start * 1000), endMs: Math.round(end * 1000) });
    text = "";
  };
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) return flush();
    if (!text) start = a.character_start_times_seconds[i];
    text += ch;
    end = a.character_end_times_seconds[i];
  });
  flush();
  return stripDeliveryTags(words);
}

// Inline delivery tags such as "[excited]" steer the voice but are not spoken or captioned.
const TAG = /^\[[^\]]*\]$/;
export const stripDeliveryTags = (words: Word[]) => words.filter((w) => !TAG.test(w.text));
export const lineTokens = (line: string) => line.split(/\s+/).filter((t) => t && !TAG.test(t));

// The voice is generated from the beats' lines joined in order, so word counts map beats onto the timeline.
export function beatRanges(script: Script, words: Word[]) {
  let cursor = 0;
  const ranges = script.beats.map((beat) => {
    const n = lineTokens(beat.line).length;
    const range = { beat, first: cursor, last: cursor + n - 1 };
    cursor += n;
    return range;
  });
  if (cursor !== words.length) {
    throw new Error(`Script has ${cursor} spoken tokens but the voice timeline has ${words.length} words; re-run the voice stage.`);
  }
  return ranges;
}

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");

export type BeatMedia = Record<string, { src?: string; srcStartMs?: number; source: EdlBeat["source"] }>;

export function buildEdl(opts: {
  script: Script;
  words: Word[];
  media: BeatMedia;
  brand: Brand;
  voice?: string;
  music?: string;
  tailMs?: number;
}): Edl {
  const { script, words, media, brand } = opts;
  const ranges = beatRanges(script, words);
  const endMs = words[words.length - 1].endMs + (opts.tailMs ?? 700);

  const beats: EdlBeat[] = ranges.map(({ beat, first, last }, i) => {
    const startMs = i === 0 ? 0 : words[first].startMs;
    const next = ranges[i + 1];
    const beatEnd = next ? words[next.first].startMs : endMs;
    const emph = new Set(beat.emphasis.map(norm));
    const zoom =
      beat.visual === "graphic"
        ? []
        : words
            .slice(first, last + 1)
            .filter((w) => emph.has(norm(w.text)))
            .map((w) => ({ atMs: w.startMs, to: 1.08 }));
    const m = media[beat.id];
    if (beat.visual === "graphic" && !beat.graphic) throw new Error(`Beat ${beat.id} is 'graphic' but has no graphic spec`);
    return {
      id: beat.id,
      startMs,
      endMs: beatEnd,
      type: beat.visual,
      src: m?.src,
      srcStartMs: m?.srcStartMs ?? 0,
      graphic: beat.graphic,
      zoom,
      source: beat.visual === "graphic" ? "graphic" : m?.source ?? "placeholder",
    };
  });

  return Edl.parse({
    meta: { title: script.title, durationMs: endMs },
    audio: { voice: opts.voice, music: opts.music },
    beats,
    words,
    emphasis: script.beats.flatMap((b) => b.emphasis),
    captions: {},
    brand,
  });
}
