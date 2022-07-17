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
}

export interface ReaminBarStatus {
  height: number;
  lastUpdate: Date;
}
