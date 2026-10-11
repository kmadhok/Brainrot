// Usage:
//   npm run pipeline -- new <slug> --topic "..."
//   npm run pipeline -- run <runId>
//   npm run pipeline -- status <runId>
//   npm run pipeline -- approve <runId> <A|B|C>
//   npm run pipeline -- reset <runId> <stage>      (re-run that stage and everything after it)
//   npm run pipeline -- fixture                    (render the demo EDL to out/fixture.mp4)
import { existsSync } from "node:fs";
import path from "node:path";
import { Edl } from "../schemas";
import { renderEdl } from "./render";
import { ROOT, readJson, Run } from "./run";
import { artifactPath, STAGES } from "./stages";

const [cmd, ...args] = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

async function runPipeline(run: Run) {
  for (const stage of STAGES) {
    if (run.state.stages[stage.name]?.status !== "done") {
      const file = artifactPath(run, stage);
      run.stageDir(stage.dir);
      if (!stage.run) {
        // Hand-supplied artifact satisfies the stage (also how Gate B edits work).
        if (existsSync(file)) {
          if (stage.schema) stage.schema.parse(readJson(file));
          run.mark(stage.name, "done", "artifact provided");
        } else {
          const missing = (stage.env ?? []).filter((k) => !process.env[k]);
          console.log(`■ ${stage.name}: not implemented yet. Needs ${stage.env?.join(", ")}${missing.length ? ` (missing: ${missing.join(", ")})` : ""}.`);
          console.log(`  To continue without it, put ${path.relative(ROOT, file)} in place and re-run.`);
          return;
        }
      } else {
        console.log(`▶ ${stage.name}`);
        try {
          const note = await stage.run(run, stage);
          run.mark(stage.name, "done", note || undefined);
        } catch (e) {
          run.mark(stage.name, "failed", (e as Error).message);
          console.error(`✖ ${stage.name}: ${(e as Error).message}`);
          process.exitCode = 1;
          return;
        }
      }
      console.log(`✔ ${stage.name}${run.state.stages[stage.name].note ? ` (${run.state.stages[stage.name].note})` : ""}`);
    }
    if (stage.gateAfter && !run.state.gates[stage.gateAfter]) {
      console.log(`⏸ Gate ${stage.gateAfter}: review ${path.relative(ROOT, artifactPath(run, stage))}, then: npm run pipeline -- approve ${run.state.id} ${stage.gateAfter}`);
      return;
    }
  }
  console.log(`Done. Total cost so far: $${run.totalCost().toFixed(2)}`);
}

function status(run: Run) {
  for (const s of STAGES) {
    const st = run.state.stages[s.name];
    console.log(`${(st?.status ?? "pending").padEnd(8)} ${s.name.padEnd(9)} ${st?.note ?? ""}`);
    if (s.gateAfter) console.log(`${(run.state.gates[s.gateAfter] ? "approved" : "waiting").padEnd(8)} gate ${s.gateAfter}`);
  }
  console.log(`cost     $${run.totalCost().toFixed(2)}`);
}

async function main() {
  switch (cmd) {
    case "new": {
      const topic = flag("topic");
      if (!args[0] || !topic) throw new Error('usage: new <slug> --topic "..."');
      console.log(`Created run ${Run.create(args[0], topic).state.id}`);
      break;
    }
    case "run":
      return runPipeline(new Run(args[0]));
    case "status":
      return status(new Run(args[0]));
    case "approve": {
      const run = new Run(args[0]);
      const gate = args[1] as "A" | "B" | "C";
      if (!["A", "B", "C"].includes(gate)) throw new Error("gate must be A, B or C");
      run.state.gates[gate] = new Date().toISOString();
      run.save();
      console.log(`Gate ${gate} approved`);
      break;
    }
    case "reset": {
      const run = new Run(args[0]);
      const i = STAGES.findIndex((s) => s.name === args[1]);
      if (i < 0) throw new Error(`unknown stage ${args[1]}`);
      for (const s of STAGES.slice(i)) {
        delete run.state.stages[s.name];
        if (s.gateAfter) delete run.state.gates[s.gateAfter];
      }
      run.save();
      console.log(`Reset ${args[1]} and downstream`);
      break;
    }
    case "fixture": {
      const edl = Edl.parse(readJson(path.join(ROOT, "fixtures/demo/edl.json")));
      const stillsAtMs = edl.beats.map((b) => Math.round((b.startMs + b.endMs) / 2));
      const res = await renderEdl(edl, { assetsDir: path.join(ROOT, "fixtures/demo/assets"), outFile: path.join(ROOT, "out/fixture.mp4"), stillsAtMs });
      console.log(`Rendered ${res.file} (${res.frames} frames) + ${res.stills.length} stills`);
      break;
    }
    default:
      console.log("commands: new | run | status | approve | reset | fixture");
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
