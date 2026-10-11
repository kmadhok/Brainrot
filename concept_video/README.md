# concept_video

This is the pipeline for the creator-in-the-loop concept video. The design is in [PROCESS.md](PROCESS.md).

```
npm install
npm run pipeline -- fixture                       # render the demo EDL to out/fixture.mp4 (no keys needed)
npm run pipeline -- new my-video --topic "..."    # create runs/<date>-my-video/
npm run pipeline -- run <runId>                   # advance until the next gate, missing stage, or failure
npm run pipeline -- approve <runId> A|B|C         # sign off a gate
npm run pipeline -- status <runId>
npm run pipeline -- reset <runId> <stage>         # redo a stage and everything after it
npm run studio                                    # live-preview compositions in Remotion Studio
```

## How a run works

Each run is a folder with one sub-folder per stage. Each stage writes one artifact. `run` skips stages that are already done and stops in three cases:

- at a gate that hasn't been approved (A after ideation, B after the script, C after QA);
- at a stage that isn't implemented yet;
- on a failure.

Any stage can be satisfied by hand: put a valid artifact at its path and re-run. Schema-typed artifacts are validated. Gate B works this way: edit `03_script/script.json`, then approve.

Paid calls append to `ledger.jsonl`, so every run records what it cost and which stage did what.

| Stage | Artifact | Status |
|---|---|---|
| ideate | `01_ideate/angles.json` | needs `ANTHROPIC_API_KEY` |
| research | `02_research/evidence.json` | needs `ANTHROPIC_API_KEY` |
| script | `03_script/script.json` (`Script` schema) | needs `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` |
| voice | `04_voice/words.json` + `voice.mp3` | needs `ELEVENLABS_API_KEY` (timeline helper `alignmentToWords` is ready) |
| twin | `05a_twin/media.json` (beat id → clip in `assets/`) | needs `FAL_KEY` |
| visuals | `05b_visuals/media.json` | needs `GEMINI_API_KEY`, `FAL_KEY` |
| audio | `06_audio/audio.json` (music bed in `assets/`) | needs `ELEVENLABS_API_KEY` |
| **edl** | `07_edl/edl.json` (`Edl` schema) | **working**: maps beats onto the voice timeline and adds punch-ins on emphasis words |
| **render** | `07_render/master.mp4` + per-beat stills | **working**: Remotion render, then ffmpeg loudnorm to −14 LUFS / −1 dBTP |
| package | `08_package/package.json` | needs `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` |
| **qa** | `09_qa/qa.json` | **working (technical checks)**: resolution, duration, audio, loudness, no placeholder beats, provenance. The ASR diff and multimodal judge come later |
| publish | `10_publish/publish.json` | needs `YOUTUBE_CLIENT_SECRET_JSON` (unlisted upload) |

## Remotion components (`src/remotion/`)

- **Captions:** word-level pages built with `@remotion/captions`. The active word is highlighted and emphasis words pop in the accent colour. Captions shrink on full-screen graphics and are skipped where the graphic already shows the words.
- **BeatLayer:** twin, library or generated clips and stills, with a slow push-in and punch-ins on emphasis words. Placeholders appear until media exists.
- **Graphics:** `title`, `stat` (count-up), `bars`, `quote`, `steps`, `kinetic`, all on a drifting gradient backdrop.
- **LowerThird** and **ProgressBar**.
- **Brand** comes from `runs/<id>/brand.json`: font, colours and creator name.

`fixtures/demo/` holds a sample script and an EDL with **synthetic** word timings and no voice, used only to exercise the renderer. Regenerate it with `npx tsx src/pipeline/make-fixture.ts`.
