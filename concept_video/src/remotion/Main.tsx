import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import type { Edl } from "../schemas";
import { BeatLayer } from "./BeatLayer";
import { Captions } from "./Captions";
import { LowerThird } from "./LowerThird";
import { ProgressBar } from "./ProgressBar";
import { msToFrame } from "./time";

export const Main: React.FC<Edl> = (edl) => {
  const { fps } = useVideoConfig();
  const { beats, audio, brand } = edl;
  const firstAroll = beats.find((b) => b.type === "aroll");

  return (
    <AbsoluteFill style={{ backgroundColor: brand.bg, fontFamily: brand.font, color: brand.fg }}>
      {beats.map((beat, i) => {
        const from = msToFrame(beat.startMs, fps);
        const duration = Math.max(1, msToFrame(beat.endMs, fps) - from);
        return (
          <Sequence key={beat.id} from={from} durationInFrames={duration} name={`${beat.id}:${beat.type}`}>
            <BeatLayer beat={beat} brand={brand} index={i} />
          </Sequence>
        );
      })}

      {firstAroll && brand.creatorName ? (
        <Sequence from={msToFrame(firstAroll.startMs, fps) + 10} durationInFrames={fps * 3}>
          <LowerThird name={brand.creatorName} brand={brand} />
        </Sequence>
      ) : null}

      {edl.captions.enabled ? (
        <Captions words={edl.words} emphasis={edl.emphasis} beats={beats} brand={brand} combineWithinMs={edl.captions.combineWithinMs} />
      ) : null}

      <ProgressBar brand={brand} />

      {audio.voice ? <Audio src={staticFile(audio.voice)} /> : null}
      {audio.music ? <Audio src={staticFile(audio.music)} volume={audio.musicVolume} loop /> : null}
      {audio.sfx.map((s, i) => (
        <Sequence key={i} from={msToFrame(s.atMs, fps)}>
          <Audio src={staticFile(s.src)} volume={s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
