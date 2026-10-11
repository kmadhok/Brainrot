import React from "react";
import { Composition } from "remotion";
import { Main } from "./Main";
import { Edl } from "../schemas";
import fixture from "../../fixtures/demo/edl.json";

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    schema={Edl}
    defaultProps={Edl.parse(fixture)}
    // Real values come from the EDL passed as inputProps at render time.
    durationInFrames={1}
    fps={30}
    width={1920}
    height={1080}
    calculateMetadata={({ props }) => {
      const edl = Edl.parse(props);
      return {
        fps: edl.meta.fps,
        width: edl.meta.width,
        height: edl.meta.height,
        durationInFrames: Math.max(1, Math.ceil((edl.meta.durationMs / 1000) * edl.meta.fps)),
        props: edl,
      };
    }}
  />
);
