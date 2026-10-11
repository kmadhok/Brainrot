import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

export const Title: React.FC<GraphicProps<"title">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 } });
  const b = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  return (
    <Backdrop brand={brand}>
      <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1.02, textAlign: "center", opacity: a, transform: `translateY(${(1 - a) * 40}px)` }}>
        {spec.title}
      </div>
      {spec.subtitle ? (
        <div style={{ marginTop: 32, fontSize: 48, color: brand.accent, opacity: b, transform: `translateY(${(1 - b) * 30}px)` }}>
          {spec.subtitle}
        </div>
      ) : null}
    </Backdrop>
  );
};
