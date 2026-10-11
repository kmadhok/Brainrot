import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

export const Bars: React.FC<GraphicProps<"bars">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...spec.items.map((i) => i.value));
  const head = spring({ frame, fps, config: { damping: 200 } });
  return (
    <Backdrop brand={brand}>
      <div style={{ width: "100%", maxWidth: 1400 }}>
        <div style={{ fontSize: 64, fontWeight: 800, marginBottom: 48, opacity: head }}>{spec.title}</div>
        {spec.items.map((item, i) => {
          const grow = spring({ frame: frame - 8 - i * 6, fps, config: { damping: 18, stiffness: 90 } });
          const last = i === spec.items.length - 1;
          return (
            <div key={item.label} style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
              <div style={{ width: 300, fontSize: 38, fontWeight: 600, opacity: 0.9 }}>{item.label}</div>
              <div style={{ flex: 1, height: 64, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(item.value / max) * 100 * Math.min(grow, 1)}%`,
                    background: last ? brand.accent : brand.accent2,
                    borderRadius: 10,
                  }}
                />
              </div>
              <div style={{ width: 200, textAlign: "right", fontSize: 40, fontWeight: 700, fontVariantNumeric: "tabular-nums", opacity: Math.min(grow, 1) }}>
                {Math.round(item.value * Math.min(grow, 1)).toLocaleString("en-US")}
                {spec.unit ?? ""}
              </div>
            </div>
          );
        })}
        {spec.source ? <div style={{ marginTop: 12, fontSize: 26, opacity: 0.55 }}>Source: {spec.source}</div> : null}
      </div>
    </Backdrop>
  );
};
