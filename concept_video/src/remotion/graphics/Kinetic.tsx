import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

export const Kinetic: React.FC<GraphicProps<"kinetic">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = spec.text.split(/\s+/);
  return (
    <Backdrop brand={brand}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 32px", maxWidth: 1500 }}>
        {words.map((w, i) => {
          const a = spring({ frame: frame - i * 4, fps, config: { damping: 12, stiffness: 160 } });
          return (
            <span
              key={i}
              style={{
                fontSize: 150,
                fontWeight: 900,
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: i === words.length - 1 ? brand.accent : brand.fg,
                opacity: Math.min(1, a),
                transform: `translateY(${(1 - a) * 80}px) rotate(${(1 - a) * -6}deg)`,
                display: "inline-block",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </Backdrop>
  );
};
