<template>
  <div id="app">
    <!--
    <button @click="click()">click</button>
    <div>
      <canvas id="my-canvas"></canvas>
    </div>
    -->
    <!--<BasicAudioVisualiserTest mediaUrl="/music/季節は次々死んでいく.mp3" />-->
    <BasicAudioVisualiser />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import BasicAudioVisualiserTest from "./components/BasicAudioVisualiserTest.vue";
import BasicAudioVisualiser from "./components/BasicAudioVisualiser.vue";

@Component({
  components: {
    BasicAudioVisualiserTest,
    BasicAudioVisualiser,
  },
})
export default class App extends Vue {
  private canvasEl: HTMLCanvasElement | null = null;

  async getAudioArrayBuffer(path: string) {
    let response = axios(path, {
      responseType: "arraybuffer",
      method: "GET",
    });

    return response;
  }

  async click() {
    this.canvasEl = document.getElementById("my-canvas") as HTMLCanvasElement;
    const ctx = this.canvasEl.getContext("2d") as CanvasRenderingContext2D;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();

    const audioArrayBuffer = (
      await this.getAudioArrayBuffer("/music/季節は次々死んでいく.mp3")
    ).data as ArrayBuffer;

    audioCtx.decodeAudioData(audioArrayBuffer, function (buffer) {
      const sourseNode = audioCtx.createBufferSource();
      sourseNode.buffer = buffer;

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.3; // volume

      const freqs = new Uint8Array(analyser.frequencyBinCount);
      sourseNode.connect(analyser);
      sourseNode.connect(gainNode).connect(audioCtx.destination);

      sourseNode.start(0);

      setInterval(() => {
        analyser.getByteTimeDomainData(freqs);
        // canvas
        ctx.fillStyle = "rgb(200, 200, 200)";
        ctx.fillRect(0, 0, 200, 200);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.beginPath();

        let sliceWidth = (200 * 1.0) / freqs.length;
        let x = 0;

        for (let i = 0; i < freqs.length; i++) {
          let v = freqs[i] / 128.0;
          var y = (v * 200) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(200, 100);
        ctx.stroke();
      }, 10);
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
