import React from "react";
import { interpolate, Easing, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, type GraphicProps } from "./Backdrop";

const fmt = (n: number, decimals: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export const Stat: React.FC<GraphicProps<"stat">> = ({ spec, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const decimals = Number.isInteger(spec.value) ? 0 : 1;
  const value = interpolate(frame, [0, fps * 1.2], [0, spec.value], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const label = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  return (
    <Backdrop brand={brand}>
      <div style={{ fontSize: 260, fontWeight: 900, color: brand.accent, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {spec.prefix}
        {fmt(value, decimals)}
        {spec.suffix}
      </div>
      <div style={{ marginTop: 24, fontSize: 56, fontWeight: 600, textAlign: "center", opacity: label, transform: `translateY(${(1 - label) * 24}px)` }}>
        {spec.label}
      </div>
      {spec.source ? <div style={{ marginTop: 28, fontSize: 26, opacity: 0.55 * label }}>Source: {spec.source}</div> : null}
    </Backdrop>
  );
};
