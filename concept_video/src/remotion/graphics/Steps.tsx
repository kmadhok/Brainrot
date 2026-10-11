import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

export const Steps: React.FC<GraphicProps<"steps">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // Spread the reveals across the first ~70% of the beat so each step lands while it's being said.
  const gap = Math.max(4, Math.floor((durationInFrames * 0.7) / spec.steps.length));
  return (
    <Backdrop brand={brand}>
      <div style={{ width: "100%", maxWidth: 1300 }}>
        <div style={{ fontSize: 64, fontWeight: 800, marginBottom: 44 }}>{spec.title}</div>
        {spec.steps.map((s, i) => {
          const a = spring({ frame: frame - i * gap, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 26, opacity: a, transform: `translateX(${(1 - a) * 50}px)` }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  background: brand.accent,
                  color: brand.bg,
                  fontSize: 38,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 46, fontWeight: 600 }}>{s}</div>
            </div>
          );
        })}
      </div>
    </Backdrop>
  );
};
