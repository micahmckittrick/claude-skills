import React from 'react';
import {Composition} from 'remotion';
import {FPS, HEIGHT, Reel, WIDTH, reelDuration} from './Reel';
import {reels} from './reels';

export const Root: React.FC = () => (
  <>
    {Object.entries(reels).map(([id, props]) => (
      <Composition
        key={id}
        id={id}
        component={Reel}
        durationInFrames={reelDuration(props)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={props}
      />
    ))}
  </>
);
