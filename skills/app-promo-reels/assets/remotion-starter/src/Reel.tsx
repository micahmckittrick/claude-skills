import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Size of your recordings. Default: iPhone 17 Simulator capture (1206 x 2622).
// Change these to match your device; the phone frame keeps this aspect ratio.
const CAPTURE_W = 1206;
const CAPTURE_H = 2622;
// Draw a Dynamic Island over the capture. Turn off for devices without one.
const SHOW_ISLAND = true;

const SCREEN_H = 1270; // on-canvas height of the phone screen
const SCREEN_W = Math.round((SCREEN_H * CAPTURE_W) / CAPTURE_H);
const BEZEL = 15;
const PHONE_TOP = 548; // captions sit in the band above this
const END_CARD_FRAMES = 105; // base timing for the end card; reels usually pass endFrames: 54

export type Segment = {src: string; from: number; to: number; rate?: number};
export type Zoom = {scale: number; x: number; y: number};
export type Beat = {caption: string; clips: Segment[]; zoom?: Zoom};

export type Theme = {
  bg: [string, string];
  glow: [string, string];
  text: string;
  accent: string;
  muted: string;
  font: string;
  weight: number;
  uppercase?: boolean;
  tracking?: number;
  bezel?: string;
};

export type EndCard = {
  icon: string;
  name: string;
  tagline: string;
  cta: string;
  footer?: string;
};

// endFrames shortens the end card; its pieces pop in proportionally faster.
export type ReelProps = {theme: Theme; beats: Beat[]; end: EndCard; endFrames?: number};

const segFrames = (s: Segment) => Math.round(((s.to - s.from) * FPS) / (s.rate ?? 1));
const beatFrames = (b: Beat) => b.clips.reduce((n, s) => n + segFrames(s), 0);

export const reelDuration = (p: ReelProps) =>
  p.beats.reduce((n, b) => n + beatFrames(b), 0) + (p.endFrames ?? END_CARD_FRAMES);

// "Plain *accent* plain" -> spans, with the starred words in the accent color.
const Rich: React.FC<{text: string; accent: string}> = ({text, accent}) => (
  <>
    {text.split('*').map((part, i) => (
      <span key={i} style={i % 2 ? {color: accent} : undefined}>
        {part}
      </span>
    ))}
  </>
);

const Background: React.FC<{theme: Theme}> = ({theme}) => {
  const frame = useCurrentFrame();
  const drift = (speed: number, amp: number) => Math.sin(frame / speed) * amp;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${theme.bg[0]} 0%, ${theme.bg[1]} 100%)`}}>
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          left: -260 + drift(70, 60),
          top: 120 + drift(90, 80),
          borderRadius: '50%',
          background: theme.glow[0],
          filter: 'blur(160px)',
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          right: -280 + drift(80, 70),
          bottom: 60 + drift(60, 60),
          borderRadius: '50%',
          background: theme.glow[1],
          filter: 'blur(170px)',
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};

const Clip: React.FC<{seg: Segment}> = ({seg}) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(`footage/${seg.src}`)}
        trimBefore={Math.round(seg.from * FPS)}
        trimAfter={Math.round(seg.to * FPS)}
        playbackRate={seg.rate ?? 1}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </AbsoluteFill>
  );
};

// One beat's footage, with an optional slow punch-in toward a point on the screen.
const BeatScreen: React.FC<{beat: Beat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const total = beatFrames(beat);
  const z = beat.zoom;
  const scale = z
    ? interpolate(frame, [8, Math.min(total - 4, 40)], [1, z.scale], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
      })
    : 1;
  let at = 0;
  return (
    <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: z ? `${z.x}% ${z.y}%` : 'center'}}>
      {beat.clips.map((seg, i) => {
        const start = at;
        at += segFrames(seg);
        return (
          <Sequence key={i} from={start} durationInFrames={segFrames(seg)}>
            <Clip seg={seg} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const Phone: React.FC<{theme: Theme; beats: Beat[]; endStart: number}> = ({theme, beats, endStart}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // In place from frame 0 so the first frame works as the cover; it settles, then
  // drops away during the last beat's final frames while its footage is still playing.
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 120}});
  const exit = interpolate(frame, [endStart - 12, endStart], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const y = (1 - enter) * 50 + exit * 1500 + Math.sin(frame / 38) * 5;
  const scale = 0.96 + 0.04 * enter;
  const outerW = SCREEN_W + BEZEL * 2;
  let at = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: (WIDTH - outerW) / 2,
        top: PHONE_TOP,
        width: outerW,
        height: SCREEN_H + BEZEL * 2,
        borderRadius: 104,
        background: theme.bezel ?? '#0c0c0e',
        padding: BEZEL,
        boxSizing: 'border-box',
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: 1 - exit * 0.5,
        boxShadow: '0 40px 120px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.08) inset',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: 89,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {beats.map((beat, i) => {
          const start = at;
          at += beatFrames(beat);
          return (
            <Sequence key={i} from={start} durationInFrames={beatFrames(beat)}>
              <BeatScreen beat={beat} />
            </Sequence>
          );
        })}
        {/* Dynamic Island, drawn over the capture so every clip matches. */}
        {SHOW_ISLAND ? <div
          style={{
            position: 'absolute',
            top: Math.round(SCREEN_W * 0.03),
            left: '50%',
            width: Math.round(SCREEN_W * 0.31),
            height: Math.round(SCREEN_W * 0.092),
            transform: 'translateX(-50%)',
            borderRadius: 999,
            background: '#000',
          }}
        /> : null}
      </div>
    </div>
  );
};

const Caption: React.FC<{theme: Theme; text: string; hook: boolean; frames: number}> = ({theme, text, hook, frames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // The hook is fully readable on frame 0 (it doubles as the cover); later captions pop in.
  const pop = hook ? 1 : spring({frame, fps, config: {damping: 13, stiffness: 140}});
  const out = interpolate(frame, [frames - 5, frames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const size = hook ? 92 : 74;
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 150,
        height: PHONE_TOP - 175,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: theme.font,
          fontWeight: theme.weight,
          fontSize: size,
          lineHeight: 1.06,
          letterSpacing: theme.tracking ?? -1.5,
          textTransform: theme.uppercase ? 'uppercase' : 'none',
          color: theme.text,
          opacity: Math.min(pop, 1) * out,
          transform: `translateY(${(1 - pop) * 40}px) scale(${0.9 + 0.1 * pop})`,
          textWrap: 'balance',
        }}
      >
        <Rich text={text} accent={theme.accent} />
      </div>
    </div>
  );
};

const End: React.FC<{theme: Theme; end: EndCard; frames: number}> = ({theme, end, frames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = Math.min(1, frames / END_CARD_FRAMES);
  const icon = spring({frame: frame - 8 * k, fps, config: {damping: 12, stiffness: 120}});
  const rise = (delay: number) => {
    const s = spring({frame: frame - delay * k, fps, config: {damping: 16, stiffness: 110}});
    return {opacity: s, transform: `translateY(${(1 - s) * 30}px)`};
  };
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 140}}>
      <Img
        src={staticFile(end.icon)}
        style={{
          width: 300,
          height: 300,
          borderRadius: 68,
          transform: `scale(${icon})`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        }}
      />
      <div
        style={{
          ...rise(14),
          marginTop: 56,
          fontFamily: theme.font,
          fontWeight: theme.weight,
          fontSize: end.name.length > 18 ? 76 : 92,
          letterSpacing: theme.tracking ?? -1.5,
          textTransform: theme.uppercase ? 'uppercase' : 'none',
          color: theme.text,
          textAlign: 'center',
          lineHeight: 1.05,
          padding: '0 60px',
        }}
      >
        {end.name}
      </div>
      <div
        style={{
          ...rise(20),
          marginTop: 22,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 500,
          fontSize: 44,
          color: theme.muted,
          textAlign: 'center',
          padding: '0 90px',
          lineHeight: 1.25,
          textWrap: 'balance',
        }}
      >
        {end.tagline}
      </div>
      <div
        style={{
          ...rise(27),
          marginTop: 50,
          padding: '26px 56px',
          borderRadius: 999,
          background: theme.accent,
          color: theme.bg[1],
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 800,
          fontSize: 46,
          letterSpacing: -0.5,
        }}
      >
        {end.cta}
      </div>
      {end.footer ? (
        <div
          style={{
            ...rise(32),
            marginTop: 34,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 500,
            fontSize: 32,
            color: theme.muted,
            textAlign: 'center',
            padding: '0 120px',
          }}
        >
          {end.footer}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const Reel: React.FC<ReelProps> = ({theme, beats, end, endFrames = END_CARD_FRAMES}) => {
  const endStart = beats.reduce((n, b) => n + beatFrames(b), 0);
  let at = 0;
  return (
    <AbsoluteFill>
      <Background theme={theme} />
      <Phone theme={theme} beats={beats} endStart={endStart} />
      {beats.map((beat, i) => {
        const start = at;
        const frames = beatFrames(beat);
        at += frames;
        return (
          <Sequence key={i} from={start} durationInFrames={frames}>
            <Caption theme={theme} text={beat.caption} hook={i === 0} frames={frames} />
          </Sequence>
        );
      })}
      <Sequence from={endStart} durationInFrames={endFrames}>
        <End theme={theme} end={end} frames={endFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};
