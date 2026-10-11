import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

export const Quote: React.FC<GraphicProps<"quote">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = spec.text.split(/\s+/);
  const perWord = Math.max(1, Math.floor((fps * 1.6) / words.length));
  return (
    <Backdrop brand={brand}>
      <div style={{ fontSize: 180, lineHeight: 0.6, color: brand.accent, alignSelf: "flex-start", marginLeft: 40 }}>“</div>
      <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.2, textAlign: "center", maxWidth: 1400 }}>
        {words.map((w, i) => (
          <span key={i} style={{ opacity: interpolate(frame - i * perWord, [0, 6], [0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            {w}{" "}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 40, fontSize: 38, opacity: interpolate(frame, [fps * 1.6, fps * 2], [0, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        — {spec.attribution}
      </div>
    </Backdrop>
  );
};
