<template>
  <div class="canvas-wrapper">
    <canvas id="basic-visualiser" width="500" height="200"></canvas>
    <div>
      {{ mediaUrl }}
      <button @click="play()">start</button>
      <button @click="playOrPause()">{{ btnText }}</button>
    </div>
  </div>
</template>

<style lang="scss">
#basic-visualiser {
  width: 500px;
  height: 200px;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";

@Component
export default class BasicAudioVisualiserTest extends Vue {
  @Prop({ type: String, default: "" })
  mediaUrl!: string;

  private canvasEl: HTMLCanvasElement | null = null;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private audioCtx: AudioContext = new AudioContext();
  private analyserNode: AnalyserNode = this.audioCtx.createAnalyser();
  private gainNode: GainNode = new GainNode(this.audioCtx);
  private sourceNode: AudioBufferSourceNode =
    this.audioCtx.createBufferSource();
  private mediaBuffer: ArrayBuffer | null = null;
  public isFirstPlay = true;
  private isPlaying = false;
  public btnText = "start";

  async getAudioArrayBuffer(path: string) {
    let response = axios(path, {
      responseType: "arraybuffer",
      method: "GET",
    });

    return response;
  }

  private init() {
    this.audioCtx = new AudioContext();
    this.analyserNode = this.audioCtx.createAnalyser();
    this.gainNode = new GainNode(this.audioCtx);
    this.sourceNode = this.audioCtx.createBufferSource();
    this.gainNode.gain.value = 0.3;
    console.log("initted");
  }

  async play() {
    if (!this.isFirstPlay) {
      this.sourceNode.stop();
    }
    if (!this.mediaBuffer) {
      setTimeout(() => {
        this.play();
      }, 500);
      return;
    }

    this.mediaBuffer = (await this.getAudioArrayBuffer(this.mediaUrl))
      .data as ArrayBuffer;

    this.init();

    await this.audioCtx.decodeAudioData(this.mediaBuffer, (buffer) => {
      const WIDTH = 500;
      const HEIGHT = 200;
      this.sourceNode.buffer = buffer;
      const freqs = new Uint8Array(this.analyserNode.frequencyBinCount);
      this.analyserNode.fftSize = 256;
      this.sourceNode.connect(this.analyserNode);
      this.sourceNode.connect(this.gainNode).connect(this.audioCtx.destination);

      this.sourceNode.start(0);
      this.isPlaying = false;

      this.analyserNode.fftSize = 128;
      let bufferLength = this.analyserNode.frequencyBinCount;
      console.log(bufferLength);
      let dataArray = new Uint8Array(bufferLength);
      console.log(dataArray);

      this.canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);
      let drawVisual = 0;
      let analyser = this.analyserNode;
      let canvasCtx = this.canvasCtx;

      draw();
      function draw() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);
        canvasCtx!.fillStyle = "rgb(0, 0, 0)";
        canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);
        canvasCtx!.fillStyle = "rgb(0, 0, 0, 0)";
        canvasCtx!.fillRect(0, 0, WIDTH, HEIGHT);

        let barWidth = (WIDTH / bufferLength) * 1.3;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 1.5;

          canvasCtx!.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx!.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

          x += barWidth + 1;
        }
      }

      this.sourceNode.onended = () => {
        this.audioCtx.close();
        this.isFirstPlay = true;
        this.isPlaying = false;
      };
    });
  }

  playOrPause() {
    // 停止
    if (this.isPlaying) {
      this.audioCtx.suspend();
      this.isPlaying = false;
      this.btnText = "start";
    }
    // 再生
    else {
      this.audioCtx.resume();
      this.isPlaying = true;
      this.btnText = "stop";
    }
  }

  async mounted() {
    this.canvasEl = document.getElementById(
      "basic-visualiser"
    ) as HTMLCanvasElement;
    this.canvasCtx = this.canvasEl.getContext("2d") as CanvasRenderingContext2D;

    this.mediaBuffer = (await this.getAudioArrayBuffer(this.mediaUrl))
      .data as ArrayBuffer;
    this.gainNode.gain.value = 0.2;
  }
}
</script>
