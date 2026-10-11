# Audio and Caption Stages of an Automated Faceless Short-Form Video Pipeline (state as of Oct 11, 2026)

Scope: voiceover (TTS), voice cloning and consent, music and SFX, transcription and alignment, animated word-level captions. Budget is treated as no object. Research date: 2026-10-11. Many sources are secondary (vendor blogs, aggregators). Where a fact comes only from a secondary source, that is noted. Anything dated before 2026 is marked [OLDER].

## Q1. TTS leaders: expressiveness, emotion control, latency, pricing, commercial licensing. Is AWS Polly neural obsolete?

### Takeaway
As of October 2026 the quality leaders on blind-vote arenas are ElevenLabs Eleven v4 and v4 Turbo (launched Sept 28, 2026), Google Gemini 3.8 Flash and Flash-Lite TTS, Alibaba Qwen-Audio-3.1-TTS, and Cartesia Sonic 3.6. Inworld Realtime TTS-2 and Speechify Simba 3.2 are close behind. For pre-rendered (non-realtime) narration, latency barely matters. When budget is not a constraint, ElevenLabs v4 is the default pick: it ranks top or near top, has inline emotion and SFX tags, a large voice library and cloning, and an endpoint that returns timestamps. Gemini 3.8 TTS is the strongest challenger at about 1/5 the price. OpenAI's gpt-4o-mini-tts, Azure, and Polly now trail well behind. Polly generative is usable but uncompetitive. The premise that "Polly neural = 8 kHz MP3" is not accurate (neural supports up to 24 kHz). Even so, Polly neural is obsolete for monetized, expressive short-form narration.

### Cited Findings
**Leaderboards (two independent arenas, both current to Sept/Oct 2026)**
- Artificial Analysis Provider Voice Arena, top 20 by Elo (no snapshot date shown; latest entries Sept 2026):
  1. Eleven v4 Turbo: 1327 ($40/1M chars)
  2. Eleven v4: 1323 ($80)
  3. Qwen-Audio-3.1-TTS-Plus (Alibaba): 1298 ($19.3)
  4. Cartesia Sonic 3.6: 1284 ($49)
  5. Gemini 3.8 Flash TTS: 1272 ($16.5)
  6. Qwen-Audio-3.0-TTS-Plus: 1264
  7. Inworld Realtime TTS-2: 1257 ($20.8)
  8. Gemini 3.8 Flash-Lite TTS: 1244 ($11)
  9. Speechify Simba 3.2: 1243 ($6.6)
  10. BreezeBlue Breeze TTS 2: 1222 (top open-weights model)
  - Further down: Eleven v3 Conversational 1207 ($50), Sonic 3.5 1191, Eleven v3 1176 ($100, Feb 2026), MiniMax Speech 2.8 HD 1173.

  — [Artificial Analysis TTS Leaderboard](https://artificialanalysis.ai/text-to-speech/leaderboard)
- Voice Arena (US English), quality ranking with time-to-first-audio (TTFA):
  1. Gemini 3.8 Flash-Lite TTS: 1083 ±14 (Sep 2026)
  2. Eleven v4: 1066 ±12 (Oct 2026)
  3. Cartesia Sonic-3.6: 1060 (TTFA 340 ms)
  4. Gemini 3.8 Flash TTS: 1059
  5. Gemini 3.1 Flash TTS: 1054 (TTFA 890 ms)
  6. Inworld Realtime TTS 2: 1050 (TTFA 168 ms)
  7. Speechify Simba 3.2: 1030 (TTFA 123 ms)
  - Further down: Eleven v3 Conversational 1026, Gradium-TTS 1007 (TTFA 68 ms), xAI Grok TTS 992, Fish Audio S2.1 Pro 991, Murf Falcon 2 990, Eleven v3 984 (TTFA 587 ms), Microsoft Azure Dragon HD Omni 972, OpenAI gpt-4o-mini-tts 926 (Mar 2025 [OLDER model]), Cartesia Sonic-3 855 (Oct 2025).

  — [Voice Arena](https://voicearena.com/)
- The arenas disagree on the #1 spot: AA has ElevenLabs v4 Turbo first, while Voice Arena has Gemini 3.8 Flash-Lite first. Confidence intervals in Voice Arena overlap among its top 4 (±12–14). — [Voice Arena](https://voicearena.com/); [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard)
- Artificial Analysis reported multilingual arenas (9 languages) in which Cartesia Sonic leads 8 of 9 (via search summary of AA's X post). — [Artificial Analysis on X](https://x.com/ArtificialAnlys/status/2102490340678856997)

**ElevenLabs**
- Eleven v4 and v4 Turbo launched Sept 28, 2026. ElevenLabs describes them as a new architecture that interprets tone, pacing, emotion, character and context from text, with inline tags that direct delivery and sound effects. Turbo is the low-latency option (about 100–150 ms reported). Both support 90+ languages. Instant cloning now needs only 10 seconds of audio. Both are available via API, including on the free tier. These are trade-press reports of company claims. — [Unite.AI](https://unite.ai/elevenlabs-launches-eleven-v4-with-low-latency-turbo-variant); [VKTR](https://www.vktr.com/ai-platforms/elevenlabs-launches-eleven-v4-and-v4-turbo/); [RuntimeWire](https://runtimewire.com/article/elevenlabs-eleven-v4-turbo-launch)
- Official API pricing, per 1K characters:
  - v4: $0.08 (promo $0.022, 72% off until Oct 12, 2026)
  - v4 Turbo: $0.04 (promo $0.011)
  - v3: $0.08
  - v3 Conversational: $0.04
  - v2 Multilingual: $0.08
  - Flash/Turbo: $0.04

  — [ElevenLabs API pricing](https://elevenlabs.io/pricing/api)
- Secondary sources say an Oct 5, 2026 price change cut v3 and v2 from $0.10 to $0.08. AA still lists v3 at $100/1M, which suggests AA's price data is stale. — [goodvibecode](https://www.goodvibecode.com/text-to-speech/elevenlabs-api-pricing-explained); [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard)
- v3 is capped at 5,000 characters per request (secondary). — [aireiter](https://aireiter.com/blog/elevenlabs-eleven-v3-api-guide)
- Output formats: MP3 up to 44.1 kHz/192 kbps (192 kbps needs Creator tier or above), Opus 48 kHz, and PCM/WAV 8–48 kHz (44.1 kHz PCM/WAV needs Pro tier or above). — [ElevenLabs API reference: convert-with-timestamps](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps)

**Google Gemini TTS**
- Gemini 3.8 Flash TTS ($16.5/1M chars) and Flash-Lite TTS ($11/1M) were both released Sept 2026 and rank in the top 5–8 (AA) and the top 4 (Voice Arena). — [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard); [Voice Arena](https://voicearena.com/)

**OpenAI**
- gpt-4o-mini-tts (Mar 2025 [OLDER]) supports natural-language "instructions" for style. It is billed at $0.60/1M input text tokens and $12/1M audio output tokens. The often-quoted ~$0.015/min figure is an estimate. — [OpenAI community forum](https://community.openai.com/t/understanding-gpt-4o-mini-tts-pricing-input-characters-cost/1151816); [LLM Reference](https://www.llmreference.com/model/gpt-4o-mini-tts/openai-api)
- gpt-4o-mini-tts is ranked 20th of 21 on Voice Arena (Elo 926). — [Voice Arena](https://voicearena.com/)
- Realtime voices are preset only (no cloning). One comparison lists "Realtime-2" at $32/1M audio input tokens and $64/1M audio output tokens. This is secondary and unverified. — [Coval](https://www.coval.ai/blog/best-text-to-speech-providers-in-2026-how-to-choose-(and-why-vendor-benchmarks-lie)/)

**Cartesia, Inworld, Hume, Microsoft**
- Cartesia Sonic 3.6 (Aug 2026, $49/1M): #4 on AA and #3 on Voice Arena, with TTFA 340 ms. — [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard); [Voice Arena](https://voicearena.com/)
- Inworld Realtime TTS-2 (launched May 2026 per Inworld, listed as Aug/Sep 2026 on the arenas) is #1 on AA's *Realtime* arena, according to Inworld (vendor claim). — [Inworld](https://inworld.ai/resources/best-voice-ai-tts-apis-for-real-time-voice-agents-2026-benchmarks)
- Hume Octave 2 is positioned on emotional delivery. Since June 2026 it costs about $0.025–$0.075 per 1K characters depending on tier. It is still labeled a preview. It does not appear in the top-20 arena lists above. — [usagepricing (Hume)](https://usagepricing.com/blueprint/hume-ai); [aiwiki Octave 2](https://www.aiwiki.ai/wiki/hume_octave_2)
- Microsoft Azure Dragon HD Omni (Jan 2026): Voice Arena Elo 972, rank 16. — [Voice Arena](https://voicearena.com/)

**Amazon Polly**
- Generative voices default to 24 kHz. Standard and neural voices can output 8, 16, 22.05 or 24 kHz, so neural is not limited to 8 kHz. — [AWS Polly docs: generative voices](https://docs.aws.amazon.com/polly/latest/dg/generative-voices.html)
- Official pricing per 1M characters: generative $30, long-form $100, neural $19.20. The free tier gives 100K generative characters per month for 12 months. — [AWS Polly pricing](https://aws.amazon.com/polly/pricing/)
- Third-party pages list neural at $16/1M, which conflicts with AWS. — [costbench](https://costbench.com/software/ai-voice-tools/amazon-polly/)
- Polly (any engine) does not appear in either arena's top 20. — [Artificial Analysis](https://artificialanalysis.ai/text-to-speech/leaderboard); [Voice Arena](https://voicearena.com/)

**Open-weights models (license is the key issue for monetized content)**

| Model | License | Commercial use | Notes |
|---|---|---|---|
| Kokoro 82M | Apache 2.0 | Yes | CPU-capable; no cloning |
| Chatterbox (Resemble) | MIT | Yes | Cloning; 23-language version; output is watermarked |
| Dia 1.6B (Nari) | Apache 2.0 | Yes | English, dialogue-focused |
| F5-TTS | Code MIT, official weights CC-BY-NC | No (with official weights) | — |
| Fish Audio S2 | Research license | Needs separate authorization | — |
| Breeze TTS 2 | Research/non-commercial | No | Top-ranked open model |
| Sesame CSM-1B | Apache 2.0 per one source | Unconfirmed | Verify the model card |

  — [codesota TTS licenses](https://www.codesota.com/guides/tts-models); [texttolab open-source TTS](https://texttolab.com/blog/open-source-text-to-speech); [localaimaster](https://localaimaster.com/blog/kokoro-vs-xtts-vs-chatterbox); [Cartesia open-source TTS](https://www.cartesia.ai/learn/open-source-tts)

### Inferences
- For a pre-rendered pipeline, use ElevenLabs Eleven v4 (not Turbo) as the primary voice: top arena placement, audio tags for emotion and pacing, cloning, a timestamps endpoint, and a stable commercial-license story on paid plans. Turbo matters only for live or interactive use.
- Use Gemini 3.8 Flash TTS as an A/B alternative or fallback. It has near-equal arena quality at about 1/5 the price.
- Cartesia Sonic 3.6 is the best pick if multilingual output is a priority.
- Even with an unlimited budget, run a small blind A/B on your own scripts. The two arenas disagree on #1 and their top confidence intervals overlap.
- Polly neural is obsolete for this use: it is outside the top 20 on both arenas and has limited emotion control. The reason is quality, not the sample rate. Polly generative is acceptable only if the stack must stay AWS-native.
- Avoid open models under non-commercial licenses (F5 official weights, Breeze, Fish S2) for monetized channels. Kokoro and Chatterbox are the safe self-hosted options.

### Gaps
- I could not open ElevenLabs' own v4 blog post. Launch details come from trade press.
- I did not verify the current Hugging Face TTS Arena standings.
- I did not verify Sesame's current model or license, or the Qwen-Audio-3.1 license and terms.
- I found no official OpenAI per-minute TTS price, and did not confirm whether a newer OpenAI TTS model (after gpt-4o-mini-tts) exists.
- I found no detailed Polly generative quality benchmark.
- I did not check each vendor's ToS clause on commercial or monetized output individually. ElevenLabs paid plans are commonly cited as granting commercial rights, but I did not fetch the ToS.

## Q2. Voice cloning, consent/legal issues, and TikTok-style voices

### Takeaway
High-quality cloning is now trivial: ElevenLabs v4 instant clones need about 10 seconds of audio. The legal risk is about whose voice it is. Tennessee's ELVIS Act (in force since July 2024) makes unauthorized voice replicas actionable, including against tool providers. The federal NO FAKES Act of 2026 cleared Senate Judiciary in June 2026 but is not law. Clone only your own or contracted voices with written consent, or use stock library voices. The classic TikTok "Jessie" voice is a real voice actor (Kat Callaghan), and these voices are saturated and polarizing.

### Cited Findings
- ElevenLabs v4 instant voice cloning starts from 10 seconds of audio (trade press). — [Unite.AI](https://unite.ai/elevenlabs-launches-eleven-v4-with-low-latency-turbo-variant)
- Chatterbox (open, MIT) supports cloning and watermarks its output. — [codesota](https://www.codesota.com/guides/tts-models)
- NO FAKES Act of 2026 status:
  - Introduced as S.4591 and H.R.8915 on May 20, 2026.
  - Senate Judiciary advanced it by voice vote in June 2026 (sources give June 18 or June 24). It is on the Senate calendar and has not passed either chamber.
  - One tracker estimates a 27% chance of enactment.

  — [Congress.gov S.4591](https://www.congress.gov/bill/119th-congress/senate-bill/4591); [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/06/senate-judiciary-committee-advances-legislation-to-protect-name); [Manatt](https://www.manatt.com/insights/newsletters/client-alert/congress-reintroduces-the-no-fakes-act-what-s-new-in-the-2026-bill); [GovTrack](https://www.govtrack.us/congress/bills/119/s4591); [ByteBack Law](https://www.bytebacklaw.com/2026/08/a-federal-shift-in-ai-and-the-right-of-publicity-no-fakes-act-advances-in-congress/)
- Tennessee ELVIS Act [OLDER, 2024, still in force]: effective July 1, 2024. It adds voice to protected likeness rights, creates civil actions and Class A misdemeanor penalties, and gives a private right of action against tools whose primary function is producing someone's voice or likeness without authorization. — [Armstrong Teasdale](https://www.armstrongteasdale.com/thought-leadership/artificial-intelligence-and-copyrights-tennessees-elvis-act-becomes-law/); [Chambers 2026 guide](https://practiceguides.chambers.com/practice-guides/artificial-intelligence-2026/usa-tennessee/trends-and-developments)
- TikTok's "Jessie" TTS voice is Canadian radio host Kat Callaghan, who confirmed it in Oct 2022 [OLDER]. — [Globeistan interview](https://globeistan.com/?p=105937); [Good Morning America](https://goodmorningamerica.com/gma/story/meet-woman-tiktoks-famous-jessie-voice-92990300)
- A Feb 2026 report says built-in TikTok voices and third-party generators have saturated social media. It describes a male AI narrator voice as one of the most recognizable and polarizing sounds online (the voice is not named). — [AOL/Martha Stewart piece](https://www.aol.com/entertainment/martha-stewart-says-theres-one-033924142.html)
- YouTube policy context (third-party guides): AI voiceover is not banned. The renamed "inauthentic content" policy (formerly "repetitious content") targets mass-produced, templated uploads. Disclosure is required for realistic synthetic content. A static image with AI voiceover over a generic or scraped script is flagged as high-risk. — [faceless.my](https://faceless.my/youtube/youtube-inauthentic-content-policy-faceless-ai-2026/); [narrationbox](https://narrationbox.com/blog/youtube-ai-voice-policy-explained-clearly); [ytzolo](https://ytzolo.com/blog/youtube-repetitive-content-policy-ai-slop-2026/)

### Inferences
- Recommended practice: use ElevenLabs Voice Library voices or a professionally cloned voice of a contracted voice actor with written consent covering AI use, monetization and term. Never clone celebrities or creators, including sound-alikes. ELVIS-style laws and the pending NO FAKES Act target exactly that.
- Avoid the overused default voices (TikTok Jessie-style, ubiquitous library narrators). They signal "AI slop" and may feed YouTube's inauthentic-content judgment. A distinctive custom or cloned house voice is both a brand asset and a defense.
- Platform built-in TikTok voices cannot be used through an API in an automated off-platform pipeline (inference; not verified).

### Gaps
- I did not verify other state voice laws (California, New York digital replica laws) or the EU AI Act transparency obligations for synthetic audio.
- I did not fetch YouTube's or TikTok's official policy pages; the policy findings above come from secondary guides.
- I did not verify the ElevenLabs voice-library licensing terms for monetized use.
- I found no source naming the specific overused ElevenLabs voices (for example "Adam").

## Q3. Is a separate transcription step needed when TTS returns timestamps? AssemblyAI vs Deepgram vs OpenAI vs WhisperX for word timing

### Takeaway
For a pure TTS pipeline, no separate ASR step is needed. ElevenLabs' `convert-with-timestamps` returns character-level start and end times, which you group into words. ElevenLabs Forced Alignment (text plus audio in, a word array out, priced at the STT rate, about $0.22/hr) covers any audio from another TTS vendor. Run ASR only if you have no source script (for example, repurposing human speech), or as a QA check that the spoken audio matches the script. Among ASR options, WhisperX (Whisper plus wav2vec2 forced alignment) has the best-documented word-timing precision. AssemblyAI and Deepgram return word timestamps natively. OpenAI's API word timestamps are reported to be less precise.

### Cited Findings
- The ElevenLabs `POST /v1/text-to-speech/{voice_id}/with-timestamps` response contains:
  - `audio_base64`
  - `alignment` and `normalized_alignment`, each with `characters`, `character_start_times_seconds` and `character_end_times_seconds`

  Timing is character-level, not word-level. — [ElevenLabs API reference](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps)
- ElevenLabs Forced Alignment:
  - Pricing matches the Speech-to-Text rate.
  - Limits: 3 GB file, 10 hours of audio, 675K characters. An older FAQ says 1 GB, which conflicts.
  - Input must be plain text; diarized transcripts are not supported.

  — [ElevenLabs Forced Alignment docs](https://elevenlabs.io/docs/overview/capabilities/forced-alignment)
- The fal.ai-hosted ElevenLabs forced alignment returns a `words` array plus character data and a `loss` value, at $0.22 per audio hour. — [fal.ai](https://fal.ai/models/fal-ai/elevenlabs/forced-alignment/llms.txt)
- ElevenLabs Scribe v2 costs $0.22/hr (keyterm prompting +$0.05). Scribe v2 Realtime costs $0.39/hr, with "precise word-level timestamps." — [ElevenLabs API pricing](https://elevenlabs.io/pricing/api)
- AssemblyAI's own benchmark: Universal-3.6 Pro Realtime at 5.19% WER vs Deepgram Nova-3 at 8.64% (vendor-reported). — [AssemblyAI benchmarks](https://www.assemblyai.com/benchmarks)
- Deepgram's guide claims Nova-3 is at 5.26% WER and AssemblyAI at 10.7%. These vendor claims directly contradict each other. — [Deepgram](https://deepgram.com/learn/best-speech-to-text-apis-2026)
- Deepgram and AssemblyAI return word-level timestamps by default. OpenAI requires `timestamp_granularities: ["word"]`, and one guide says Whisper-API word times are interpolated and can be off by 200–500 ms. — [PkgPulse](https://www.pkgpulse.com/guides/deepgram-vs-openai-whisper-vs-assemblyai-speech-to-text-2026)
- One research paper notes that Fireworks and OpenAI APIs do not return predicted word-level timestamps for some models. — [arXiv 2507.13551](https://arxiv.org/pdf/2507.13551)
- WhisperX on Switchboard: 93.2% precision and 65.4% recall for word timing, vs 85.4% and 62.8% for native Whisper timestamps [OLDER benchmark]. — [arXiv 2507.13551](https://arxiv.org/pdf/2507.13551); [ForaSoft WhisperX deep-dive](https://www.forasoft.com/learn/ai-for-video-engineering/articles-ai/whisperx-diarization-word-level-timestamps)

### Inferences
- Recommended architecture:
  1. The script text is the source of truth.
  2. Call ElevenLabs `with-timestamps` and group characters into words, splitting on whitespace and using `normalized_alignment` carefully for numbers and abbreviations.
  3. Map words back to the original script spelling for on-screen display.
- If using Gemini, Cartesia or another TTS without equivalent timestamps, run forced alignment (ElevenLabs FA, or WhisperX/MFA self-hosted) against the known script. This beats free-form ASR because there are no transcription errors to fix.
- Optional QA: run Scribe v2, AssemblyAI or Deepgram on the rendered audio and diff against the script to catch TTS hallucinations, skipped words or mispronunciations. This matters more with expressive models such as v3/v4 audio tags.

### Gaps
- I found no independent 2026 benchmark of word-boundary timing error (ms) across AssemblyAI, Deepgram, OpenAI's latest transcribe models and ElevenLabs Scribe. The WER figures are vendor-reported and conflicting.
- I did not verify the current OpenAI transcription model names (for example gpt-4o-transcribe successors) or their word-timestamp support.
- I did not verify whether the newer v4 model supports the with-timestamps endpoint. The docs say to check `/v1/models`.

## Q4. Animated caption styles that perform and how to implement them

### Takeaway
The dominant style is "TikTok/Hormozi" paging: 1–3 words on screen, bold sans-serif, heavy stroke and shadow, with the currently spoken word highlighted by color, scale or pop, and occasional emoji or keyword emphasis. There are three implementation paths:
- **ASS/libass karaoke tags burned in with ffmpeg:** cheapest, fully headless.
- **Remotion's `@remotion/captions`:** React; maximum design control and spring animations; the strongest option for a programmatic pipeline.
- **SaaS APIs (Submagic, Captions.ai Mirage):** fastest to ship, but less control and per-minute costs.

### Cited Findings
- Remotion `createTikTokStyleCaptions()` groups caption tokens into "pages." `combineTokensWithinMilliseconds` controls words per page; a low value produces word-by-word animation. Each page renders in a `<Sequence>`. Tokens carry start and end times, so you can highlight the active word (the docs example uses green on white). Text must include leading whitespace per token. The API is listed under v4.0.216. — [Remotion docs: create-tiktok-style-captions](https://remotion.dev/docs/captions/create-tiktok-style-captions); [Remotion docs: displaying captions](https://www.remotion.dev/docs/captions/displaying)
- ASS karaoke uses the `\k`, `\kf` and `\ko` timing tags. Burn-in pattern: `ffmpeg -i in.mp4 -vf "ass=karaoke.ass" -c:v libx264 -crf 18 -c:a copy out.mp4`. ffmpeg must be built with libass; default Homebrew ffmpeg lacks it (check with `ffmpeg -filters | grep subtitles`). — [ffmpeg karaoke skill guide](https://skillselion.com/skills/josiahsiegel/claude-plugin-marketplace/ffmpeg-karaoke-animated-text); [n8n workflow 18486](https://n8n.io/workflows/18486-burn-word-highlighted-karaoke-captions-onto-videos-with-ffmpeg-and-ffprobe/)
- ASS pitfalls: zero-duration `\k0` tags cause silent failures, and missing PlayResX/PlayResY breaks positioning. — [CRAN subtitles package](https://ftp.fau.de/cran/web/packages/subtitles/refman/subtitles.html)
- ass-html5 renders `\k`, `\kf`, `\ko` and `\K` in the browser. — [ass-html5 README](https://cdn.jsdelivr.net/npm/ass-html5@0.6.2/README.md)
- Submagic: API access sits in the top tier. Secondary sources describe a Business+API plan at about $41/mo with ~100 API minutes per month, and metered overage of ~$0.10–$0.15/min. Prices conflict across sources. — [Submagic pricing](https://www.submagic.co/pricing); [cutsnap](https://cutsnap.ai/blog/submagic-pricing-2026); [fluxnote](https://fluxnote.io/guides/submagic-pricing-2026)
- Captions.ai Mirage API bills AI captions per minute (the rate was not shown in the results) and Mirage Avatar X at $0.15/sec in 6-second increments. — [Captions API pricing](https://captions.ai/help/docs/api/pricing)

### Inferences
- With a known script and word timestamps, Remotion is the best fit for a programmatic, budget-unconstrained pipeline:
  - Full React/CSS control: per-word scale and spring pop, color highlight, emoji insertion, keyword emphasis chosen by an LLM pass, safe-area positioning.
  - Deterministic renders that can be parallelized with Remotion Lambda.
- ASS plus ffmpeg is a solid lightweight fallback. Combining `\kf` sweeps with `\t()` transforms and `\fscx/\fscy` approximates the pop effect.
- Submagic or Captions APIs make sense only to outsource styling taste. They re-transcribe audio (adding error) and limit layout control.
- Design guidance commonly followed:
  - Place captions in the center or upper-middle third, away from platform UI overlays at the bottom and right.
  - Show 1–3 words per page.
  - Use high-contrast fills with thick outlines.
  - Highlight the active word.

  These are practitioner conventions. I found no rigorous A/B data.

### Gaps
- I found no rigorous, citable A/B data on caption-style retention lift; most claims are anecdotal or vendor marketing.
- I did not find the Captions.ai per-minute caption rate.
- I did not verify current platform safe-zone pixel specs (TikTok, Reels, Shorts).
- I did not research ZapCap, Vizard or other caption APIs.

## Q5. AI music and SFX: Suno, Udio, ElevenLabs Music/SFX, Stable Audio. Licensing after label settlements, platform libraries, copyright risk

### Takeaway
The label situation is split:
- **Warner:** settled with both Suno (Nov 2025) and Udio.
- **UMG:** settled with Udio (Oct 29, 2025).
- **UMG and Sony vs. Suno:** still litigating. They filed a second suit on Sept 18, 2026 targeting Suno v6 (launched Sept 9, 2026, with Warner, BMG and Believe as partners) as "fruit of the same poisoned tree."
- **Udio:** reportedly moving to a walled-garden model with no exports.

For a monetized pipeline, the lowest-risk music source is ElevenLabs Eleven Music: licensed from Merlin and Kobalt before training, $0.15/min via API, commercial use on Starter plans and up. ElevenLabs SFX ($0.12/min, royalty-free) covers sound effects. Suno output carries live litigation risk, and Udio output may not be exportable.

### Cited Findings
- Warner settled with Suno in Nov 2025 under a licensing partnership. Its release said current models would be deprecated when new licensed models launch in 2026 [OLDER, 2025]. — [Music Business Worldwide (WMG–Suno)](https://www.musicbusinessworldwide.com/warner-music-group-settles-with-suno-strikes-first-of-its-kind-deal-with-ai-song-generator/)
- Warner settled with Udio and struck a licensing deal for a "next-generation" platform coming in 2026 [OLDER, 2025]. — [Music Business Worldwide (WMG–Udio)](https://www.musicbusinessworldwide.com/warner-music-settles-udio-lawsuit-strikes-licensing-deal-with-ai-platform/)
- UMG settled with Udio on Oct 29, 2025. Secondary sources say Udio is becoming a closed or walled-garden platform where tracks cannot be exported. — [replayedstudio](https://replayedstudio.com/blog/suno-warner-udio-universal-deals/); [metamusicmedia](https://metamusicmedia.com/blogs/news/ai-music-licensed-suno-udio-deals-split-down-the-middle)
- 2026 Suno timeline:
  - Aug 12: Suno signs BMG.
  - Aug 18: the judge denies adding 61,026 recordings to the first case.
  - Sept 1: Suno admits obtaining YouTube audio via yt-dlp.
  - Sept 8: Believe partnership.
  - Sept 9: v6 launches, "trained entirely from scratch" per Suno CPO Jack Brody.
  - Sept 18: UMG and Sony file a second complaint in Boston federal court.
  - Sept 30: fact discovery closes in the first case.

  — [Music Business Worldwide (second suit)](https://www.musicbusinessworldwide.com/universal-and-sony-sue-suno-for-a-second-time-claiming-platforms-v6-models-are-the-fruit-of-the-same-poisoned-tree/)
- The second suit covers 60,202 recordings. One report says it seeks up to ~$9B in statutory damages plus an injunction, with a jury trial demanded. — [Digital Music News](https://www.digitalmusicnews.com/2026/09/18/universal-music-suno-lawsuit-second/); [Hollywood Reporter](https://www.hollywoodreporter.com/music/music-industry-news/umg-sony-music-file-second-lawsuit-against-suno-1236705369/); [RuntimeWire](https://runtimewire.com/article/sony-umg-suno-v6-copyright-lawsuit)
- Suno confirmed v6 is trained on user-generated interactions. — [Bedroom Producers Blog](https://bedroomproducersblog.com/2026/09/26/suno-lawsuit/)
- Late-April 2026 reports said UMG/Sony–Suno settlement talks had hit an impasse. — [OpusClip blog](https://www.opus.pro/blog/ai-music-news-april-2026)
- On June 5, 2026 the American Federation of Musicians sued UMG and Warner over member recordings licensed into AI deals without compensation (secondary). — [Dubspot](https://blog.dubspot.com/ai-music-licensing-explained-2026)
- Suno downloads are tied to paid accounts; free-tier tracks are play-and-share (secondary). — [Dubspot](https://blog.dubspot.com/ai-music-licensing-explained-2026)
- Deezer reported ~90,000 AI-generated tracks per day arriving on its platform (July 2026). — [Music Business Worldwide](https://www.musicbusinessworldwide.com/universal-and-sony-sue-suno-for-a-second-time-claiming-platforms-v6-models-are-the-fruit-of-the-same-poisoned-tree/)
- ElevenLabs Eleven Music [launched Aug 2025, OLDER]:
  - Licensing deals with Merlin and Kobalt were in place before training; Kobalt artists opt in.
  - Output is cleared for commercial use, including social media, depending on subscription tier.
  - Sources disagree on whether self-serve plans exclude film, TV and games.

  — [YourStory](https://yourstory.com/ai-story/elevenlabs-eleven-music-ai-generator-launch); [etcentric](https://www.etcentric.org/?p=195108); [invideo](https://invideo.io/blog/elevenlabs-music-ai-generator/)
- ElevenLabs API: Music $0.15/min (commercial use on Starter plans and up); Sound Effects $0.12/min, royalty-free. — [ElevenLabs API pricing](https://elevenlabs.io/pricing/api)
- ElevenLabs v4 inline tags can also direct sound effects inside the speech render (trade press). — [Unite.AI](https://unite.ai/elevenlabs-launches-eleven-v4-with-low-latency-turbo-variant)

### Inferences
- Recommended stack for monetized output:
  - Background beds: ElevenLabs Music.
  - Whooshes, risers, impacts: ElevenLabs SFX.
  - Keep generation logs and plan-tier records as license evidence.
- Treat Suno as moderate risk. The Warner, BMG and Believe deals help, but UMG and Sony litigation explicitly targets v6, and the outcome could affect downstream use.
- Udio is likely unusable for export-based pipelines.
- Platform-native trending sounds (TikTok Commercial Music Library, YouTube Audio Library, Instagram audio) cannot be attached through most posting APIs, and business accounts have restricted libraries. Generated or licensed beds burned into the file are more automatable. This is an inference; I did not verify each platform's API.
- Content ID and fingerprint risk: AI tracks that resemble label catalog material could trigger claims. Prefer instrumental beds and avoid "in the style of [artist]" prompts.

### Gaps
- I did not research Stable Audio (Stability AI) current version, licensing or terms; it is not covered here.
- I did not verify Udio's current (Oct 2026) export policy or its relaunched-platform status from a primary source.
- I did not verify Suno's current ToS on output ownership for paid tiers, or whether v6 outputs carry any indemnity.
- I did not research YouTube Audio Library, TikTok CML or Instagram music library terms for automated or business accounts.
- I found no data on Content ID claim rates for AI-generated music.
