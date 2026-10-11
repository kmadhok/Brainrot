import React from "react";
import type { Brand, GraphicSpec } from "../../schemas";
import { Bars } from "./Bars";
import { Kinetic } from "./Kinetic";
import { Quote } from "./Quote";
import { Stat } from "./Stat";
import { Steps } from "./Steps";
import { Title } from "./Title";

export const Graphic: React.FC<{ spec: GraphicSpec; brand: Brand }> = ({ spec, brand }) => {
  switch (spec.kind) {
    case "title":
      return <Title spec={spec} brand={brand} />;
    case "stat":
      return <Stat spec={spec} brand={brand} />;
    case "bars":
      return <Bars spec={spec} brand={brand} />;
    case "quote":
      return <Quote spec={spec} brand={brand} />;
    case "steps":
      return <Steps spec={spec} brand={brand} />;
    case "kinetic":
      return <Kinetic spec={spec} brand={brand} />;
  }
};
