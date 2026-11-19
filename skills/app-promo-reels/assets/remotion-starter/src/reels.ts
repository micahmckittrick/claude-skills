import type {ReelProps} from './Reel';
import {week as example} from './weeks/2026-01-05';

// Every week's reels, by the Monday they post. Add each new week file here.
// Composition IDs (the keys inside each week) must be unique across all weeks.
export const weeks: Record<string, Record<string, ReelProps>> = {
  '2026-01-05': example,
};

export const reels: Record<string, ReelProps> = Object.assign({}, ...Object.values(weeks));
