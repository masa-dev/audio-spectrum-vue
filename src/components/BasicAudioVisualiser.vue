<template>
  <div>
    <canvas
      id="visualiser-canvas"
      :width="visualWidth"
      :height="visualHeight"
    ></canvas>
    <div id="audio-control-panel" v-show="isDisplayControlPanel">
      <div class="d-flex justify-content-center">
        <div class="flex-column-center">
          <button @click="play"><b-icon-play-fill /></button>
        </div>
        <div class="flex-column-center">
          <input
            @change="inputAudioFile"
            type="file"
            id="audio-input"
            accept="audio/*"
          />
        </div>
        <div class="flex-column-center">
          <select id="" v-model="visualiserType">
            <option value="simple-bar" selected>Simple Bar</option>
            <option value="bold-bar">Bold Bar</option>
            <option value="line-bar">Line Bar</option>
          </select>
        </div>
        <div class="flex-column-center">
          <b-icon-volume-down-fill />
        </div>
        <div class="flex-column-center">
          <input
            type="range"
            id="volume-controller"
            min="0"
            max="1"
            v-model="volume"
            step="0.05"
            @input="inputVolume"
          />
        </div>
        <div class="flex-column-center">
          <b-icon-volume-up-fill />
        </div>
        <div class="flex-column-center">
          <div id="color-picker"></div>
        </div>
      </div>
      <div>
        <input
          type="file"
          id="background-image"
          accept="image/*"
          @change="inputBackgroundImage"
        />
      </div>
    </div>
    <div class="show-control-icon" v-show="isDisplayControlPanel === false">
      <b-icon-caret-up-square-fill @click="openControlPanel()" />
    </div>
    <div class="show-control-icon" v-show="isDisplayControlPanel === true">
      <b-icon-caret-down-square-fill @click="closeControlPanel()" />
    </div>
    <BackgroundImage :imageUrl="backgroundImageUrl" />
  </div>
</template>

<style lang="scss">
#audio-control-panel {
  padding: 20px 10px;
  height: 150px;
}
.show-control-icon {
  font-size: 1.2rem;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 20px;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pickr {
  padding: 0 10px;
  display: inline-block;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { drawSimpleBar, drawLineBar, drawBoldBar } from "./canvasType/drawBar";
import "@simonwep/pickr/dist/themes/classic.min.css"; // 'classic' theme
import Pickr from "@simonwep/pickr";
import BackgroundImage from "./BackgroundImage.vue";

const pickrOptions: Pickr.Options = {
  el: "#color-picker",
  theme: "classic", // or 'monolith', or 'nano'
  swatches: [
    "rgba(244, 67, 54, 0.6)",
    "rgba(103, 58, 183, 0.85)",
    "rgba(63, 81, 181, 0.8)",
    "rgba(0, 188, 212, 0.7)",
    "rgba(76, 175, 80, 0.8)",
  ],
  default: "#F5732499",
  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      input: true,
      save: true,
    },
  },
};

@Component({
  components: {
    BackgroundImage,
  },
})
export default class BasicAudioVisualiser extends Vue {
  public visualWidth = 100;
  public visualHeight = 100;
  private canvasEl: HTMLCanvasElement | null = null;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private audioFile: File | null = null;

  private audioCtx: AudioContext = new AudioContext();
  private analyserNode: AnalyserNode = this.audioCtx.createAnalyser();
  private gainNode: GainNode = new GainNode(this.audioCtx);
  private sourceNode: AudioBufferSourceNode =
    this.audioCtx.createBufferSource();
  private audioBuffer: AudioBuffer | null = null;
  public volume = 0.2;
  private pickr: Pickr | null = null;
  private barColor = "#F5732499";
  private savedColor = "#F5732499";
  public visualiserType = "simple-bar";
  public backgroundImageUrl = "";
  public isDisplayControlPanel = true;

  mounted() {
    this.canvasEl = document.getElementById(
      "visualiser-canvas"
    ) as HTMLCanvasElement;

    this.canvasCtx = this.canvasEl.getContext("2d") as CanvasRenderingContext2D;
    this.gainNode.gain.value = this.volume;

    this.resizeCanvas();
    window.onresize = () => {
      this.resizeCanvas();
    };

    this.pickr = Pickr.create(pickrOptions);
    this.pickr.on("save", (color: any) => {
      this.barColor = color.toRGBA().toString();
      this.savedColor = color.toRGBA().toString();
    });
    this.pickr.on("change", (color: any) => {
      this.barColor = color.toRGBA().toString();
    });
    this.pickr.on("cancel", () => {
      this.barColor = this.savedColor;
    });
    this.pickr.on("hide", () => {
      this.barColor = this.savedColor;
    });
  }

  resizeCanvas() {
    this.visualWidth = window.innerWidth;
    this.visualHeight = window.innerHeight - 150;
  }

  async inputAudioFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.audioFile = (target.files as FileList)[0];
  }

  inputBackgroundImage(event: Event) {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.backgroundImageUrl = reader.result as string;
      };
    } else {
      this.backgroundImageUrl = "";
    }
  }

  inputVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    this.gainNode.gain.value = this.volume;
  }

  closeControlPanel() {
    this.isDisplayControlPanel = false;
  }
  openControlPanel() {
    this.isDisplayControlPanel = true;
  }

  initAudioInstances() {
    const volume = this.gainNode.gain.value;
    this.audioCtx = new AudioContext();
    this.analyserNode = this.audioCtx.createAnalyser();
    this.sourceNode = this.audioCtx.createBufferSource();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = volume;
  }

  async play() {
    if (this.audioFile === null) {
      alert("音声ファイルが入力されていません");
      return;
    }

    const self = this;
    this.initAudioInstances();

    const audioEl = document.getElementById("audio-input") as HTMLInputElement;
    this.audioBuffer = null;
    this.audioBuffer = await this.audioCtx.decodeAudioData(
      await (audioEl.files as FileList)[0].arrayBuffer()
    );

    this.sourceNode.buffer = this.audioBuffer;
    //const freqs = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.sourceNode.connect(this.analyserNode);
    this.sourceNode.connect(this.gainNode).connect(this.audioCtx.destination);
    let AnimationFrameId = 0;

    this.sourceNode.start(0);
    console.log("started");

    this.sourceNode.onended = () => {
      console.log("ended");
      cancelAnimationFrame(AnimationFrameId);
    };

    //this.analyserNode.fftSize = 128;
    this.analyserNode.fftSize = 1024;
    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = this.canvasCtx as CanvasRenderingContext2D;
    const analyserNode = this.analyserNode;
    this.canvasCtx!.clearRect(0, 0, this.visualWidth, this.visualHeight);

    function draw() {
      AnimationFrameId = requestAnimationFrame(draw);
      if (self.visualiserType === "simple-bar") {
        drawSimpleBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.barColor
        );
      } else if (self.visualiserType === "bold-bar") {
        drawBoldBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.barColor
        );
      } else if (self.visualiserType === "line-bar") {
        drawLineBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.barColor
        );
      }
    }

    draw();
  }
}
</script>
