<template>
  <div id="app">
    <BasicAudioVisualiser />
    <InputParams />
    <BackgroundImage
      :imageUrl="inputState.imageFileUrl"
      :width="inputState.imageWidth"
    />
    <div
      class="show-control-icon"
      title="詳細設定"
      @click="inputState.showInputs = !inputState.showInputs"
    >
      <b-icon-gear-fill />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  margin: 0;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}

.show-control-icon {
  font-size: 1.2rem;
  position: absolute;
  right: 20px;
  bottom: 50px;
  padding: 0 5px;
  cursor: pointer;
  z-index: 6;
}
</style>

<style>
html {
  overflow: hidden;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import BasicAudioVisualiserTest from "./components/BasicAudioVisualiserTest.vue";
import BasicAudioVisualiser from "./components/BasicAudioVisualiser.vue";
import InputParams from "./components/InputParams.vue";
import BackgroundImage from "./components/BackgroundImage.vue";
import { AudioParams } from "./store/types";

@Component({
  components: {
    BasicAudioVisualiserTest,
    BasicAudioVisualiser,
    InputParams,
    BackgroundImage,
  },
})
export default class App extends Vue {
  private inputState: AudioParams = this.$store.state.input;
  private canvasEl: HTMLCanvasElement | null = null;

  async getAudioArrayBuffer(path: string) {
    let response = axios(path, {
      responseType: "arraybuffer",
      method: "GET",
    });

    return response;
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
