# Concept video: end-to-end process (draft v0.1)

**Goal:** Produce one YouTube video that shows the state of the art in late 2026 for *creator-in-the-loop* automation. The creator supplies their own identity: voice, face, footage and writing style. AI tools handle the production labour: research, drafting, voicing, editing, captions, packaging, publishing and learning from results. The finished video should look and sound like that creator made it, because the creative decisions really are theirs. The automation replaces the editor, not the author.

This differs from the "faceless brainrot" model in the research report. YouTube's inauthentic-content policy targets templated, mass-produced catalogs, and it explicitly allows AI used to realise the creator's own ideas. The creator's real identity is the strongest originality signal available, so this design is built around it.

---

## 0. One-time setup: the creator kit

Everything downstream is conditioned on these assets. Build them once and refresh them every few months.

| Asset | What the creator provides | Tool | Output |
|---|---|---|---|
| **Voice clone** | 30 min or more of clean speech in their normal delivery (podcast-style, quiet room) plus ElevenLabs' voice-verification step | ElevenLabs Professional Voice Clone, used with Eleven v4 | `voice_id` |
| **Digital twin** (optional) | 2–5 min of talking-head footage plus a recorded consent statement | HeyGen Avatar V (custom) | `avatar_id` for A-roll beats the creator doesn't film |
| **Footage library** | Raw clips they already have: talking heads, desk shots, screen recordings, travel and b-roll | Multimodal video indexing: scene-split each clip, caption it with a vision model, embed it | Searchable `library.jsonl` (clip, in/out, description, embedding) |
| **Likeness / style pack** | 20–40 photos, plus thumbnails they like | FLUX.2 LoRA on the creator, or Nano Banana Pro / GPT Image 2.5 reference-image editing | Thumbnail and keyframe generator that looks like *them* |
| **Writing-style bible** | Transcripts of 10–20 of their past videos, plus phrases they do and don't use | Distilled by Claude into a style guide; full transcripts kept as cached few-shot examples | `style_bible.md` |
| **Brand kit** | Fonts, colours, intro/outro sting, lower-third style, caption style | Remotion components | `brand/` package |

> Consent is built in: ElevenLabs PVC and HeyGen custom avatars both require the person being cloned to verify themselves.

---

## 1. Per-video pipeline

```
 Idea (voice memo / note / agent suggestion)
   │
   ▼
 [1] Ideation & angle ──► GATE A: creator picks the angle (30 s)
   │
   ▼
 [2] Research agent → evidence pack (sources, quotes, data)
   │
   ▼
 [3] Script in creator's voice → beat sheet + visual plan + claims[] → verifier
   │                                   ──► GATE B: creator edits/approves script (5–15 min)
   ├──────────────┬──────────────────┬──────────────────────┐
   ▼              ▼                  ▼                      ▼
 [4] Voice     [5a] A-roll        [5b] B-roll            [5c] Graphics
 PVC + word    real clip, or      library search →       Remotion charts,
 timestamps    digital twin       fill gaps with         callouts, maps
               lip-synced         generated I2V / stock
   └──────────────┴──────────┬───────┴──────────────────────┘
                             ▼
 [6] Audio: music bed + SFX + ducking + loudness
                             ▼
 [7] Assembly: EDL JSON → Remotion render → ffmpeg master
                             ▼
 [8] Packaging: titles ×3, thumbnails ×3 (creator's face), chapters, description, Shorts cut
                             ▼
 [9] QA: tech checks · ASR-vs-script diff · multimodal judge · fact re-check
                             ──► GATE C: creator watches and approves (≈ runtime)
                             ▼
 [10] Publish: YouTube Data API (scheduled, captions, chapters, Test & Compare, AI disclosure)
                             ▼
 [11] Learn: retention curve × beats → update style bible and hook examples
```

The creator spends about **20–30 minutes per video**, all of it at the three gates. Everything else is automated.

### Stage detail

| # | Stage | Input → output | Primary tool (Oct 2026) | Notes |
|---|---|---|---|---|
| 1 | Ideation | Creator note + channel analytics + comments → 5 angles with a hook and premise | Claude Sonnet 5.5 | Also scores similarity to the last 20 videos so the catalog doesn't look templated |
| 2 | Research | Angle → `evidence.json` (claim, quote, URL) | Claude Agent SDK + web search (Opus 5.5) | Every factual line must cite an evidence ID |
| 3 | Script | Evidence + style bible → `script.json` | Opus 5.5 to draft; a GPT-6.x or Gemini verifier | Hook candidates go through a pairwise judge. Each beat carries `line`, `visual_intent` (`aroll` / `broll` / `graphic`), `broll_query` and `emphasis` words |
| 4 | Voice | Approved lines → `voice.mp3` + `words.json` | ElevenLabs v4 `with-timestamps` using the creator's PVC | Inline emotion tags for delivery. Option: the creator records the hook live and the clone does the rest |
| 5a | A-roll | Beats marked `aroll` → talking-head clips | Preferred: creator films 2–3 lines on a phone. Fallback: HeyGen Avatar V twin driven by `voice.mp3` | Real footage for the hook gives the best authenticity |
| 5b | B-roll | `broll_query` → clip in/out | Embedding search over `library.jsonl`; gaps filled by keyframe (Nano Banana Pro / GPT Image 2.5) → I2V (Gemini Omni Flash / Veo 3.1 / Kling 3.0 via fal); Pexels for generic shots | Prefer the creator's own footage. Log the source of every frame |
| 5c | Graphics | Data claims → animated components | Remotion (code written by Claude Code via Remotion Skills) | Charts, quote cards, screenshots with highlights |
| 6 | Audio | Voice + mood → final mix | ElevenLabs Music (bed) + SFX; ffmpeg `sidechaincompress` + `loudnorm` to −14 LUFS | Avoid Suno/Udio while the litigation continues |
| 7 | Assembly | All of the above → `edl.json` → `master.mp4` | Remotion (local render for the concept; Lambda at scale) | Word-level captions, punch-in zooms on emphasis words, J/L cuts, brand lower-thirds |
| 8 | Packaging | Script + master → metadata, thumbnails, Shorts | Opus 5.5 for titles and descriptions; LoRA or reference-edit model for thumbnails of the creator's face; vertical recut of the best 45 s | Three title/thumbnail pairs feed YouTube's Test & Compare |
| 9 | QA | Master → pass/fail report | ffprobe (resolution, duration, LUFS); ASR diff (Scribe v2 / WhisperX); Gemini multimodal judge with a rubric; fact re-verification | Any failure goes back to the stage responsible |
| 10 | Publish | Approved master + metadata → live/scheduled video | YouTube Data API `videos.insert` + captions + thumbnails | Set the altered/synthetic-content disclosure (cloned voice, digital twin). YouTube states it doesn't affect reach |
| 11 | Learn | Analytics after 48 h and 7 d → updated bible | YouTube Analytics API (`audienceWatchRatio` by elapsed ratio) | Drop-offs are aligned to beat timestamps and become do/don't examples |

---

## 2. The contract between stages: `edl.json` (sketch)

```json
{
  "meta": { "title": "...", "fps": 30, "width": 1920, "height": 1080, "voice_id": "...", "duration_s": 94.2 },
  "audio": { "voice": "voice.mp3", "words": "words.json", "music": "bed.mp3", "sfx": [{ "at": 3.1, "src": "whoosh.mp3" }] },
  "beats": [
    { "id": "b1", "start": 0.0, "end": 4.2, "type": "aroll", "src": "aroll/hook.mp4",
      "zoom": [{ "at": 1.8, "to": 1.15 }], "caption_emphasis": ["never"] },
    { "id": "b2", "start": 4.2, "end": 11.0, "type": "broll", "src": "library/desk_017.mp4", "in": 12.3,
      "source": "creator_library" },
    { "id": "b3", "start": 11.0, "end": 17.5, "type": "graphic", "component": "BarChart",
      "props": { "evidence_id": "e4" } }
  ],
  "captions": { "style": "brand/word-highlight", "position": "lower-third" },
  "provenance": { "generated_frames": ["b5"], "c2pa": true }
}
```

Each stage writes one artifact. Each artifact is versioned and carries a cost line, so the concept run produces its own audit trail. That trail is useful material for the report: it shows what the AI did and what the human did.

---

## 3. The concept video itself (proposed)

- **Format:** one horizontal video of about 90 seconds to 3 minutes, plus an auto-derived 9:16 Short.
- **Topic:** to be decided by the creator. A meta topic such as "How I make videos with AI without losing my voice" doubles as a demo for the report.
- **Proof artefacts for the report:** the run log with timing and cost per stage, before/after script diffs at Gate B, a library-vs-generated breakdown of the B-roll, and the QA report.
- **Orchestration for the concept:** a single Python or TypeScript runner with resumable stages, one folder per stage. Temporal or Trigger.dev is only needed once there are multiple videos, so it is deferred.

---

## 4. Decisions (locked 2026-10-11)

| Decision | Choice | Effect on the pipeline |
|---|---|---|
| Identity | **The creator's own** (real voice, face and photos) | PVC of the creator's voice; digital twin built from the creator's footage and photos |
| A-roll | **Fully digital**: no live filming per video | Stage 5a is always the digital twin, driven by `voice.mp3`. The hook-filmed-live option is dropped |
| Graphic content | **Animated** | Stage 5c is the main visual layer. Remotion motion graphics, plus generated animated sequences (keyframe → I2V) in a consistent illustrated style |
| Vendors | ElevenLabs · Google Gemini/Veo · fal.ai · Anthropic/OpenAI | Twin via fal (HeyGen Avatar V, or an audio-driven avatar model such as Kling Avatar or OmniHuman). Pick by quality test in Phase 1. No direct HeyGen account |
| Endpoint | **Private/unlisted YouTube upload** | Stage 10 runs for real with `privacyStatus: "unlisted"` (or `private`). Needs a Google Cloud OAuth client for the YouTube Data API |

Revised visual mix for the concept: about 30% digital-twin A-roll, 50% animated graphics and illustrated sequences, and 20% the creator's own library footage where it fits.

## 5. What the creator needs to supply

**Assets** (drop into `concept_video/creator_kit/`; keep raw media out of git):
- [ ] Voice: 30 min or more of clean solo speech (WAV/MP3, one speaker, no music). Pro-clone verification is done in the ElevenLabs dashboard by the creator.
- [ ] Twin footage: one 2–5 min front-facing talking-head clip (1080p or better, even light, neutral background, natural gestures), plus 10–20 photos.
- [ ] Style: links to or transcripts of 10–20 past videos or posts in the creator's own words. If there's no video history, writing samples work.
- [ ] Brand: preferred fonts and colours, and a reference for the animation style (a channel or video whose look the creator likes).
- [ ] Topic and target length for the concept video.

**API keys:** add them as environment secrets in the cloud environment settings. Never paste them in chat. Variable names the pipeline will read:
`ELEVENLABS_API_KEY`, `GEMINI_API_KEY`, `FAL_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, plus `YOUTUBE_CLIENT_SECRET_JSON` (an OAuth client for the YouTube Data API v3, desktop-app type) for the unlisted upload.

## 6. Next build steps

1. Scaffold `concept_video/` as a resumable stage runner: one folder and one artifact per stage, plus a cost ledger.
2. Stage 3 first: script generation from a topic and the style bible. This can run as soon as the Anthropic/OpenAI keys are present.
3. Stage 4: ElevenLabs PVC voice with word timestamps.
4. Twin bake-off: render the same 10 s line on two or three fal avatar models and pick the best.
5. Remotion project: caption, animated-graphic and lower-third components driven by `edl.json`.
6. Wire QA and the unlisted upload, then run the whole thing end to end.
