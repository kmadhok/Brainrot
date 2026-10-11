// Run state: one folder per video, one sub-folder and artifact per stage, plus an append-only cost ledger.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const RUNS_DIR = path.join(ROOT, "runs");

export type Gate = "A" | "B" | "C";
export type StageState = { status: "done" | "failed"; at: string; note?: string };
export type RunState = {
  id: string;
  topic: string;
  createdAt: string;
  stages: Record<string, StageState>;
  gates: Partial<Record<Gate, string>>;
};

export class Run {
  readonly dir: string;
  state: RunState;

  constructor(id: string) {
    this.dir = path.join(RUNS_DIR, id);
    const file = path.join(this.dir, "run.json");
    if (!existsSync(file)) throw new Error(`No run '${id}' in ${RUNS_DIR}`);
    this.state = JSON.parse(readFileSync(file, "utf8"));
  }

  static create(slug: string, topic: string): Run {
    const id = `${new Date().toISOString().slice(0, 10)}-${slug}`;
    const dir = path.join(RUNS_DIR, id);
    if (existsSync(dir)) throw new Error(`Run ${id} already exists`);
    mkdirSync(path.join(dir, "assets"), { recursive: true });
    const state: RunState = { id, topic, createdAt: new Date().toISOString(), stages: {}, gates: {} };
    writeFileSync(path.join(dir, "run.json"), JSON.stringify(state, null, 2));
    return new Run(id);
  }

  get assetsDir() {
    return path.join(this.dir, "assets");
  }

  stageDir(stageDir: string) {
    const d = path.join(this.dir, stageDir);
    mkdirSync(d, { recursive: true });
    return d;
  }

  save() {
    writeFileSync(path.join(this.dir, "run.json"), JSON.stringify(this.state, null, 2));
  }

  mark(stage: string, status: StageState["status"], note?: string) {
    this.state.stages[stage] = { status, at: new Date().toISOString(), note };
    this.save();
  }

  // Every paid call records a line here, so the run doubles as an audit trail of AI vs human work.
  cost(stage: string, item: string, usd: number, detail?: string) {
    appendFileSync(path.join(this.dir, "ledger.jsonl"), JSON.stringify({ at: new Date().toISOString(), stage, item, usd, detail }) + "\n");
  }

  totalCost() {
    const f = path.join(this.dir, "ledger.jsonl");
    if (!existsSync(f)) return 0;
    return readFileSync(f, "utf8").trim().split("\n").filter(Boolean).reduce((s, l) => s + (JSON.parse(l).usd ?? 0), 0);
  }
}

export const readJson = <T>(file: string): T => JSON.parse(readFileSync(file, "utf8")) as T;
export const writeJson = (file: string, data: unknown) => {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2));
};
