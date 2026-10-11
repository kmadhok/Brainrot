# Ideation and Scripting for an Automated Faceless Short-Form Video Pipeline (state as of October 2026)

Research date: 2026-10-11. Many of the sources are vendor or aggregator blogs. Where a fact comes only from a secondary source, it is marked "(secondary)". Model names change quickly, so the provider documentation fetched on 2026-10-11 counts as authoritative over trackers.

---

## Q1. Trend and topic sourcing: tools, APIs, legality and ToS caveats

### Takeaway
No platform offers a clean, open "what's trending" API in 2026. Google's official Trends API is still a closed alpha. TikTok Creative Center is a web tool with no public API, and TikTok's Research API is only for academics and non-profits. Reddit's free API is non-commercial only, and commercial access needs a negotiated contract. In practice, pipelines combine official APIs where they qualify with paid scrapers and data resellers (such as Apify actors and third-party Reddit and Trends APIs). Each resold source carries its own ToS risk.

### Cited Findings

**Google Trends**
- Google announced an official Google Trends API on July 24, 2025, at Search Central Live. It was in **alpha with application-only access**. Approvals are rolling and limited, and Google prioritizes developers with concrete use cases who will give feedback. — [PPC Land](https://ppc.land/google-opens-alpha-testing-for-new-trends-api-targeting-developers-and-journalists/); [ScrapeBadger (secondary)](https://scrapebadger.com/blog/does-google-trends-have-an-api-what-to-use-in-2026)
- As of late August 2026 the developer page still said it was "accepting applications for alpha testers". It has no self-serve signup, no billing, no published pricing and no general-availability timeline. — [Konabayev, Google Trends API landscape 2026 (secondary)](https://konabayev.com/blog/google-trends-api-landscape-2026/); [ScrapeBadger (secondary)](https://scrapebadger.com/blog/does-google-trends-have-an-api-what-to-use-in-2026)
- Alpha data scope: a rolling 5-year window, daily to yearly aggregation, regions and sub-regions, and **consistently scaled values that can be joined across requests**. It removes the website's 5-term comparison limit. — [PPC Land](https://ppc.land/google-opens-alpha-testing-for-new-trends-api-targeting-developers-and-journalists/)
- A third-party guide reports a lag of about 48 hours and notes the values are still relative, not absolute (unverified against Google docs). — [ScrapeBadger (secondary)](https://scrapebadger.com/blog/does-google-trends-have-an-api-what-to-use-in-2026)
- The unofficial `pytrends` library is described as "dead" in 2026, which pushes people to scraping APIs (SerpApi-style) or the alpha. — [DEV Community: "Pytrends is dead"](https://dev.to/esteban_ortega/pytrends-is-dead-heres-how-to-get-google-trends-data-in-2026-1a18); [Scrapfly: Google Trends API alternatives](https://scrapfly.io/blog/posts/google-trends-api-alternatives)

**TikTok**
- **TikTok Creative Center** (trending hashtags, songs, creators and top ads) is a web tool. The data is a ranked list scoped by industry, time frame and region, and you **cannot freely query arbitrary hashtags**, so it is a poor fit for checking niche tag volume. — [NovoAds (secondary)](https://novoads.ai/blog/tiktok-creative-center)
- Signed-out users see only 5 Top Ads, and fuller data requires sign-in. — [AdMapix (secondary)](https://www.admapix.com/blog/ad-intelligence/tiktok-creative-center-tutorial)
- No official public API for Creative Center trends was found. Third-party **Apify actors** (for example "TikTok Trends Scraper") pull Creative Center data without a TikTok API key. These are unofficial, so their reliability and ToS exposure are the operator's problem. — [Apify Radar listing for the eunit/tiktok-trends-scraper actor](https://godberrystudios.com/apify-radar/actor/eunit/tiktok-trends-scraper)
- The **TikTok Research API** is free but only for approved academic and non-profit researchers. Reported data latency is 24 hours to 7 days (unverified against TikTok docs). It is not usable by a commercial content farm. — [EchoTik (secondary)](https://www.echotik.live/blog/tiktok-research-api-free-access-guide/)
- Social Media Today has covered Creative Center insight additions over time (trend data by region and industry). — [Social Media Today](https://www.socialmediatoday.com/news/tiktok-adds-new-insights-to-its-creative-center-platform-including-data-on/624895/)

**Reddit** (the source of "Reddit story" brainrot)
- The free Data API tier allows about 100 queries per minute per OAuth client and is **limited to non-commercial use**. — [SocialCrawl (secondary)](https://www.socialcrawl.dev/blog/best-reddit-data-apis-2026); [Octolens (secondary)](https://octolens.com/blog/reddit-api-pricing)
- Commercial pricing is **not publicly confirmed for 2026**, and sources conflict. One source cites about $12,000 per month for 50M calls plus about $0.24 per 1K calls. Another describes $0.24 per 1K calls with a $12K **per year** minimum. SocialCrawl says the $0.24 figure comes from Reddit's June 2023 announcement and that no live Reddit page shows a self-serve commercial rate. — [Techloy](https://www.techloy.com/reddit-api-pricing-in-2026-complete-guide-for-developers-and-businesses/); contradicted by [eSEOspace](https://eseospace.com/blog/reddit-api-pricing/) and [SocialCrawl](https://www.socialcrawl.dev/blog/best-reddit-data-apis-2026)
- Commercial use requires a formal contract, and approval reportedly takes 2 to 4 weeks. Another source says **self-serve OAuth app registration closed in late 2025**, so new tokens need manual approval through Reddit's contact form. — [Techloy (secondary)](https://www.techloy.com/reddit-api-pricing-in-2026-complete-guide-for-developers-and-businesses/); [xpoz.ai (secondary)](https://www.xpoz.ai/blog/guides/reddit-api-pricing-tiers-and-alternatives/)
- There is no tier between free and the five-figure commercial tier, which pushes small operators to third-party Reddit data resellers. — [SocialCrawl](https://www.socialcrawl.dev/blog/best-reddit-data-apis-2026); [CityBiz](https://www.citybiz.co/article/868288/reddit-api-pricing-in-2026-what-youll-actually-pay-at-every-tier/)

**Open-source generators' approach to topics**
- MoneyPrinterTurbo, the most-starred OSS short-video generator (roughly 50K to 56K stars depending on snapshot, v1.2.9 released May 30, 2026, on GitHub Trending in October 2026), takes a **user-supplied topic or keyword** rather than doing trend discovery. Its pipeline is: LLM script, then search terms, then Pexels/Pixabay stock clips, then TTS, subtitles and BGM, assembled with MoviePy/FFmpeg. It has a Streamlit UI, a REST API and a CLI. — [Verdent guide](https://www.verdent.ai/guides/moneyprinterturbo-github); [aitoolly Oct 2026](https://aitoolly.com/ai-news/article/2026-10-02-moneyprinterturbo-gains-traction-on-github-trending-as-an-automated-ai-powered-hd-short-video-genera); [PyShine](https://pyshine.com/MoneyPrinterTurbo-AI-Powered-Video-Generation/)

**Platform policy constraint on ideation (YouTube)**
- In July 2025 YouTube renamed its "repetitious content" YPP rule to **"inauthentic content"** and described the change as a clarification. — [NetInfluencer](https://www.netinfluencer.com/youtube-clarifies-july-15-policy-update-repetitious-content-rebranded-as-inauthentic-content/); [eWeek](https://www.eweek.com/news/youtube-responds-to-ai-concerns/)
- The categories reported as non-monetizable are template-based videos with almost no variation between uploads, content made to be distressing or emotionally manipulative for views, and AI personas discussing sensitive health, finance or legal topics. Enforcement is reportedly moving to **channel-level** detection. Dates conflict: some sources cite a further clarification on July 16, 2026. — [AIR Media-Tech timeline (secondary)](https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline); [OutlierKit July 2026 (secondary)](https://outlierkit.com/blog/youtube-updates-july-2026)
- YouTube says using AI is not itself a violation, but realistic synthetic content must be disclosed. — [eWeek](https://www.eweek.com/news/youtube-responds-to-ai-concerns/)
- One report says YouTube terminated 16 channels (35M subscribers combined, 4.7B views) under the policy. This is unverified. — [Hackernoon (secondary)](https://hackernoon.com/youtubes-ai-slop-crackdown-cant-tell-a-directed-ai-film-from-a-bot-farm)
- One source alone claims a YPP overhaul announced Aug 10, 2026, effective Feb 1, 2027. This is unconfirmed. — [AIR Media-Tech](https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline)

### Inferences
- A robust 2026 trend layer would likely combine:
  - Google Trends (apply for the alpha, and use a SERP/Trends scraping API in the meantime)
  - TikTok Creative Center through Apify or another scraper
  - YouTube Data API search and `videos.list` (mostPopular chart) for YouTube-native signals
  - Reddit through a paid commercial agreement or a licensed reseller
  - an LLM pass that clusters, dedupes and scores the candidates
- Scraping Creative Center or Reddit for a commercial monetized channel is a ToS gray area, or a breach. Legal risk lands on the operator, not the scraper vendor.
- YouTube's inauthentic-content rules make **idea diversity a compliance requirement**, not just a creative nicety. Ideation should track per-channel template and topic similarity and enforce variation. Reddit-story and "fun fact" channels that reuse one template are exactly the profile reported to face channel-level scrutiny.
- Reddit stories carry an extra layer of risk: the posts are user-generated content, and reposting them verbatim implicates both Reddit's ToS and the original author's rights. Many operators rewrite or fictionalize them with an LLM.

### Gaps
- I did not verify current pricing, features or APIs for Exploding Topics, Glimpse, Brandwatch, Sprout, Talkwalker, Meltwater or other social-listening tools (out of tool-call budget).
- I did not verify Apify's 2026 pricing or the maintenance status of specific TikTok, Instagram or YouTube Shorts actors.
- I did not check official TikTok developer docs for whether Creative Center data is exposed through the TikTok for Business / Marketing API.
- No official Instagram/Meta trending-audio or Reels-trends API was researched. I am not aware of a public one, but this is unverified.
- YouTube Data API quota specifics for 2026 were not checked.

---

## Q2. Best LLMs for short-form scripting now, and how pipelines are structured (structured outputs, multi-step, retention prompting, LLM-as-judge)

### Takeaway
As of October 11, 2026, the frontier lineups are:
- **Anthropic:** Claude Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1 for the hardest reasoning
- **OpenAI:** GPT-6 Sol / GPT-6 Luna, and GPT-6.1 Sol announced at DevDay on September 29, 2026
- **Google:** Gemini 3.8 Flash stable, with Gemini 3.1 Pro still in preview

All are capable script writers. The practical pattern is a cheap or fast model for bulk ideation and classification and a frontier model for drafting and critique. I found no published, rigorous evidence that LLM-judge hook scores predict real retention, so judge scores must be calibrated against analytics.

### Cited Findings

**Anthropic (from official docs, fetched 2026-10-11)**
- Current models and API IDs:
  - `claude-fable-5-1`: "for demanding reasoning and long-horizon agentic work". $10 input / $50 output per MTok.
  - `claude-opus-5-5`: the recommended default "for most workloads". $4 / $20.
  - `claude-sonnet-5-5`: "best combination of speed and intelligence". $2 / $10.
  - `claude-haiku-5-5`: high-volume classification, extraction and routing. From $0.10 / $0.50.
  - All four have a 1M-token context, 128K max output, and a reliable knowledge cutoff of June 2026.
  — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Thinking is "adaptive", steered by an `effort` parameter. Default effort is `medium` on Opus 5.5 and Haiku 5.5 and `high` on Sonnet 5.5 and Fable 5.1. The old manual `budget_tokens` extended-thinking mode is deprecated on the 4.6 models and not accepted on later ones. — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- The Batch API is 50% off. Prompt-cache reads cost 10% of base input, or 5% on Opus 5.5 and Sonnet 5.5. This matters for high-volume script generation that reuses a long style guide or system prompt. — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- The Models API exposes `server_tools.web_search.supported`, and the web search and code execution server tools are available. — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Claude Opus 5.5 was released September 22, 2026, Sonnet 5.5 on September 28, 2026, and Haiku 5.5 on October 7, 2026. — [LLM Stats updates](https://llm-stats.com/llm-updates) (dates are consistent with the retirement-commitment dates in the [Anthropic docs](https://platform.claude.com/docs/en/about-claude/models/overview))
- Legacy but still available: Fable 5, Opus 5, Opus 4.8/4.7/4.6/4.5, Sonnet 5, Sonnet 4.6, Haiku 4.5. — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Wikipedia lists a restricted-access "Claude Mythos 5.1" series (September 1, 2026). — [Wikipedia: Claude Mythos](https://en.wikipedia.org/wiki/Claude_Mythos)

**OpenAI**
- GPT-6 Sol (`gpt-6-sol`) launched in the API on September 22, 2026, at $2 input / $10 output per MTok. GPT-6 Luna costs $0.10 / $0.50. API prices were cut about 50% compared with the prior generation. — [VKTR](https://www.vktr.com/ai-platforms/openai-launches-gpt6-sol-and-luna-cuts-api-prices-in-half/); [ProPakistani](https://propakistani.pk/2026/09/24/openai-launches-gpt-6-sol-and-luna-with-50-lower-api-costs/amp/)
- GPT-6.1 Sol (`gpt-6.1-sol`) was introduced at DevDay on September 29, 2026, at $2 / $10, with cached input at $0.10 per MTok. An "Ultrafast" variant was announced. Its availability status conflicts: one recap lists it only as "announced". — [Unite.ai](https://www.unite.ai/openai-unveils-gpt-6.1-sol-at-devday-with-new-codex-and-chatgpt-tools/); [NoCode.MBA DevDay recap](https://www.nocode.mba/articles/openai-devday-2026-recap)
- The GPT-5.x line is being retired:
  - `gpt-5-2025-08-07`, `gpt-5-mini` and `gpt-5-nano` shut down December 11, 2026.
  - `gpt-4o-2024-05-13` and `gpt-4.1-nano` shut down October 23, 2026.
  - The `gpt-4o-search-preview` models shut down July 23, 2026.
  — [OpenAI Deprecations](https://developers.openai.com/api/docs/deprecations)

**Google**
- Gemini API stable text models: `gemini-3.8-flash`, `gemini-3.6-flash`, `gemini-3.5-flash-lite`, `gemini-3.1-flash-lite`. Preview: `gemini-3.1-pro-preview` and `gemini-3-flash-preview`. TTS: `gemini-3.8-flash-tts` (relevant for voiceover). Video: `gemini-omni-1.1-flash`. — [Gemini API models](https://ai.google.dev/gemini-api/docs/models)
- Gemini 2.0 Flash/Flash-Lite and Gemini 3 Pro Preview are shut down. Gemini 2.5 models are limited to prior users, and Google recommends 3.5 Flash-Lite or 3.8 Flash for new projects. — [Gemini API models](https://ai.google.dev/gemini-api/docs/models)
- A "Gemini 4 Argon" lightweight model (September 30, 2026) appears only on an aggregator and is not on Google's models page. Treat it as unconfirmed. — [LLM Stats](https://llm-stats.com/llm-updates); not listed on [Gemini API models](https://ai.google.dev/gemini-api/docs/models)

**LLM-as-judge**
- The LLM-as-a-Judge survey frames judging as input design, model selection and output post-processing, and stresses that reliability needs added validation, calibration and standardization. Known biases include position and verbosity bias. — [Survey on LLM-as-a-Judge, arXiv 2411.15594](https://arxiv.org/pdf/2411.15594)
- VideoJudge found that **multimodal judges that see the video outperform text-only LLM judges** for rating video outputs, and that long chain-of-thought did not improve judging. Its rubric prompt asks for reasoning followed by a strict-format integer 1 to 5 score. — [VideoJudge, arXiv 2509.21451](https://arxiv.org/html/2509.21451v1)
- Good practice is to spot-check judges against humans. One study validated its judge on 600 of 2,100 predictions (95% confidence, ±4% margin). — [Rethinking RAG in Long Videos, arXiv 2606.13141](https://arxiv.org/pdf/2606.13141)
- No source specific to "hook scoring predicts watch-through or swipe rate" was found. — (search returned only general LLM-judge literature)

### Inferences
These are a synthesis, not sourced practice. The report writer should present them as recommendations.
- **Model allocation, with budget no object:**
  - Opus 5.5 or GPT-6.1 Sol for drafting and rewriting.
  - Fable 5.1 for hard research synthesis.
  - Haiku 5.5, GPT-6 Luna or Gemini 3.5 Flash-Lite for bulk trend clustering, dedupe, classification and title variants.
  - A cross-vendor judge, such as a Gemini or GPT model judging Claude drafts, to reduce self-preference bias.
  - Given VideoJudge's result, a final multimodal check (for example Gemini on the rendered video) of hook visuals plus caption sync is likely more informative than text-only hook scoring.
- **Pipeline:**
  1. Trend candidates go through a structured-JSON scoring and filter step (novelty, fit, policy risk).
  2. An angle and hook generator produces N hooks per idea.
  3. A judge runs a pairwise tournament on the hooks, which is less biased than absolute scores.
  4. The model writes a beat outline with timestamps (hook ≤ 2 s, payoff placement, loop ending).
  5. The model writes the full script as structured output (fields such as `hook`, `beats[]`, `on_screen_text[]`, `broll_queries[]`, `claims[]` with sources, `cta`, `loop_line`).
  6. A critique pass against the rubric leads to a rewrite.
  7. Fact verification runs (see Q4).
  8. A policy and originality check compares the script with the channel's recent scripts to stay within the inauthentic-content rules.
- All three vendors support JSON-schema-constrained structured outputs. The `claims[]` field is the main hook for downstream fact checking.
- Caching the long channel "bible" (voice, banned phrases, past top hooks) is cheap on Claude (5% cache-read on Opus/Sonnet 5.5). The Batch API at 50% off suits nightly bulk generation.

### Gaps
- I found no head-to-head benchmark of Claude 5.5 vs GPT-6.x vs Gemini 3.8 on short-form or creative scriptwriting. Any "best model" claim is opinion.
- I did not verify structured-outputs documentation for each vendor in this session, so the inference that all three support JSON-schema-constrained output rests on prior knowledge and should be confirmed.
- I found no practitioner write-ups with data on retention-focused prompting (for example "pattern interrupt every 3 s") for 2026 within budget. ShortGPT's 2026 status is unverified.
- I found no evidence on whether judge scores correlate with real retention.

---

## Q3. Orchestration layer: LlamaIndex/LangChain vs direct SDKs vs agent SDKs

### Takeaway
The legacy completions stack is gone: text-davinci-003 was shut down January 4, 2024, and the Assistants API on August 26, 2026, replaced by the Responses and Conversations APIs. In 2026 the common choices are direct provider SDKs, vendor agent SDKs (Claude Agent SDK, OpenAI Agents SDK, Google ADK), or LangGraph when model-agnostic orchestration or observability is needed. LangChain is still widely used but is no longer a default requirement for a linear content pipeline.

### Cited Findings
- `text-davinci-003` and the other InstructGPT and base GPT-3 completions models were **shut down 2024-01-04**, with `gpt-3.5-turbo-instruct` and `davinci-002`/`babbage-002` named as replacements at the time. — [OpenAI Deprecations](https://developers.openai.com/api/docs/deprecations)
- The OpenAI **Assistants API shut down 2026-08-26**. The replacement is the **Responses API + Conversations API**. — [OpenAI Deprecations](https://developers.openai.com/api/docs/deprecations)
- A June 2026 listing names six SDKs as dominant in production: LangGraph, CrewAI, OpenAI Agents SDK, Claude Agent SDK, Google ADK and Semantic Kernel. — [Requesty (secondary)](https://www.requesty.ai/blog/best-ai-agent-sdks-compared-2026-langchain-crewai-openai-anthropic-google); [MorphLLM](https://www.morphllm.com/ai-agent-framework)
- LangChain Deep Agents and LangGraph are positioned as model-agnostic production infrastructure covering orchestration, deployment, observability, RBAC and multi-tenancy. — [Context Studios comparison](https://www.contextstudios.ai/okf/en/comparisons/claude-agent-sdk-vs-langchain.md)
- The Claude Agent SDK is positioned as Anthropic-native, strongest for coding and repo-local agents. You build your own server, auth and tenancy layer. — [Context Studios](https://www.contextstudios.ai/okf/en/comparisons/claude-agent-sdk-vs-langchain.md); [Hightower substack](https://rickhigh.substack.com/p/langgraph-vs-crewai-vs-claude-agent)
- The OpenAI Agents SDK (March 2025) is the production successor to Swarm: open source, and best for teams standardized on OpenAI who want agents without framework complexity. — [Respan](https://www.respan.ai/market-map/compare/langchain-vs-openai-agents-sdk); [Requesty](https://www.requesty.ai/blog/best-ai-agent-sdks-compared-2026-langchain-crewai-openai-anthropic-google)
- Some teams mix approaches, for example the Claude Agent SDK for execution plus LangGraph/LangSmith for routing, audit and evals. — [Context Studios](https://www.contextstudios.ai/okf/en/comparisons/claude-agent-sdk-vs-langchain.md)
- MoneyPrinterTurbo routes script generation to multiple hosted and local LLM providers through its own config layer rather than a heavy framework. — [Verdent guide](https://www.verdent.ai/guides/moneyprinterturbo-github)

### Inferences
- An ideation-to-script pipeline is mostly a **deterministic DAG** of LLM calls with structured outputs. Direct SDK calls plus a lightweight workflow engine (or LangGraph if you want graph-state, retries and LangSmith tracing) is simpler than an autonomous agent.
- Agent SDKs earn their place in the **research step**: open-ended web search, fetch and verification loops for fact-based scripts, and analytics-driven "what should we make next" analysis.
- LlamaIndex is relevant only if you build a RAG index over your own corpus (past scripts, transcripts, fact databases). Hosted web search tools have reduced the need for it in fresh-fact use cases.
- Any tutorial or OSS repo that still calls `openai.Completion.create` / `text-davinci-003` or the Assistants API is broken and should be treated as outdated.

### Gaps
- No independent benchmarks or production-incident data compare these frameworks; the sources are vendor-adjacent.
- I did not verify Claude Agent SDK and OpenAI Agents SDK 2026 feature changes from primary docs in this session.

---

## Q4. Research-grounded scripting: web search, RAG, and avoiding hallucinated "facts"

### Takeaway
All three major providers now offer first-party web search or grounding tools: the Claude web search server tool, Gemini's Grounding with Google Search, and OpenAI search through the Responses API, whose `gpt-4o-search-preview` models are retired. The reliable pattern is to keep claims separate from prose, require a cited source for every claim, and verify independently before TTS.

### Cited Findings
- Claude models expose web search and code execution server tools, which can be checked through `capabilities.server_tools` in the Models API. Admins can disable web search at the org level. — [Anthropic Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Gemini **Grounding with Google Search** connects responses to public Google Search results. Its usage notes include a recommended temperature of 1.0 and a daily query limit. The **Gemini API does not support combining search tools with non-search tools in one request**, though multiple search tools are allowed. — [Google Cloud: Grounding with Google Search](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search)
- Google also supports grounding with your own search API, which can serve as a curated fact source. — [Google Cloud: Grounding with your search API](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-your-search-api)
- OpenAI's dedicated `gpt-4o-search-preview` and `gpt-4o-mini-search-preview` models shut down July 23, 2026. — [OpenAI Deprecations](https://developers.openai.com/api/docs/deprecations)
- YouTube flags AI personas discussing health, finance or legal topics as a non-monetizable category. Fact-based channels in those niches face higher risk regardless of accuracy. — [AIR Media-Tech (secondary)](https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline)
- LLM judges need calibration against humans, which also applies to automated fact-check judges. — [Survey on LLM-as-a-Judge](https://arxiv.org/pdf/2411.15594); [arXiv 2606.13141](https://arxiv.org/pdf/2606.13141)
- An MoneyPrinterTurbo review stresses that output quality, relevance and legality still depend on inputs and human review. — [Verdent guide](https://www.verdent.ai/guides/moneyprinterturbo-github)

### Inferences
- Recommended flow for fun-fact and explainer channels:
  1. A research agent with web search and fetch gathers sources and stores snippets plus URLs.
  2. The script generator may only use facts from that evidence pack, emitting `claims[]` that each cite an evidence ID.
  3. A separate verifier model (preferably from a different vendor) re-checks each claim against the fetched source text and flags unsupported claims. Unsupported claims get cut, not softened.
  4. Numbers and dates get a second retrieval pass.
  5. The verified claims and URLs go in the video description, which also helps with YouTube's authenticity posture.
- "Fun fact" content is a hallucination magnet because viral "facts" are often myths. A myth blacklist plus a Snopes or Wikipedia cross-check step is a sensible guardrail.
- For Reddit or AI fiction stories, factual grounding matters less. Originality, avoiding verbatim UGC, and avoiding emotionally manipulative framing (a reported YouTube non-monetizable category) matter more.

### Gaps
- I did not fetch Anthropic's web search and citations docs or OpenAI's Responses API web_search tool docs in this session to confirm current parameters and pricing.
- I found no quantitative data on hallucination rates of 2026 models in fact-based short-form content.

---

## Q5. Feeding performance data (retention curves, analytics) back into ideation and scripting

### Takeaway
The YouTube Analytics API exposes per-segment retention: `audienceWatchRatio`, `relativeRetentionPerformance`, and `startedWatching`/`stoppedWatching` keyed on the `elapsedVideoTimeRatio` dimension, plus an `engagedViews` metric. That is enough to build a closed loop that ties script beats to drop-off points and feeds winning hooks and formats back into prompts. Shorts-specific "swiped away" data could not be confirmed in the API.

### Cited Findings
- **`elapsedVideoTimeRatio`** is the dimension that indexes the portion of the video a retention metric refers to. — [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics)
- **`audienceWatchRatio`** is the absolute ratio of viewers watching at a given point. It can exceed 1 when a segment is rewatched, which is relevant for looping Shorts. — [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics)
- **`relativeRetentionPerformance`** runs from 0 to 1 and compares retention with all YouTube videos of similar length (0.5 = median). — [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics)
- **`startedWatching`, `stoppedWatching` and `totalSegmentImpressions`** count, per segment, how often it was the first seen, the last seen, or viewed. — [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics)
- **`engagedViews`** counts views past the first frame, or click/tap-to-play. — [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics)
- A July 2026 summary of YouTube updates mentions new Shorts-related changes (including Shorts thumbnails). — [OutlierKit (secondary)](https://outlierkit.com/blog/youtube-updates-july-2026)

### Inferences
- **Loop design:**
  1. Store each script's timestamped beats from structured output and the TTS word timings.
  2. Pull the retention curve per video (`elapsedVideoTimeRatio` × `audienceWatchRatio`) once the video has enough views.
  3. Align drop-offs and spikes to beats.
  4. Label hooks and beats as winners or losers.
  5. Feed the top-K and bottom-K examples (hook text, first-2-second retention, `relativeRetentionPerformance`) into the ideation and hook prompts as few-shot examples.
  6. Use the same data to **calibrate the LLM judge**, for example by checking whether pairwise judge preference agrees with real retention ordering, and re-weighting rubric criteria.
- `audienceWatchRatio > 1` near the end signals a successful loop. That is a measurable target for the "loop ending" script field.
- With budget no object, an agent (Claude Agent SDK or OpenAI Agents SDK) can run a weekly "analyst" job: query analytics, write a findings memo, and update the channel bible and banned-pattern list that ideation reads. A human should approve those updates.
- Analogous loops on TikTok and Instagram depend on each platform's own creator and business analytics APIs, which were not researched here.

### Gaps
- I could not confirm from the docs page whether audience retention reports are limited to one video per query, or what the minimum view threshold is.
- I could not confirm whether the Shorts "viewed vs swiped away" metric shown in YouTube Studio is available through the Analytics API.
- TikTok (Display API / Business API) and Instagram Graph API retention and analytics availability for 2026 were not researched within budget.
- I found no published case study with data showing analytics-to-prompt feedback loops improving retention for AI faceless channels.
