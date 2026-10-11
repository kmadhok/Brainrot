import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../schemas";

export const ProgressBar: React.FC<{ brand: Brand }> = ({ brand }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 6, width: `${(frame / durationInFrames) * 100}%`, background: brand.accent, opacity: 0.85 }} />
    </AbsoluteFill>
  );
};
