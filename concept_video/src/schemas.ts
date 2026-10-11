// Typed contracts between pipeline stages. Shared by the runner and the Remotion project.
import { z } from "zod";

// ---------- Words (voice timeline) ----------

export const Word = z.object({
  text: z.string(),
  startMs: z.number(),
  endMs: z.number(),
});
export type Word = z.infer<typeof Word>;

// ---------- Animated graphics ----------

export const GraphicSpec = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("title"), title: z.string(), subtitle: z.string().optional() }),
  z.object({
    kind: z.literal("stat"),
    value: z.number(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    label: z.string(),
    source: z.string().optional(),
  }),
  z.object({
    kind: z.literal("bars"),
    title: z.string(),
    unit: z.string().optional(),
    items: z.array(z.object({ label: z.string(), value: z.number() })).min(1).max(6),
    source: z.string().optional(),
  }),
  z.object({ kind: z.literal("quote"), text: z.string(), attribution: z.string() }),
  z.object({ kind: z.literal("steps"), title: z.string(), steps: z.array(z.string()).min(1).max(6) }),
  z.object({ kind: z.literal("kinetic"), text: z.string() }),
]);
export type GraphicSpec = z.infer<typeof GraphicSpec>;

// ---------- Script (stage 3 output, approved at Gate B) ----------

export const BeatVisual = z.enum(["aroll", "graphic", "broll"]);

export const ScriptBeat = z.object({
  id: z.string(),
  line: z.string().describe("Exact words spoken in this beat"),
  visual: BeatVisual,
  graphic: GraphicSpec.optional().describe("Required when visual is 'graphic'"),
  broll_query: z.string().optional().describe("Required when visual is 'broll'"),
  emphasis: z.array(z.string()).default([]).describe("Words to pop in captions / punch-in on"),
  evidence_ids: z.array(z.string()).default([]),
});
export type ScriptBeat = z.infer<typeof ScriptBeat>;

export const Script = z.object({
  title: z.string(),
  beats: z.array(ScriptBeat).min(1),
});
export type Script = z.infer<typeof Script>;

// ---------- Edit decision list (stage 7 input to Remotion) ----------

export const EdlBeat = z.object({
  id: z.string(),
  startMs: z.number(),
  endMs: z.number(),
  type: BeatVisual,
  src: z.string().optional().describe("Path relative to the run's assets dir"),
  srcStartMs: z.number().default(0),
  graphic: GraphicSpec.optional(),
  zoom: z.array(z.object({ atMs: z.number(), to: z.number() })).default([]),
  source: z.enum(["twin", "creator_library", "generated", "stock", "graphic", "placeholder"]),
});
export type EdlBeat = z.infer<typeof EdlBeat>;

export const Brand = z.object({
  font: z.string().default("Inter"),
  bg: z.string().default("#0E0F13"),
  fg: z.string().default("#F4F1EA"),
  accent: z.string().default("#FFB020"),
  accent2: z.string().default("#4CC2FF"),
  creatorName: z.string().default(""),
});
export type Brand = z.infer<typeof Brand>;

export const Edl = z.object({
  meta: z.object({
    title: z.string(),
    fps: z.number().default(30),
    width: z.number().default(1920),
    height: z.number().default(1080),
    durationMs: z.number(),
  }),
  audio: z.object({
    voice: z.string().optional(),
    music: z.string().optional(),
    musicVolume: z.number().default(0.12),
    sfx: z.array(z.object({ atMs: z.number(), src: z.string(), volume: z.number().default(0.6) })).default([]),
  }),
  beats: z.array(EdlBeat).min(1),
  words: z.array(Word),
  emphasis: z.array(z.string()).default([]),
  captions: z.object({
    enabled: z.boolean().default(true),
    combineWithinMs: z.number().default(900),
  }),
  brand: Brand,
});
export type Edl = z.infer<typeof Edl>;
