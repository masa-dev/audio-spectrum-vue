export interface AudioParams {
  imageFile: File | null;
  audioFile: File | null;
  imageFileUrl: string;
  visualiserType: string;
  delayTime: number;
  barColor: string;
  savedBarColor: string;
  showInputs: boolean;
  volume: number;
  imageWidth: number;
  canvasWidth: number;
}

export interface PlayStatusParams {
  startedAt: number;
  pausedAt: number;
  currentTime: number;
  durationTime: number;
  playing: boolean;
}

export interface ReaminBarStatus {
  count: number;
  lastUpdate: Date;
}
