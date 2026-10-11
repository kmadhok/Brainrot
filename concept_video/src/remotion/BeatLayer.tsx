import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand, EdlBeat } from "../schemas";
import { Graphic } from "./graphics/Graphic";
import { frameToMs } from "./time";

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

// Slow push-in plus punch-ins at the beat's zoom points (ms relative to beat start).
const useZoom = (beat: EdlBeat) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frameToMs(frame, fps);
  let scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06]);
  for (const z of beat.zoom) {
    const rel = z.atMs - beat.startMs;
    if (t >= rel) scale *= interpolate(t - rel, [0, 180], [1, z.to], { extrapolateRight: "clamp" });
  }
  return scale;
};

const Placeholder: React.FC<{ beat: EdlBeat; brand: Brand }> = ({ beat, brand }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 40%, #2a2d36 0%, ${brand.bg} 70%)`,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ width: 360, height: 360, borderRadius: "50%", border: `6px dashed ${brand.accent}`, opacity: 0.7 }} />
    <div style={{ marginTop: 40, fontSize: 44, letterSpacing: 6, opacity: 0.8, textTransform: "uppercase" }}>
      {beat.type === "aroll" ? "Digital twin A-roll" : "B-roll"} · {beat.id}
    </div>
  </AbsoluteFill>
);

const Media: React.FC<{ beat: EdlBeat; brand: Brand }> = ({ beat, brand }) => {
  const scale = useZoom(beat);
  const { fps } = useVideoConfig();
  if (!beat.src) return <Placeholder beat={beat} brand={brand} />;
  const style: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` };
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {IMAGE_EXT.test(beat.src) ? (
        <Img src={staticFile(beat.src)} style={style} />
      ) : (
        <OffthreadVideo src={staticFile(beat.src)} muted startFrom={Math.round((beat.srcStartMs / 1000) * fps)} style={style} />
      )}
      {/* Gentle vignette so captions stay legible over any footage. */}
      <AbsoluteFill style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

export const BeatLayer: React.FC<{ beat: EdlBeat; brand: Brand; index: number }> = ({ beat, brand, index }) => {
  const frame = useCurrentFrame();
  // Short cross-dissolve in; the first beat cuts in hard so the hook lands on frame 0.
  const opacity = index === 0 ? 1 : interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      {beat.type === "graphic" && beat.graphic ? <Graphic spec={beat.graphic} brand={brand} /> : <Media beat={beat} brand={brand} />}
    </AbsoluteFill>
  );
};
