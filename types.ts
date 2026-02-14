export enum AppStage {
  INTRO = 'INTRO',
  ENVELOPE = 'ENVELOPE',
  OPENING = 'OPENING',
  READING = 'READING',
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle';
}
