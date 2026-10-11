# Video Assembly, Orchestration and Publishing for an Automated Faceless Short-Form Pipeline (state as of Oct 2026)

Scope note: about 22 tool calls. Primary sources fetched: YouTube Data API revision history, TikTok Direct Post reference, Meta Instagram content-publishing docs and content_publishing_limit reference, Remotion Lambda limits, and GitHub repo metadata (live star counts pulled 2026-10-11 through the GitHub search API). Pricing for third-party SaaS mostly comes from vendor or affiliate comparison blogs and is flagged as such. Anything I know only from training data (cutoff mid-2026) and could not re-verify is placed under "Inferences" and labelled "(prior knowledge, unverified)", or listed under "Gaps".

## 1. Composition frameworks (Remotion, ffmpeg, MoviePy 2.x, Shotstack/Creatomate/JSON2Video, Editly, Revideo/Motion Canvas)

### Takeaway
For a budget-no-object, high-polish faceless pipeline, Remotion (React, code-first, scales out on AWS Lambda) is the de facto programmatic compositor in 2026, and coding agents can now drive it directly through the official "Remotion Skills". Automated use requires the paid "Automators" license ($0.01/render, $100/mo minimum). Hosted JSON-template APIs (Shotstack, Creatomate, JSON2Video) trade flexibility for zero infrastructure. MoviePy 2.x and raw ffmpeg are still the Python-native default used by most open-source "money printer" repos. Revideo's independent future is uncertain.

### Cited Findings
**Remotion**
- Repo remotion-dev/remotion: ~63.3k stars, TypeScript, actively updated (2026-10-11) — [GitHub](https://github.com/remotion-dev/remotion)
- License tiers (official pricing page as summarized by search): Free for individuals, for-profit companies of up to 3 people, and non-profits. "Remotion for Creators" costs $25/mo per seat for low-volume coding/prompting use. "Remotion for Automators" costs $0.01 per render with a $100/mo minimum, aimed at companies building automated video creation (prompt-to-video apps etc.), and automation developers don't need seats. Enterprise starts at $500/mo — [Remotion pricing](https://www.remotion.dev/docs/pricing); [License FAQ](https://www.remotion.dev/docs/license/faq)
- The FAQ says a programmatic rendering automation needs purchased Renders. "1 Render is the successful generation of a video, audio, GIF, PDF or still image" — [License FAQ](https://www.remotion.dev/docs/license/faq)
- LICENSE.md says "In Remotion 5.0, the license will slightly change". I found no published details of the change — [GitHub LICENSE](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
- AWS Lambda costs are billed separately on top of the Remotion license — [Spotsaas review](https://www.spotsaas.com/blog/remotion-review) (secondary)
- Lambda limits: function timeout of at most 15 min, up to 10 GB RAM, up to 10 GB disk, default concurrency of 1000 concurrent executions per region per account. Increases go through AWS Service Quotas or `npx remotion lambda quotas increase` (root accounts only) — [Remotion Lambda limits](https://www.remotion.dev/docs/lambda/limits)
- "Remotion Skills" (`npx skills add remotion-dev/skills`) teaches coding agents such as Claude Code Remotion's conventions so they can turn natural-language descriptions into renderable React video code. A third-party guide dates the release to January 2026 — [Timewell](https://timewell.jp/en/columns/remotion-claude-code-programmatic-video); [gaga.art](https://gaga.art/blog/?p=1287) (secondary)
- One practitioner's view: Remotion suits data viz, explainers and UI demos better than traditional editing or heavy effects — [ZeroFutureTech Substack](https://zerofuturetech.substack.com/p/generate-videos-with-claude-code) (opinion)
- gyoridavid/short-video-maker (~1.4k stars) is an MCP server plus REST API that builds TikTok/Reels/Shorts videos on Remotion. It shows the "agent calls a video-composition tool" pattern — [GitHub](https://github.com/gyoridavid/short-video-maker)

**MoviePy 2.x**
- Zulko/moviepy: ~15.0k stars, active. The v2.0 upgrade introduced "major breaking changes" (a migration guide exists), and v1 is no longer maintained — [GitHub](https://github.com/Zulko/moviepy)
- Renamed API in 2.x (e.g., `subclipped`, `with_volume_scaled`, `TextClip(font=...)`). Python 3.9+ is required. FFmpeg/ImageMagick paths are set through env vars — [CERN PyPI mirror](https://simple-repository.app.cern.ch/project/moviepy); [v2.0.0.dev1 release](https://github.com/Zulko/moviepy/releases/tag/v2.0.0.dev1)
- Latest PyPI release found: 2.2.1 (May 21, 2025). No 2026 release was found, so release cadence is slow — [PyPI](https://pypi.org/project/moviepy)
- Note: many older repos and tutorials (MoneyPrinter, ShortGPT-era code) use the MoviePy 1.x API and break on 2.x — inferred from the breaking-change note above.

**Hosted JSON/template render APIs**
- Shotstack: about $0.40/rendered minute pay-as-you-go ($10 minimum), falling to about $0.20/min on plans from $39/mo. 1 credit = 1 rendered minute regardless of resolution. 10 free credits — [Wireflow Shotstack pricing](https://www.wireflow.ai/blog/shotstack-pricing) (vendor-comparison blog); another source cites $49 for 200 min of 720p (~$0.25/min) — [Motionbox](https://motionbox.io/blog/best-editframe-alternatives-in-2026). These figures conflict.
- Creatomate: Essential plan reported at $54/mo for 2,000 credits, about $0.10–$0.84/min depending on resolution and fps, with no credit rollover — [Wireflow](https://www.wireflow.ai/blog/creatomate-vs-shotstack); Creatomate's own comparison page cites a $41 Essential tier, which conflicts — [Creatomate](https://creatomate.com/compare/shotstack-alternative)
- JSON2Video: 1 credit = 1 second of Full HD, 600 free credits. One roundup calls it the lowest-cost entry for simple automation — [Wireflow JSON2Video alternatives](https://www.wireflow.ai/blog/best-json2video-alternatives-in-2026)

**Editly**
- mifi/editly: ~5.5k stars, a declarative CLI/API on top of ffmpeg with OpenGL transitions and subtitles. It has 80 open issues and is updated less often than Remotion — [GitHub](https://github.com/mifi/editly)

**Revideo / Motion Canvas**
- motion-canvas/motion-canvas: ~19.3k stars, active — [GitHub](https://github.com/motion-canvas/motion-canvas)
- Revideo is a Motion Canvas fork that exposes headless rendering as a function call (Motion Canvas needs a UI button press to render) — [Revideo docs](https://docs.re.video/)
- Revideo's founder (Konstantin Hohr) now runs Midrender, an AI-powered visual motion-graphics editor (YC) — [YC Midrender](https://www.ycombinator.com/companies/midrender)
- A single source says that "as of 2026" Revideo "has folded into Midrender" and that its roadmap now follows a commercial product. This is unconfirmed by Revideo or Midrender — [Wireflow Remotion alternatives](https://www.wireflow.ai/blog/best-remotion-alternatives-in-2026)
- @revideo/core is reported at ~3K weekly downloads (unverified) — [PkgPulse](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026)
- The redotvideo/revideo repo did not appear in a GitHub repo search by exact name on 2026-10-11, while every other requested repo did. It may have been renamed, transferred or made private, so this is a status flag — [GitHub search API, queried 2026-10-11]

### Inferences
- Captions: word-level animated "karaoke" captions (the dominant faceless style) are easiest in Remotion (React components driven by a word-timestamp JSON, e.g. from Whisper/ElevenLabs alignment) and hardest in raw ffmpeg (ASS subtitles via libass work, but complex per-word animation means generating ASS override tags). MoviePy 2.x TextClip rendering per word is slow at scale. (prior knowledge, unverified)
- Zooms, Ken Burns and overlays: ffmpeg `zoompan`/`overlay` filters are fast and cheap but brittle to author. Remotion `interpolate()`/`spring()` give frame-accurate, testable animation. Hosted APIs offer preset transitions and effects but limited custom motion. (prior knowledge, unverified)
- Scale: Remotion Lambda splits a render into chunks across many functions. The 15-min, 10 GB caps are irrelevant for 15–90 s Shorts, so the binding constraints become concurrency (1000/region default) and the Remotion per-render fee ($0.01, which is negligible). For "budget no object", Remotion + Lambda (or Remotion on your own GPU/CPU fleet via `@remotion/renderer`) is the strongest choice. ffmpeg stays useful for final encode, loudness normalization (`loudnorm` to about -14 LUFS), and platform-specific transcodes.
- Recommended hybrid: an LLM or agent emits a typed "edit decision list" JSON (scenes, assets, word timings, caption style), Remotion renders it, and ffmpeg post-processes. This keeps the agent's output declarative and validatable.

### Gaps
- No official 2026 pricing page text could be rendered for Remotion (the page is a JS component). Tiers come from search snippets of the official page.
- Remotion 5.0 license change details: not found.
- No independent benchmark of render speed or cost per 60 s vertical video across Remotion Lambda, Shotstack, Creatomate and MoviePy.
- Editly's latest release date and maintenance status were not verified.
- Whether Revideo is still maintained as OSS: unconfirmed.

## 2. Orchestration: workflow engines, agent frameworks, human-in-the-loop, quality gates, cost tracking

### Takeaway
The 2026 consensus pattern is a durable-execution engine (Temporal for strict guarantees and polyglot workers, Inngest or Trigger.dev for TypeScript-first teams) as the backbone, with LLM agents placed inside individual steps (scripting, asset selection, QA) rather than an agent "free-running" the whole pipeline. Large media payloads must live in object storage, not in workflow history. I found no strong primary sources on vision-model QA of rendered video or on cost tracking specific to video pipelines.

### Cited Findings
- Temporal: exactly-once semantics and workflows that can run indefinitely. The main cost is operational (self-hosted multi-service cluster, or Temporal Cloud). Large LLM payloads cause "workflow history saturation", worked around with payload codecs — [Noqta](https://noqta.tn/blog/durable-execution-ai-agents-inngest-trigger-temporal-2026); [Render article](https://render.com/articles/durable-workflow-platforms-ai-agents-llm-workloads.md) (secondary)
- Inngest: event-driven step functions, with an OSS dev server and a managed cloud. Said to serve "the 90 percent of AI workflow cases" without Temporal's ops overhead (vendor-style claim). It gets awkward for long imperative graphs with deep branching — [Noqta](https://noqta.tn/blog/durable-execution-ai-agents-inngest-trigger-temporal-2026); [Dailyaiworld](https://dailyaiworld.com/blogs/temporal-vs-triggerdev-vs-inngest-ai-workflows-2026)
- Trigger.dev v3: TypeScript tasks that can run for hours, with per-step retries and realtime progress streaming to a frontend. It is TypeScript-only — [Devtoollab](https://devtoollab.com/ai-tools/trigger-dev); [AutomationAtlas](https://automationatlas.io/tools/trigger-dev/)
- Spheron's write-up looks at Temporal/Inngest/Restate for agent workloads that dispatch GPU jobs (relevant to calling video-generation models) — [Spheron](https://www.spheron.network/blog/ai-agent-workflow-orchestration-temporal-inngest-restate-gpu-cloud/)
- Agent-tool pattern for video: short-video-maker exposes video creation as an MCP server, so an agent (Claude, or n8n's AI agent node) can call "create short" as a tool — [GitHub](https://github.com/gyoridavid/short-video-maker)
- MoneyPrinterTurbo now advertises WebUI, API, CLI and an "AI Agent" interface — [Verdent guide](https://www.verdent.ai/guides/moneyprinterturbo-github) (secondary)
- Human-in-the-loop at the platform layer: TikTok's Upload (draft/inbox) mode puts the video in the creator's TikTok inbox for manual finalization, which Vorp Labs suggests fits agent-generated content — [Vorp Labs](https://vorplabs.com/agent-tools/tiktok-content-posting-api). Instagram "Trial Reels" with `graduation_strategy=MANUAL` or `SS_PERFORMANCE` act as a built-in A/B gate shown only to non-followers — [Meta content publishing](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing)

### Inferences
- Engine choice: Python-heavy pipelines (MoviePy, Whisper, model SDKs) map best onto Temporal (Python SDK) or Prefect. Remotion-centric TypeScript stacks map onto Trigger.dev or Inngest. n8n/Make suit low-code prototyping and are common in "faceless channel" tutorials but get fragile at scale. (prior knowledge, unverified)
- Agent frameworks (prior knowledge, unverified as of Oct 2026): Claude Agent SDK (the Claude Code harness as a library, with tools, subagents, MCP, hooks and skills; it pairs naturally with Remotion Skills), OpenAI Agents SDK (handoffs, guardrails, tracing), and LangGraph (explicit state graphs with checkpointing and `interrupt()` for human approval). For production, run agents as activities/steps inside the durable engine so that retries, timeouts and cost caps are enforced outside the LLM.
- HITL design: put approval gates (a) after the script/storyboard (cheap to change) and (b) after render, before publish. Use Slack/Telegram approve buttons that signal the workflow (a Temporal signal or Inngest `waitForEvent`). TikTok draft mode and IG Trial Reels give platform-native safety valves.
- Vision-model QA gates: sample frames (e.g., 1–2 fps plus scene-cut frames) and run them through a multimodal model (Gemini, which accepts video natively, or Claude/GPT on frame strips) with a rubric. The rubric should cover caption legibility and safe zones (avoid the bottom ~20% and right-edge UI on TikTok/Reels), text/audio sync, artifacting in AI-generated clips, brand/NSFW safety, and the first-2-second hook. Add deterministic checks too: ffprobe for 1080x1920, fps, duration under the platform max, and loudness, plus a Whisper re-transcription diffed against the script for caption accuracy. (prior knowledge, unverified; no primary source found)
- Cost tracking: tag every step with provider, units and cost (LLM tokens, TTS characters, video-gen seconds, Remotion renders at $0.01, Lambda GB-s) and roll them up per video ID. Observability tools such as Langfuse or LangSmith cover LLM calls but not media APIs, so a custom ledger table is typical.

### Gaps
- No primary-source documentation was fetched for Claude Agent SDK, OpenAI Agents SDK, LangGraph, Prefect or n8n in this pass.
- No published case study or benchmark of vision-LLM QA on rendered short-form video was found.
- No primary pricing for Temporal Cloud, Inngest or Trigger.dev was retrieved.

## 3. Publishing APIs and third-party schedulers

### Takeaway
All three native APIs are free but gated. YouTube uploads became roughly 16x cheaper in quota (about 100 units, down from about 1,600, since Dec 4, 2025) and moved to a dedicated quota bucket on June 1, 2026. TikTok direct posting is forced to private visibility until the app passes an audit. Instagram Reels publish through a container → publish flow capped at 50 or 100 API posts per 24 h, and Meta's own docs conflict on which. Schedulers (Ayrshare, Blotato, Buffer, Upload-Post) wrap all of these behind one API and absorb the audit and app-review burden.

### Cited Findings
**YouTube Data API v3**
- Dec 4, 2025: video upload quota cost dropped from about 1,600 units to about 100 units. Many 2026 guides still quote 1,600, which is outdated — [YouTube API revision history](https://developers.google.com/youtube/v3/revision_history)
- June 1, 2026: moved to granular quota buckets. `videos.insert` and `search.list` get their own buckets, all other methods stay in the existing one, and increases go through the Quota Extension Form — [Revision history](https://developers.google.com/youtube/v3/revision_history)
- One secondary source describes uploads as a separate default bucket of about 100 calls/day, with the general 10,000 units/day pool for other endpoints — [Blotato YouTube API pricing](https://www.blotato.com/blog/youtube-api-pricing) (secondary; verify in Cloud Console). bundle.social advises checking each project's quota page because migration may differ by project — [bundle.social](https://bundle.social/blog/youtube-api-quota-exceeded-limits-fixes)
- July 7, 2026: new `brandPartner` part on `videos.insert`/`update`/`list`. Sept 2026: thumbnail max size raised from 2 MB to 50 MB, and fhd/qhd/uhd thumbnail sizes added — [Revision history](https://developers.google.com/youtube/v3/revision_history)
- Mar 31, 2025: Shorts views count every start or replay. Aug 27, 2026: public view counting aligned across long-form, Live and Shorts ("count public views the moment a video begins to play"), while monetization stays tied to engaged metrics — [Revision history](https://developers.google.com/youtube/v3/revision_history)
- The `containsSyntheticMedia` (AI disclosure) property on videos was added Oct 30, 2024. There were no further disclosure-related API changes in 2025–2026 — [Revision history](https://developers.google.com/youtube/v3/revision_history)
- There is no separate "Shorts upload" endpoint. Shorts are standard `videos.insert` uploads that are vertical or square and within the Shorts length limit. (No 2026 primary confirmation was fetched; see Gaps.)

**YouTube monetization policy (affects automated faceless channels)**
- July 2025: "repetitious content" was renamed "inauthentic content" (mass-produced, repetitive, spammy), framed as a clarification. AI content is not banned if it is original and disclosed — [Creator Handbook](https://www.creatorhandbook.net/youtube-updates-monetization-policy-for-inauthentic-content/); [Storyboard18](https://www.storyboard18.com/amp/digital/no-new-rules-just-clearer-language-youtube-updates-monetisation-guidelines-74549.htm)
- July 20–21, 2026: YouTube clarified three demonetizable categories. (1) Repetitive content that is easy to produce with AI, CGI or templates, which YouTube's Halprin called "very generic". (2) Off-putting content made to emotionally manipulate (e.g., staged animal rescues). (3) AI personas hosting instead of the creator, which YouTube especially doesn't want covering finance, legal or medical topics — [Stuff](https://stuff.co.za/2026/07/21/youtube-cracks-down-on-ai-slop-with-new-revenue/); original report: [TechCrunch](https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/)

**TikTok Content Posting API**
- Flow: `creator_info/query` (mandatory, to render privacy options) → `POST /v2/post/publish/video/init/` (scope `video.publish`) → upload. The source is either `PULL_FROM_URL` (requires a verified URL prefix or domain, otherwise `url_ownership_unverified`) or `FILE_UPLOAD` (chunked PUT to `upload_url` within 1 hour, as mp4/quicktime/webm) — [TikTok Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post) (last updated Aug 24, 2026)
- Rate limit: 6 requests/min per user access token (HTTP 429). There is a daily post cap per creator (`spam_risk_too_many_posts`) and a daily active-publishing-user cap per client (`reached_active_user_cap`), but no numeric values are published — [TikTok Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post)
- Unaudited clients: all content is restricted to private viewing, and they can post only to private accounts (403 `unaudited_client_can_only_post_to_private_accounts`). An audit for Terms of Service compliance lifts the restriction — [TikTok Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post); [Content Sharing Guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines)
- `privacy_level` must be one of the creator's returned options (`PUBLIC_TO_EVERYONE`, `MUTUAL_FOLLOW_FRIENDS`, `FOLLOWER_OF_CREATOR`, `SELF_ONLY`). The UI must show these options and honor the user's choice — [TikTok Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post)
- `is_aigc=true` labels the post "Creator labeled as AI-generated". `brand_content_toggle` and `brand_organic_toggle` flag commercial content — [TikTok Direct Post reference](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post)
- Third-party claims (unverified): unaudited apps are limited to 5 users posting per 24 h — [Postiz docs](https://docs.postiz.com/providers/tiktok.md); audits take an estimated 2–6 weeks — [Phyllo](https://www.getphyllo.com/post/tiktok-api-integration-guide-2026-setup-endpoints-common-pitfalls); unaudited integrations can "return success on every call" while silently posting private — [bundle.social](https://bundle.social/blog/tiktok-api-approval); sandbox apps can post to up to 10 accounts — [Blotato TikTok API](https://www.blotato.com/blog/tiktok-api-pricing)
- The Upload (draft) alternative sends the video to the creator's TikTok inbox as a draft for manual posting — [Vorp Labs](https://vorplabs.com/agent-tools/tiktok-content-posting-api)
- The TikTok API has no paid tier or per-call fee — [Blotato](https://www.blotato.com/blog/tiktok-api-pricing)

**Instagram Graph API (Reels)**
- Flow: `POST /<IG_ID>/media` with `media_type=REELS` and either `video_url` (public) or `upload_type=resumable` (Facebook Login for Business only) → upload to `rupload.facebook.com/ig-api-upload/<container_id>` → poll `status_code` (IN_PROGRESS/FINISHED/PUBLISHED/ERROR/EXPIRED after 24 h, polling once per minute for at most 5 min) → `POST /<IG_ID>/media_publish` — [Meta content publishing](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing)
- Permissions: with Instagram Login, `instagram_business_basic` and `instagram_business_content_publish`. With Facebook Login, `instagram_basic`, `instagram_content_publish` and `pages_read_engagement`. Page Publishing Authorization must be complete where it applies — [Meta content publishing](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing)
- Trial Reels via `trial_params.graduation_strategy` (MANUAL or SS_PERFORMANCE) are shown only to non-followers — [Meta content publishing](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing)
- Publishing cap conflict: the content-publishing guide says 100 API-published posts per rolling 24 h — [Meta guide](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing); the `content_publishing_limit` reference says `quota_total` is "currently 50" with `quota_duration` 86400 s — [Meta reference](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit). The guide's carousel section also says 50. Query the endpoint at runtime instead of hard-coding either number.
- A published Reel returns `media_type=VIDEO`. Use `media_product_type` to identify it as a Reel — [Meta content publishing](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/content-publishing)

**Third-party schedulers and unified APIs (pricing mostly from competitor blogs, so verify)**
- Ayrshare: from $149/mo, billed per active social profile. Tiers reported as $149 Premium, $299 Launch, $599 Business, plus $8.99/profile/mo on Business. It is the most mature multi-tenant API (profiles map to end-users) — [Ayrshare pricing](https://www.ayrshare.com/pricing.md); [Blotato on Ayrshare pricing](https://www.blotato.com/blog/ayrshare-pricing) (competitor). Ayrshare also publishes guidance on YouTube 10k-unit quota workarounds — [Ayrshare](https://www.ayrshare.com/solutions/how-to-bypass-the-youtube-10k-unit-limit-fixing-the-403-quota-exceeded-error.md)
- Buffer: API available even on the free plan (1 API key free, 5 on paid). Covers 11 channels including TikTok, YouTube and Instagram. Essentials costs about $6/channel/mo — [Buffer](https://buffer.com/resources/social-media-api-multi-platform-posting/); [The GTM Directory](https://thegtmdirectory.com/compare/ayrshare-vs-buffer)
- Blotato: Starter at $29/mo with 20 social accounts and 1,250 AI credits. The API is on paid plans only, and the 7-day trial excludes it — [Ryan Doser](https://ryandoser.com/blotato-vs-buffer/); [Blotato TikTok API](https://www.blotato.com/api/tiktok)
- Others: Upload-Post (free tier of 10 uploads/mo, TikTok needs a paid plan), Outstand (~$0.01/post), Post for Me ($10/mo for 1,000 posts) — [Upload-Post comparison](https://www.upload-post.com/best-social-media-apis) (vendor). Postiz (open-source scheduler) documents TikTok constraints — [Postiz](https://docs.postiz.com/providers/tiktok.md)

### Inferences
- With uploads at about 100 units in their own bucket, quota is no longer the constraint for a handful of channels. YouTube spam and inauthentic-content enforcement (channel-level) is now the real limit on posting volume.
- For "budget no object": use native APIs per platform for control (YouTube is straightforward; IG needs Meta App Review; TikTok needs the audit to post publicly). Keep a unified scheduler (Ayrshare, for its multi-profile model) as a fallback or for faster launch. Using a scheduler effectively borrows its audited TikTok app.
- Always set AI-disclosure flags (`is_aigc` on TikTok, `containsSyntheticMedia` on YouTube) for AI-generated faceless content, given the 2026 YouTube policy clarifications.
- Later's API and scheduling for Reels were not verified (see Gaps).

### Gaps
- Official 2026 Shorts max duration and spec page were not fetched. Prior knowledge (unverified): Shorts were extended to 3 min in Oct 2024. Platform specs (TikTok max length and size, Reels duration) were not verified from primary sources here.
- The Later API and Buffer's 2026 API scope (whether it supports direct video publishing to TikTok/Reels) were not verified from official docs.
- TikTok numeric daily post caps are unpublished.
- Exact current default YouTube upload-bucket size is from a secondary source only.

## 4. End-to-end AI short-video platforms (build vs buy)

### Takeaway
Coverage of Revid, Crayo, Faceless.video, AutoShorts, InVideo AI and Pictory in 2026 was thin and dominated by affiliate reviews. I could not verify feature or pricing specifics from primary sources. OpusClip remains the reference tool for long-to-short repurposing, and YouTube itself now ships free Veo-based generation inside Shorts. Combined with YouTube's July 2026 "inauthentic content" clarification, that erodes the moat of template-driven faceless SaaS.

### Cited Findings
- OpusClip: turns long videos into shorts with virality scoring. Free tier of 60 credits/mo with watermark. One reviewer measured ~94% auto-caption accuracy but noted awkward clip start/end points. The 2026 version adds better speaker detection, 20+ caption languages and scheduler integrations. Paid plans run about $15–$19.43/mo — [Marc Andrews review](https://marcandrews.com/opus-clip-review-2026-ai-video-shorts-tool-tested/); [FlowShorts review](https://www.flowshorts.app/blog/opus-clip-review) (secondary/affiliate)
- Caption tools: one roundup ranks OpusClip's captions first for animated branded captions, VEED for teams (API automation), and Submagic and Captions.ai for mobile creators — [AFFiNE](https://affine.pro/blog/ai-caption-generators) (secondary)
- Captions/Mirage: "Mirage Edit" (April 2025) assembles short-form videos from AI-avatar and live footage. A March 2026 audio model preserves accents in dubbing — [Vantaige](https://vantaige.io/es/ai-tool/captions-ai) (secondary)
- YouTube Shorts + Veo: at Made on YouTube (Sept 2025), YouTube launched Veo 3 Fast in Shorts (480p, with sound, low latency), plus image animation, motion transfer, style transfer, and Speech to Song (Lyria 2). It is free in Shorts — [TechRadar](https://www.techradar.com/ai-platforms-assistants/youtube-shorts-now-lets-you-turn-text-into-8-second-videos-using-veo-3s-ai-magic); [Geekchamp](https://geekchamp.com/youtube-is-getting-powerful-new-ai-tools-including-free-veo-3-video-generation-in-shorts/). No 2026 update was found in this pass, so it may be outdated.
- YouTube's July 2026 policy targets "repetitive" content that is easy to produce with templates or AI, and AI-persona hosts on sensitive topics — [Stuff](https://stuff.co.za/2026/07/21/youtube-cracks-down-on-ai-slop-with-new-revenue/)

### Inferences
- Buy when the goal is speed to first video, or repurposing existing long-form (OpusClip). Buy for avatar/talking-head (Captions/Mirage, HeyGen-class). Buy for single-channel experiments (Revid/Crayo-style "Reddit story + gameplay" templates; prior knowledge, unverified).
- Build (Remotion + durable engine + native publishing APIs) when you need differentiated visual style (to avoid the "templated/repetitive" monetization flag), multi-channel scale, per-video cost tracking, QA gates, A/B testing (IG Trial Reels), and control over model choice (Veo/Kling/Sora/Runway, etc.). With budget not a factor, build is the better long-term choice. A hybrid is common: buy components (ElevenLabs TTS, a video-gen model API, Ayrshare publishing) and build the composition and orchestration core.
- In-app Veo in Shorts is free and native but manual (no API), so it does not fit a fully automated pipeline. Its existence raises the quality floor that automated content must beat.

### Gaps
- No primary-source 2026 pricing or feature data for Revid, InVideo AI, Pictory, Faceless.video, AutoShorts, Crayo or Google Vids. Searches returned only affiliate content or nothing.
- Whether OpusClip or Revid offer public APIs in 2026 was not confirmed.
- Any 2026 YouTube Create / Shorts AI announcements (beyond the Sept 2025 Veo 3 Fast launch) were not found.

## 5. Notable open-source repos for automated short-video generation

### Takeaway
MoneyPrinterTurbo dominates (~130k stars, MIT, active, Python + MoviePy/ffmpeg, multi-LLM, WebUI/API/CLI). Its original inspiration MoneyPrinter and ShortGPT are older and less actively developed. The newer pattern is MCP-exposed composition servers (short-video-maker, built on Remotion) that agents call as tools.

### Cited Findings (stars and updated_at are from the GitHub search API, queried 2026-10-11)
- harry0703/MoneyPrinterTurbo: 129,714 stars, 20,329 forks, 92 open issues, active. Topics include ffmpeg, subtitles, TTS, tiktok, youtube-shorts, workflow-automation. It "generates HD short videos from a topic or keyword" — [GitHub](https://github.com/harry0703/MoneyPrinterTurbo). The pipeline covers LLM script → stock clips → TTS → subtitles → BGM, with 9:16 or 16:9 output up to 1080p, MIT license, and WebUI/API/CLI/"AI Agent" interfaces — [Verdent guide](https://www.verdent.ai/guides/moneyprinterturbo-github) (secondary). It was trending on GitHub again in early Oct 2026 — [AIToolly](https://aitoolly.com/ai-news/article/2026-10-02-moneyprinterturbo-gains-traction-on-github-trending-as-an-automated-ai-powered-hd-short-video-genera). A claim that it includes cross-platform publishing to TikTok, IG and YouTube is unverified. Star-count claims in secondary sources vary (49.6k vs 121.7k), and the live API value above is authoritative.
- FujiwaraChoki/MoneyPrinter: 14,044 stars, "Automate Creation of YouTube Shorts using MoviePy". The original project; only 19 open issues — [GitHub](https://github.com/FujiwaraChoki/MoneyPrinter)
- RayVentura/ShortGPT: 8,022 stars, "Experimental AI framework for youtube shorts / tiktok channel automation", 86 open issues, default branch `stable` — [GitHub](https://github.com/RayVentura/ShortGPT)
- elebumm/RedditVideoMakerBot: 12,541 stars. Reddit-thread narration videos ("one command") — [GitHub](https://github.com/elebumm/RedditVideoMakerBot)
- linyqh/NarratoAI: 11,361 stars. AI commentary/narration and auto-editing of existing video, using MoviePy and Gemini — [GitHub](https://github.com/linyqh/NarratoAI)
- gyoridavid/short-video-maker: 1,405 stars, TypeScript. MCP + REST API, built on Remotion, faceless-video focused — [GitHub](https://github.com/gyoridavid/short-video-maker)
- SamurAIGPT/Text-To-Video-AI: the current repo under that name was created 2026-10-08 with 3 stars, and is now a Next.js SaaS wrapper over Kling/Sora/Veo through "muapi". It appears to be repurposed or recreated, so older articles referencing it are outdated — [GitHub](https://github.com/SamurAIGPT/Text-To-Video-AI)
- SamurAIGPT/AI-Youtube-Shorts-Generator and redotvideo/revideo did not appear in a GitHub search by exact repo name on 2026-10-11, so their status is unknown (possibly renamed, moved or private) — [GitHub search API]

### Inferences
- The OSS repos are good references for pipeline stages, but most use stock footage + TTS + MoviePy captions. That is exactly the "repetitive, template" output YouTube's July 2026 clarification targets, so they are poor as-is for monetizable channels.
- MoneyPrinterTurbo's API mode can serve as a cheap "render worker" inside a larger orchestrated pipeline. For premium output, swap in Remotion composition and generative video clips.

### Gaps
- Last-commit and last-release dates per repo were not retrievable (the `gh` API was blocked in this session; the search API gives only `updated_at`, which star activity also bumps). True development activity for ShortGPT, MoneyPrinter and Editly is unconfirmed.
- No newer 2026 agentic OSS short-video repos with more than 1.5k stars were surfaced by a stars/pushed-date search (the query returned 0 results, possibly due to query syntax).
