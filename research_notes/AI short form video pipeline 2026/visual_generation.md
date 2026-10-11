# Visual Generation for an Automated Faceless Short-Form Vertical Video Pipeline (state as of Oct 11, 2026)

> Research note: leaderboards change week to week and many pricing pages are reseller or affiliate blogs. Primary sources are Artificial Analysis, Google Gemini API docs, the OpenAI deprecations page, the Pexels API docs, the YouTube Help Center and fal.ai's own guide; they are marked where used. Everything else is secondary and flagged as such.

## 1. Text-to-video / image-to-video leaders: quality, audio, length, 9:16, consistency, API, price, terms, watermarking

### Takeaway
As of Oct 2026 the top of the quality leaderboards is held by Chinese labs (Alibaba Wan 3.0 / HappyHorse, ByteDance Seedance 2.0/2.5, MiniMax H3, Kling 3.0) and Google (Gemini Omni Flash, Veo 3.1). **OpenAI Sora 2 is OUTDATED: the app was shut down in April 2026 and the API on Sept 24, 2026, so drop it from any pipeline.** With budget no object, a sensible stack is Veo 3.1 / Gemini Omni Flash (Google API, native audio, SynthID), Seedance 2.5 (30 s clips, heavy multi-reference) and Kling 3.0 Omni (15 s multi-shot with character "Elements"), with Wan 3.0 / MiniMax H3 as quality and price challengers. All of them can be reached through aggregators such as fal.ai.

### Cited Findings

**Leaderboards (independent)**
- Artificial Analysis Text-to-Video (with audio) leaderboard, AA-Video-T2V v2.0. The page is undated ("Updated"), fetched Oct 11, 2026. Top 20 with Elo and price per minute of 1080p: 1 Wan 3.0 (Alibaba, Aug 2026) 1156, $12.00/min; 2 Utopai X (Utopai Studios, Sep 2026) 1149, no API; 3 Dreamina Seedance 2.5 (ByteDance Seed, Jul 2026) 1143, $34.12; 4 MiniMax H3 768p (Jul 2026) 1137, $4.80; 5 MiniMax H3 Max (Aug 2026) 1130; 6 FLUX 3 (Black Forest Labs, Jul 2026) 1128, $17.40; 7 Seedance 2.0 (Mar 2026) 1116, $22.45; 8 Gemini Omni Flash 1.1 (Google, Aug 2026) 1113, $9.12; 9 SkyReels V4 1074; 10 Agnes-Video-2.5 1057; 11 Grok Imagine Video 1.5 (SpaceXAI) 1045; 12 HappyHorse-1.1 (Alibaba-ATH) 1042; 13 Wan2.7 1030; 14 HappyHorse-1.0 1023; 15 Kling 3.0 Omni 1080p Pro 1015, $8.40; 16 Kling 3.0 1080p Pro 1000, $10.08; 17 Grok Imagine Video 1.5 Lite 993; 18 PixVerse V6 985, $6.90; 19 Veo 3.1 962, $24.00; 20 Veo 3.1 Fast 961, $7.20 — [Artificial Analysis T2V](https://artificialanalysis.ai/video/leaderboard/text-to-video)
- Artificial Analysis Image-to-Video (with audio), AA-Video-I2V v1.0: 1 MiniMax H3 Max 1195 ($4.80/min); 2 MiniMax H3 1181; 3 Vidu Q4 Preview (Oct 2026) 1179; 4 Gemini Omni Flash 1178 ($6.00/min); 5 Seedance 2.0 720p 1176; 6 HiDream-O1-Video-1.0 1175; 7 Wan 3.0 1164; 8 HappyHorse-1.1 1104; 9 Grok Imagine Video 1.5 1098; 10 MAGI-2 Preview (Sand.ai) 1093; 12 Veo 3.1 1082 ($24/min); 15 Veo 3.1 Lite 1071 ($4.80/min). Ranks 2–6 overlap statistically. Kling 3.0 sits at ranks ~19–21. **Runway, Luma Ray and Pika do not appear in the top 15** — [Artificial Analysis I2V](https://artificialanalysis.ai/video/leaderboard/image-to-video)
- Earlier snapshot, June 3, 2026: Seedance 2.0 #1 (1,216 Elo), HappyHorse 1.0 #2 (1,213), Sora 2 Pro 1,077 — [fal.ai, Best Text-to-Video APIs 2026](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- Conflicting arena: llm-stats' blind-vote arena (updated Oct 8, 2026) ranks Kling v3 first (score 1934), then Happy Horse 1.0 (1816) and Seedance 2.0 Fast (1747). The methodology differs from AA — [llm-stats](https://llm-stats.com/leaderboards/best-ai-for-video-creation)

**Google: Veo 3.1 and Gemini Omni Flash**
- Google's video docs now list **Gemini Omni Flash as the recommended default** video model ("fast, multimodal model for video generation and conversational video editing"). It takes text, image, audio and video inputs, supports character consistency, and does multi-turn editing (element replacement, perspective changes) via the Interactions API. Veo 3.1 is kept for native-audio generation, video extension, frame-specific / last-frame control and image-based direction — [Google Gemini API video docs](https://ai.google.dev/gemini-api/docs/video)
- Veo 3.1 official Gemini API per-second pricing, audio included: Standard $0.40 (720p/1080p), $0.60 (4K); Fast $0.10 (720p), $0.12 (1080p), $0.30 (4K); Lite $0.05 (720p), $0.08 (1080p), no 4K. No free tier. Per secondary sources, there is no charge if a safety filter or audio problem blocks output — [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (via search summary); [benchlm.ai](https://benchlm.ai/media-pricing/veo)
- Veo 3.1 on fal: $0.20/s without audio, $0.40/s with audio, $0.40–0.60 for 4K. 720p/1080p/4K at 24 fps. Modes are text, image, first/last frame, reference and extension. **About 148 s maximum via extensions** — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026). Single-clip limit is listed as 8 s by a secondary guide — [pinggy.io](https://pinggy.io/blog/best_video_generation_ai_models/)
- Gemini Omni Flash: preview June 30, 2026; about $0.10/s of 720p output; 10 s generations at launch; generated video includes speech, music and SFX; audio *references* not supported at launch. Token pricing is $1.50/1M input and $17.50/1M video-output tokens — [aiweekly](https://aiweekly.co/alerts/google-launches-gemini-omni-flash-and-nano-banana-2-lite); [eesel.ai](https://www.eesel.ai/blog/gemini-omni-flash-pricing). Gemini Omni 1.1 Flash added a 360p draft tier (~1/3 the cost) and renders up to 4K, with 720p still $0.10/s — [orcarouter](https://www.orcarouter.ai/blog/gemini-omni-1-1-flash-launch) (secondary; 1080p/4K reseller rates of ~$0.15/$0.30 are estimates, not official)
- "Veo 4": no source mentions it. Treat it as nonexistent as of Oct 2026 — [search summary of Gemini pricing sources](https://ai.google.dev/gemini-api/docs/pricing)

**OpenAI Sora 2: DISCONTINUED (outdated)**
- The OpenAI deprecations page (announced Mar 24, 2026) lists the Videos API, `sora-2`, `sora-2-pro` and all dated snapshots for **shutdown on 2026-09-24, with no replacement listed** — [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)
- Press reports put the Sora consumer app shutdown on April 26, 2026, less than six months after launch, citing compute demand and a shift in focus. The shutdown reportedly scuttled a $1B Disney partnership — [Engadget](https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html); [NYU Shanghai RITS](https://rits.shanghai.nyu.edu/ai/openai-shuts-down-sora-ai-video-app-discontinued-after-six-months/); [zilliz timeline](https://zilliz.com/ai-faq/what-is-the-sora-shutdown-timeline)
- Historical pricing, for reference only: Sora 2 Pro $0.30/s 720p, $0.50/s 1024×1792 (which was natively vertical), $0.70/s 1080p; up to 20 s — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026); [OpenRouter](https://openrouter.ai/openai/sora-2-pro)

**ByteDance Seedance 2.0 / 2.5**
- Seedance 2.5: consumer rollout Jul 31, 2026 via Jimeng/Doubao, with a June 23 enterprise preview. **Single-pass generation went from 15 s (2.0) to 30 s**, plus multi-round extension. References: up to 30 images, 10 videos and 10 audio clips (total ref video ≤30 s, ref audio ≤30 s) — [llm-stats](https://llm-stats.com/blog/research/seedance-2-5-launch); [apiframe](https://apiframe.ai/guides/seedance-2-5-guide)
- Seedance 2.5 API status is conflicting. One early-August check found it absent from BytePlus ModelArk ("coming soon"). A later post lists it as `doubao-seedance-2-5-260628` on ModelArk, limited to 480p/720p via API, and **reportedly not available in the United States per BytePlus**. Pricing is token-based (¥70/1M tokens without video input, ¥42/1M with) — [docs.apiyi.com](https://docs.apiyi.com/en/live/2026-08/seedance-2-5-launch.md); [leadde](https://leadde.ai/blog/how-much-is-seedance-2-5)
- Seedance 2.0 on fal: $0.3034/s (720p with audio), $0.682/s (1080p), native audio — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)

**Kling 3.0 (Kuaishou)**
- 3–15 s clips with native audio (multiple languages). The Omni variant adds a multi-shot storyboard (per-shot duration, framing, angle, camera move), Elements-style character references and start/end frame guidance — [atlascloud review](https://www.atlascloud.ai/blog/guides/kling-3.0-review-features-pricing-ai-alternatives); [vidmuse](https://vidmuse.ai/blog/kling-3-0-omni)
- Official Kling credit guide: 1080p costs 8 credits/s without audio and 12 credits/s with native audio — [Kling blog](https://kling.ai/blog/kling-video-3-0-credit-cost-guide)
- On fal: Kling V3 4K $0.42/s, 3–15 s — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026). Other fal prices from secondary sources conflict ($0.224/s audio off, $0.28–0.336/s audio on); one source's $0.029/s looks implausible — [search summary](https://fal.ai/learn/tools/ai-video-generators); [techsy](https://techsy.io/en/blog/best-ai-video-providers)

**Alibaba Wan / HappyHorse**
- Wan 3.0 (Aug 2026) is #1 on AA T2V at $12/min of 1080p — [Artificial Analysis](https://artificialanalysis.ai/video/leaderboard/text-to-video). One guide describes Wan 3.0 as "API only", meaning the open-weights tradition may not extend to 3.0 — [llm-stats](https://llm-stats.com/leaderboards/best-ai-for-video-creation) (unverified)
- Wan 2.7 on fal: $0.10/s (720p), $0.15/s (1080p), audio (audio-URL input supported) — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- HappyHorse 1.0 on fal: $0.14/s (720p), $0.28/s (1080p), native audio — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)

**MiniMax (Hailuo) H3**
- MiniMax H3 / H3 Max (Jul/Aug 2026) is #1–2 on AA image-to-video and #4–5 on T2V, at about $4.80/min of 1080p, the cheapest of the top tier — [Artificial Analysis I2V](https://artificialanalysis.ai/video/leaderboard/image-to-video). Listed on fal ("Recently Added") — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)

**Others with explicit 9:16 support**
- Grok Imagine Video (xAI/"SpaceXAI"): $0.05/s (480p), $0.07/s (720p), 6 s default, aspect ratios include **9:16**, native audio — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- LTX-2.3 Pro (Lightricks): $0.08/s 1080p up to $0.32/s 2160p, **9:16 and 16:9**, audio toggle — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- PixVerse V6: $0.06–0.115/s, 1–15 s, 360p–1080p, aspect ratios from square to 21:9 — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)

**Runway**
- Gen-4.5 is about 12 credits/s, at $0.01/credit on the API ≈ $0.12/s. Gen-4 Turbo is 5 credits/s. Veo 3.1 via Runway is 20 credits/s (no audio) or 40 (with audio). API and web credit balances are separate — [Creatify (secondary)](https://creatify.ai/blog/runway-pricing-(2026)-plans-credits-and-what-you-ll-actually-pay); [rgb.ir](https://rgb.ir/en/ai/gen-4-5/). No "Gen-5" found. Runway is absent from AA's I2V top 15 — [Artificial Analysis I2V](https://artificialanalysis.ai/video/leaderboard/image-to-video)

**Watermarking / provenance / platform labels**
- YouTube (from May 2026) auto-detects significant photorealistic AI content and labels it when it is undisclosed. Labels on content made with YouTube's own tools (Veo, Dream Screen) or carrying **C2PA metadata showing full AI generation are permanent and cannot be disputed**. YouTube says labels do not directly affect recommendations or monetization — [Tubefilter](https://www.tubefilter.com/2026/05/27/youtube-generative-ai-labels-easier-to-read-apply/); [c2paviewer](https://c2paviewer.com/articles/youtube-ai-labels-c2pa)
- TikTok has integrated C2PA Content Credentials (since Jan 2025) and auto-labels AI video. The "1.3B labeled" figure is from a secondary blog and unverified — [billo.app](https://billo.app/blog/ai-labeling/)
- Gemini-family models embed SynthID watermarks (secondary source) — [billo.app](https://billo.app/blog/ai-labeling/)

### Inferences
- For a fully automated vertical pipeline, Google's API (Veo 3.1 + Gemini Omni Flash) is the lowest-risk "Western" primary vendor: first-party API, published per-second pricing, native audio, extension to roughly 2.5 minutes, and multi-turn editing for fixing shots. Expect permanent AI labels on YouTube because of SynthID/C2PA. That is acceptable since labels reportedly don't affect reach.
- Seedance 2.5 offers the strongest raw-quality and reference-control combination (30 s, 30 image refs), but US availability, 720p API caps and data-residency concerns make it a secondary vendor to reach via an aggregator where it is legally offered.
- MiniMax H3 is the best quality per dollar on image-to-video (top I2V Elo at ~$4.80/min). It is a strong default for animating storyboard stills.
- The usual workflow is to generate keyframe stills with an image model, then use I2V (MiniMax H3 / Omni Flash / Seedance / Kling Omni) for shot-to-shot character consistency rather than pure T2V.
- Budget sanity check: a 45 s Short built from ~6–8 clips at $0.10–0.40/s costs about $5–20 in video generation, before retries.

### Gaps
- Exact max clip length and native 9:16 confirmation for Veo 3.1, Omni Flash, Seedance 2.5, Wan 3.0 and MiniMax H3. The official docs fetched didn't state them, and only fal confirmed 9:16 for Grok Imagine and LTX.
- Commercial-use terms and IP indemnity per vendor (Google, ByteDance, Kuaishou, Alibaba, MiniMax) were not researched from primary ToS.
- Luma (Ray3 or later) and Pika: no current 2026 specs or pricing found. Neither appears in AA top-15 I2V, which suggests they have fallen behind, but that is unconfirmed.
- Kling watermarking/C2PA and whether Chinese models embed C2PA: no source found.
- Utopai X (#2 T2V) has no API, and details are unknown.

## 2. Image models for stills/storyboards and consistency techniques

### Takeaway
OpenAI's GPT Image line (GPT Image 2 led the AA image arena in mid-2026; **GPT Image 2.5 "Flare"/"Sunburst" launched Sept 8, 2026**) and Google's Nano Banana family (Nano Banana 2 / Pro / 2 Lite) are the leaders. FLUX.2 (open weights, LoRA-friendly) and Nano Banana lead for character consistency. **gpt-image-1, gpt-image-1-mini and gpt-image-1.5 are being retired (Oct 23 / Dec 1, 2026)**, so pipelines must target gpt-image-2.5 IDs.

### Cited Findings
- The OpenAI deprecations page lists `gpt-image-1` shutdown on **Oct 23, 2026**, and `gpt-image-1-mini`, `gpt-image-1.5` and `chatgpt-image-latest` on **Dec 1, 2026**. Replacements are `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` — [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)
- GPT Image 2.5 (ChatGPT Images 2.5) was released Sept 8, 2026. Flare is the speed default and Sunburst the slower, more precise variant. Claimed improvements are better reference-photo fidelity, precise single-element edits, more reliable multi-turn consistency, and up to 50% lower latency than GPT Image 2 — [Wikipedia: GPT Image](https://en.wikipedia.org/wiki/GPT_Image); [ImagineArt](https://www.imagine.art/announcements/chatgpt-images-2-5). Some resellers said the API was not yet on fal/Replicate at launch — [muapi](https://muapi.ai/gpt-image-2.5)
- AA text-to-image arena as of June 2026: GPT Image 2 (high) #1 at Elo 1338, Nano Banana 2 at 1,260, Nano Banana Pro at 1,219. FLUX.2 variants (max/pro/flex/dev/klein) are listed — [fal.ai, Best Text-to-Image APIs 2026](https://fal.ai/learn/tools/best-text-to-image-apis-2026); [techsy](https://techsy.io/en/blog/best-ai-image-models) (secondary citations of AA; live AA image page not retrievable)
- Google launched "Nano Banana 2 Lite" alongside Gemini Omni Flash — [aiweekly](https://aiweekly.co/alerts/google-launches-gemini-omni-flash-and-nano-banana-2-lite)
- Character consistency test (May 2026): FLUX.2 and Gemini 3.1 Flash (Nano Banana) were strongest, gpt-image-2 third, Runway Gen-4 last — [techstackups](https://techstackups.com/comparisons/gemini-vs-openai-vs-flux-vs-runway-character-consistency-may-2026/). Nano Banana Pro was cited as strongest at preserving facial identity from a reference — [fast.io](https://fast.io/resources/best-ai-character-generators-2026/)
- Ideogram keeps character consistency from a single reference photo without training — [fast.io](https://fast.io/resources/best-ai-character-generators-2026/)
- Midjourney: V8 alpha opened Mar 17, 2026; **V8.2 has been the default since Jul 24, 2026**. **No official public API.** Aggregator "V8.1" endpoints are third-party wrappers. Midjourney video is still the separate V1 image-to-video product (June 2025) — [vidmuse](https://vidmuse.ai/blog/midjourney-8-2); [cometapi](https://www.cometapi.com/vi/what-is-midjourney-v8-when-will-it-be-released/); [atlascloud](https://www.atlascloud.ai/models/midjourney/v8.1/text-to-image)
- Black Forest Labs also has a video model, FLUX 3 (#6 on AA T2V, Jul 2026) — [Artificial Analysis](https://artificialanalysis.ai/video/leaderboard/text-to-video)

### Inferences
- Storyboard stack: Nano Banana Pro/2 or GPT Image 2.5 Sunburst for hero keyframes with a character reference sheet. FLUX.2 with a trained LoRA gives a recurring mascot or presenter look that is pixel-stable across hundreds of videos. Midjourney is unsuitable for unattended automation (no official API; ToS risk with wrappers).
- Consistency technique ranking for automation: (1) LoRA on open weights (FLUX.2 dev/klein) for a fixed character; (2) multi-reference image models (Nano Banana, GPT Image 2.5); (3) pass the same stills into I2V models with reference slots (Seedance 2.5's 30 refs, Kling Omni Elements, Omni Flash character consistency).

### Gaps
- Live AA text-to-image leaderboard (Oct 2026) couldn't be fetched (404), so it's unknown whether GPT Image 2.5 or a newer Nano Banana leads now.
- Ideogram's current version (3.x?) and pricing, FLUX.2 API pricing and Nano Banana per-image API prices were not verified.

## 3. AI avatars/presenters and lip-sync

### Takeaway
HeyGen (Avatar IV/V, available via API and on fal at ~$0.10/s, 9:16 supported) is the most consistently rated for lip-sync plus API automation. Synthesia is the enterprise option, and Hedra (Character-3) is a cheaper, high-precision lip-sync option whose API availability is disputed. Note that YouTube's July 2026 clarification reportedly makes **AI personas giving advice on sensitive topics non-monetizable**.

### Cited Findings
- HeyGen Avatar V on fal: $0.10 per second of output, 720p/1080p/4K, voice and lip-sync, aspect ratios **16:9, 9:16, 1:1, 4:5, 5:4** — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- HeyGen plans from $29/mo; Avatar IV has strong lip-sync and 175+ languages, with API access. The premium Avatar IV/V tier costs 20 credits/min vs 3 for Avatar III. Users report lip-sync degrades on tonal languages (Mandarin, Vietnamese) — [guptadeepak](https://guptadeepak.com/tools/top-5-ai-avatar-generators-2026/); [lipsync.com](https://lipsync.com/compare/heygen-vs-hedra) (secondary)
- Synthesia: lip-sync rated "Good", API access, enterprise positioning — [guptadeepak](https://guptadeepak.com/tools/top-5-ai-avatar-generators-2026/)
- Hedra Character-3: strong lip-sync across 15+ languages; one reviewer scores it 9/10 on precision at a lower price. Sources **conflict on whether Hedra has an API** — [lipsync.com](https://lipsync.com/compare/heygen-vs-hedra); [evolveamz](https://evolveamz.com/ai-ugc-video-ads-hedra-heygen-captions-2026/)
- Native-audio video models (Veo 3.1, Omni Flash, Kling 3.0, Seedance) generate speaking characters with lip-synced dialogue directly — [Google video docs](https://ai.google.dev/gemini-api/docs/video); [atlascloud Kling review](https://www.atlascloud.ai/blog/guides/kling-3.0-review-features-pricing-ai-alternatives)
- YouTube's July 2026 monetization clarification lists three non-monetizable "inauthentic" categories: generic/template videos, unsatisfying content, and **AI personas on sensitive topics** — [outlierkit](https://outlierkit.com/blog/youtube-updates-july-2026); [metricool](https://metricool.com/youtube-ai-content-rules-monetization/) (secondary; TechCrunch July 20 cited second-hand)

### Inferences
- For a "faceless" channel, a consistent HeyGen avatar or a native-audio Veo/Kling character can act as a recurring host. Avoid finance, health and news advice personas, which fall under the reported July 2026 rule.
- If you only need lip-sync on generated stills, Hedra or the native-audio I2V models may beat a dedicated avatar product on cost.

### Gaps
- Captions (Mirage) API and lip-sync quality: no reliable source found.
- Official HeyGen/Synthesia API per-minute pricing (outside fal) not verified. Standalone lip-sync APIs (e.g., Sync Labs) not researched.

## 4. "Brainrot" split-screen gameplay backgrounds: copyright and platform originality status

### Takeaway
Reusing third-party gameplay (Minecraft parkour, Subway Surfers, GTA) is legally gray and **increasingly a monetization risk**. YouTube's inauthentic-content policy (renamed July 2025, clarified July 2026) targets template-like, mass-produced videos at the channel level, and reused-content rules require a "meaningful difference". Safer options are self-recorded gameplay (with publisher video policies honored) or AI-generated or licensed satisfying loops.

### Cited Findings
- YouTube Help Center: inauthentic content is "mass-produced or repetitive content", including "content that looks like it's made with a template with little to no variation across videos". The policy applies to the **channel as a whole**. It was renamed from "repetitious content" on July 15, 2025 — [YouTube Help](https://support.google.com/youtube/answer/1311392?hl=en)
- The reused content policy (clips, compilations, reactions) is unchanged. Reuse is allowed "if viewers can tell that there's a meaningful difference between the original video and your video" (commentary, storyline, educational value) — [YouTube Help](https://support.google.com/youtube/answer/1311392?hl=en)
- The July 2026 clarification adds the categories generic/template videos, unsatisfying/off-putting content, and AI personas on sensitive topics. Reviewers judge the channel as a whole, and AI use per se is not banned — [outlierkit](https://outlierkit.com/blog/youtube-updates-july-2026); [metricool](https://metricool.com/youtube-ai-content-rules-monetization/); [stuff.co.za](https://stuff.co.za/2026/07/21/youtube-cracks-down-on-ai-slop-with-new-revenue/)
- Minecraft usage guidelines (via a third-party summary): creators may monetize videos of *their own* gameplay via ads, but may not use Minecraft assets in videos to sell unrelated products (2016 rule) — [ConductAtlas](https://conductatlas.com/platform/minecraft/minecraft-usage-guidelines/video-content-monetization-carve-out/); [Mobile Marketing Magazine](https://mobilemarketingmagazine.com/minecraft-ban-brands-from-building-ads-with-its-blocks/)
- Unverified: an AIR Media-Tech timeline claims a YPP overhaul announced Aug 10, 2026 (effective Feb 1, 2027) — [air.io](https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline)

### Inferences
- Downloading someone else's parkour or Subway Surfers capture is reuse of a third party's recording, so it is exposed to Content ID claims plus the reused-content policy. Your own Minecraft recordings are allowed for ad monetization under Mojang's guidelines, but a fixed "voiceover + parkour" template across many uploads fits the "template with little variation" definition of inauthentic content.
- Mitigation: vary backgrounds per video. Generate unique "satisfying" loops with I2V or T2V models (cheap tiers like Veo 3.1 Lite, Grok Imagine, LTX) or self-record. Make the foreground narrative and visuals carry the "meaningful difference".

### Gaps
- No primary source found on Subway Surfers (SYBO) or GTA (Rockstar/Take-Two) video monetization policies, or on TikTok/Instagram "unoriginal content" treatment of split-screen gameplay specifically.
- No official YouTube page found for the July 2026 clarification; only secondary coverage.

## 5. Licensed stock / b-roll APIs

### Takeaway
Pexels is free with a usable API (200 req/hr, 20k/mo, attribution required in-app) and is fine for filler. Storyblocks offers unlimited-download subscriptions with an API, but has reported Content ID false claims. Shutterstock/Getty are per-download and expensive at volume. API pricing for enterprise stock was not publicly found.

### Cited Findings
- Pexels API: free; default **200 requests/hour, 20,000/month** (higher on request with demo of attributed use). You must show a prominent link back to Pexels and credit photographers where possible. You may not replicate core Pexels functionality. Video search endpoint `GET https://api.pexels.com/v1/videos/search` with `orientation` filter (use portrait for 9:16) and `per_page` max 80. The old `/videos/` path is deprecated — [Pexels API docs](https://www.pexels.com/api/documentation/)
- Pexels license: free commercial use, no attribution required on the content itself; you cannot sell or redistribute unmodified clips — [licenseorg](https://licenseorg.com/compare/pexels-video-vs-storyblocks); [jupitrr](https://jupitrr.com/best/b-roll-tools)
- Storyblocks: ~$15–35/mo tiers for unlimited downloads (figures conflict across sources). An API exists, pricing not public. **There are documented Content ID claims against validly licensed Storyblocks clips**, so get written confirmation for monetized use — [TrustRadius](https://tr-web.dev.trustradius.com/compare-products/shutterstock-vs-storyblocks); [jupitrr](https://jupitrr.com/best/b-roll-tools)
- Shutterstock: per-download costs compound at volume. The team plan is $379/mo for 750 images, and video/API pricing was not found — [thegtmdirectory](https://thegtmdirectory.com/compare/shutterstock-vs-storyblocks); [TrustRadius](https://tr-web.dev.trustradius.com/compare-products/shutterstock-vs-storyblocks)

### Inferences
- With budget no object, generative b-roll (MiniMax H3 / Veo 3.1 Lite at ~$0.05–0.08/s) is often cheaper per *exactly matching* shot than stock search plus licensing, and avoids Content ID collisions with other channels using the same stock clips. Pexels remains useful for real-world establishing shots.

### Gaps
- Getty Images / Shutterstock generative AI APIs (indemnified generators) and their 2026 pricing were not researched.
- Storyblocks API and Shutterstock video API pricing and terms were not found publicly.

## 6. Aggregator APIs (fal.ai, Replicate, etc.)

### Takeaway
fal.ai is the de facto one-key aggregator for generative media: Veo 3.1, Kling V3, Seedance 2.0, Wan 2.7, HappyHorse, MiniMax H3, Grok Imagine, LTX, PixVerse, HeyGen Avatar V, plus image models, with per-model per-second pricing. Replicate (acquired by Cloudflare, per secondary sources) is the alternative. Aggregator prices sometimes differ from first-party ones (e.g., Veo 3.1 with audio at $0.40/s on both).

### Cited Findings
- fal's guide (June 26, 2026) lists per-second fal pricing for Seedance 2.0, HappyHorse 1.0, Veo 3.1, Sora 2 Pro (now dead), PixVerse V6, Grok Imagine, LTX-2.3 Pro, Kling V3 4K, Wan 2.7 and HeyGen Avatar V. MiniMax H3 models appear under "Recently Added" — [fal.ai](https://fal.ai/learn/tools/best-text-to-video-apis-2026)
- fal bills each model on its own unit, shown on the model page and at fal.ai/pricing — [fal docs](https://fal.ai/docs/documentation/model-apis/pricing)
- fal reportedly offers 600+ models under one key. Cloudflare acquired Replicate in Dec 2025 and Replicate pricing was unchanged by mid-2026. Replicate video routes run ~$0.07–0.25/s — [techsy (secondary)](https://techsy.io/en/blog/best-ai-video-providers)
- Other resellers (Atlas Cloud, EvoLink, muapi, CometAPI, OpenRouter) also expose Kling, Seedance and Midjourney wrappers — [atlascloud](https://www.atlascloud.ai/blog/tips/best-ai-video-generation-models-2026); [OpenRouter](https://openrouter.ai/openai/sora-2-pro)

### Inferences
- Architecture: route through fal for breadth and fast model swaps as leaderboards churn monthly. Keep direct Google (Gemini API / Vertex) for Veo/Omni Flash to get first-party SLAs and Omni Flash's multi-turn editing, which may lag on aggregators. Avoid unofficial wrappers (Midjourney) for ToS reasons.

### Gaps
- No primary source confirmed the Cloudflare–Replicate deal or fal's model count and funding in this pass.
- Whether fal now hosts Seedance 2.5, Wan 3.0, Gemini Omni Flash or GPT Image 2.5, and at what prices, was not confirmed.
