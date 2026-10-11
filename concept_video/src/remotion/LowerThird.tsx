import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../schemas";

export const LowerThird: React.FC<{ name: string; brand: Brand }> = ({ name, brand }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-start", padding: "80px 96px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: exit,
          transform: `translateX(${(1 - enter) * -60}px)`,
        }}
      >
        <div style={{ width: 10, height: 64, background: brand.accent, borderRadius: 4 }} />
        <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: 1 }}>{name}</div>
      </div>
    </AbsoluteFill>
  );
};
