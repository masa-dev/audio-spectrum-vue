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
          <button id="play-btn" @click="play"><b-icon-play-fill /></button>
        </div>
        <div class="flex-column-center mx-4">
          <select v-model="state.visualiserType" class="form-select">
            <option value="simple-bar" selected>Simple Bar</option>
            <option value="bold-bar">Bold Bar</option>
            <option value="line-bar">Line Bar</option>
          </select>
        </div>
        <div class="d-flex">
          <div class="flex-column-center">
            <b-icon-volume-down-fill />
          </div>
          <div class="flex-column-center">
            <input
              type="range"
              id="volume-controller"
              min="0"
              max="1"
              v-model="state.volume"
              step="0.05"
              @input="inputVolume"
            />
          </div>
          <div class="flex-column-center">
            <b-icon-volume-up-fill />
          </div>
        </div>
      </div>
    </div>
    <div
      class="show-control-icon"
      title="コントロールパネルを表示する"
      v-show="isDisplayControlPanel === false"
      @click="openControlPanel()"
    >
      <b-icon-caret-up-square-fill />
    </div>
    <div
      class="show-control-icon"
      title="コントロールパネルを非表示にする"
      v-show="isDisplayControlPanel === true"
      @click="closeControlPanel()"
    >
      <b-icon-caret-down-square-fill />
    </div>
  </div>
</template>

<style lang="scss">
@import "../../node_modules/bulma/bulma.sass";

#audio-control-panel {
  padding: 20px 10px;
  height: 150px;
}
.show-control-icon {
  font-size: 1.2rem;
  position: absolute;
  right: 20px;
  bottom: 10px;
  padding: 0 5px;
  cursor: pointer;
  z-index: 6;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#play-btn {
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  aspect-ratio: 1;
  background-color: rgb(44, 224, 83);
  color: white;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { drawSimpleBar, drawLineBar, drawBoldBar } from "./canvasType/drawBar";
import { AudioParams } from "../store/types";
import "@simonwep/pickr/dist/themes/classic.min.css"; // 'classic' theme
import Pickr from "@simonwep/pickr";
import BackgroundImage from "./BackgroundImage.vue";

@Component({
  components: {
    BackgroundImage,
  },
})
export default class BasicAudioVisualiser extends Vue {
  private state: AudioParams = this.$store.state.input;
  public visualWidth = 100;
  public visualHeight = 100;
  private canvasEl: HTMLCanvasElement | null = null;
  private canvasCtx: CanvasRenderingContext2D | null = null;

  private audioCtx: AudioContext = new AudioContext();
  private analyserNode: AnalyserNode = this.audioCtx.createAnalyser();
  private gainNode: GainNode = new GainNode(this.audioCtx);
  private sourceNode: AudioBufferSourceNode =
    this.audioCtx.createBufferSource();
  private audioBuffer: AudioBuffer | null = null;

  public isDisplayControlPanel = true;

  @Watch("state.volume")
  onChangeStateVolume() {
    this.gainNode.gain.value = this.state.volume;
  }

  @Watch("state.canvasWidth")
  onChangeCanvasWidth() {
    this.resizeCanvas();
  }

  mounted() {
    this.canvasEl = document.getElementById(
      "visualiser-canvas"
    ) as HTMLCanvasElement;

    this.canvasCtx = this.canvasEl.getContext("2d") as CanvasRenderingContext2D;
    this.gainNode.gain.value = this.state.volume;

    this.resizeCanvas();
    window.onresize = () => {
      this.resizeCanvas();
    };
  }

  resizeCanvas() {
    this.visualWidth = window.innerWidth * this.state.canvasWidth;

    if (this.isDisplayControlPanel) {
      this.visualHeight = window.innerHeight - 150;
    } else {
      this.visualHeight = window.innerHeight;
    }
  }

  inputVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.state.volume = parseFloat(target.value);
    this.gainNode.gain.value = this.state.volume;
  }

  closeControlPanel() {
    this.isDisplayControlPanel = false;
    this.resizeCanvas();
  }
  openControlPanel() {
    this.isDisplayControlPanel = true;
    this.resizeCanvas();
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
    if (this.state.audioFile === null) {
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

    this.sourceNode.start(this.state.delayTime);
    console.log("started");

    this.sourceNode.onended = () => {
      console.log("ended");
      cancelAnimationFrame(AnimationFrameId);
      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.clearRect(0, 0, this.visualWidth, this.visualHeight);
      canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
      canvasCtx.fillRect(0, 0, this.visualWidth, this.visualHeight);
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
      if (self.state.visualiserType === "simple-bar") {
        drawSimpleBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.state.barColor
        );
      } else if (self.state.visualiserType === "bold-bar") {
        drawBoldBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.state.barColor
        );
      } else if (self.state.visualiserType === "line-bar") {
        drawLineBar(
          canvasCtx,
          analyserNode,
          bufferLength,
          dataArray,
          self.visualWidth,
          self.visualHeight,
          self.state.barColor
        );
      }
    }

    draw();
  }
}
</script>
