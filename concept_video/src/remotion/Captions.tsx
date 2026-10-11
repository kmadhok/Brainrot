import React, { useMemo } from "react";
import { createTikTokStyleCaptions, type TikTokPage } from "@remotion/captions";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand, EdlBeat, Word } from "../schemas";
import { frameToMs } from "./time";

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");

// Word-by-word captions: 1–4 words per page, active word highlighted, emphasis words in accent.
export const Captions: React.FC<{
  words: Word[];
  emphasis: string[];
  beats: EdlBeat[];
  brand: Brand;
  combineWithinMs: number;
}> = ({ words, emphasis, beats, brand, combineWithinMs }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frameToMs(frame, fps);

  const pages = useMemo<TikTokPage[]>(
    () =>
      createTikTokStyleCaptions({
        // Remotion's tokens carry their own leading space.
        captions: words.map((w, i) => ({
          text: (i === 0 ? "" : " ") + w.text,
          startMs: w.startMs,
          endMs: w.endMs,
          timestampMs: w.startMs,
          confidence: null,
        })),
        combineTokensWithinMilliseconds: combineWithinMs,
      }).pages,
    [words, combineWithinMs],
  );
  const emph = useMemo(() => new Set(emphasis.map(norm)), [emphasis]);

  const page = pages.find((p, i) => t >= p.startMs && t < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs));
  if (!page) return null;

  // On full-screen graphics the caption moves to the bottom edge and shrinks so it never covers the chart.
  const beat = beats.find((b) => t >= b.startMs && t < b.endMs);
  // Kinetic type and quote cards already put the words on screen.
  if (beat?.graphic && (beat.graphic.kind === "kinetic" || beat.graphic.kind === "quote")) return null;
  const onGraphic = beat?.type === "graphic";
  const fontSize = onGraphic ? 54 : 78;
  const pageFrame = frame - Math.round((page.startMs / 1000) * fps);
  const pop = spring({ frame: pageFrame, fps, config: { damping: 14, stiffness: 220 } });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: onGraphic ? 48 : height * 0.12 }}>
      <div
        style={{
          maxWidth: "78%",
          textAlign: "center",
          fontSize,
          fontWeight: 800,
          lineHeight: 1.15,
          transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
          textShadow: "0 4px 18px rgba(0,0,0,0.65)",
          WebkitTextStroke: "2px rgba(0,0,0,0.35)",
        }}
      >
        {page.tokens.map((tok, i) => {
          const active = t >= tok.fromMs && t < tok.toMs;
          const spoken = t >= tok.fromMs;
          const isEmph = emph.has(norm(tok.text));
          const color = isEmph ? brand.accent : active ? brand.fg : spoken ? brand.fg : "rgba(244,241,234,0.55)";
          // Spaces live outside the inline-block spans, which would otherwise swallow them.
          return (
            <React.Fragment key={i}>
            {i > 0 ? " " : null}
            <span
              style={{
                color,
                display: "inline-block",
                // Room for the scale-up so it never eats the neighbouring spaces.
                margin: isEmph ? "0 0.14em" : undefined,
                transform: active && isEmph ? "scale(1.12) translateY(-4px)" : undefined,
              }}
            >
              {tok.text.trim()}
            </span>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
