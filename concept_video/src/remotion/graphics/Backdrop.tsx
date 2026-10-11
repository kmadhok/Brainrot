import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { Brand } from "../../schemas";

// Slowly drifting gradient blobs: keeps full-screen graphics from feeling static.
export const Backdrop: React.FC<{ brand: Brand; children: React.ReactNode }> = ({ brand, children }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 300], [20, 34]);
  const y = interpolate(frame, [0, 300], [30, 22]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px circle at ${x}% ${y}%, ${brand.accent}22, transparent 60%),
                     radial-gradient(800px circle at ${100 - x}% ${100 - y}%, ${brand.accent2}1f, transparent 60%),
                     ${brand.bg}`,
        alignItems: "center",
        justifyContent: "center",
        padding: "0 160px 140px",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export type GraphicProps<K extends string> = { spec: Extract<import("../../schemas").GraphicSpec, { kind: K }>; brand: Brand };
