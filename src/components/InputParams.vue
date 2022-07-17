<template>
  <div class="input-params" v-show="state.showInputs">
    <div class="mb-3 close-input">
      <div class="cancel-icon-wrapper" @click="closeInputs">
        <b-icon-x-lg></b-icon-x-lg>
      </div>
    </div>
    <div class="mb-3">
      <label class="mb-1">背景画像</label>
      <div class="file has-name">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
            accept="image/*"
            @input="inputImage"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">
            {{ state.imageFile ? state.imageFile.name : "No Select" }}
          </span>
        </label>
      </div>
    </div>

    <div class="mb-3">
      <label class="mb-1">再生音楽</label>
      <div class="file has-name">
        <label class="file-label">
          <input
            id="audio-input"
            class="file-input"
            type="file"
            name="resume"
            accept="audio/*"
            @input="inputAudio"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">
            {{ state.audioFile ? state.audioFile.name : "No Select" }}
          </span>
        </label>
      </div>
    </div>

    <div class="mb-3">
      <label class="mb-1">ビジュアライザーの種類</label>
      <select class="form-select" v-model="state.visualiserType">
        <option value="simple-bar" selected>Simple Bar</option>
        <option value="bold-bar">Bold Bar</option>
        <option value="line-bar">Line Bar</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="mb-1">開始遅延</label>
      <input
        class="form-control"
        type="number"
        min="0"
        v-model="state.delayTime"
      />
    </div>

    <div class="mb-3 row py-2">
      <label class="mb-1">音量</label>
      <div class="col-1">
        <b-icon-volume-down-fill />
      </div>
      <div class="flex-column-center col-9">
        <input
          type="range"
          id="volume-controller"
          min="0"
          max="1"
          v-model="state.volume"
          step="0.05"
          @input="inputVolume"
          @mouseover="isHoverVolume = true"
          @mouseleave="isHoverVolume = false"
        />
      </div>
      <div class="col-1">
        <b-icon-volume-up-fill />
      </div>
    </div>

    <div class="mb-3">
      <label class="mb-1">バーの色</label>
      <div class="d-block">
        <div id="color-picker"></div>
      </div>
    </div>

    <div class="mb-3">
      <label
        >ビジュアライザーの幅: {{ parseInt(state.canvasWidth * 100) }}%</label
      >
      <input
        type="range"
        class="form-range"
        max="1"
        min="0"
        step="0.01"
        v-model.number="state.canvasWidth"
      />
    </div>

    <div class="mb-3">
      <label class="mb-1"
        >画像の幅: {{ parseInt(state.imageWidth * 100) }}%</label
      >
      <input
        type="range"
        class="form-range"
        max="1"
        min="0"
        step="0.01"
        v-model.number="state.imageWidth"
      />
    </div>

    <div class="mb-3">
      <label class="mb-1">画像の幅の自動調整</label>
      <div>
        <button
          class="btn btn-secondary"
          @click="autoScale"
          :disabled="!state.imageFile"
        >
          画像幅の自動調整
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-params {
  position: absolute;
  padding: 1rem 1.5rem;
  top: 0;
  right: 0;
  text-align: left;
  width: 400px;
  height: 100vh;
  background-color: white;
  overflow-y: auto;
  z-index: 5;
}

.close-input {
  > .cancel-icon-wrapper {
    display: inline;
    padding: 0.3rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(126, 126, 126, 0.3);
    }
  }
}

.bi-volume-up-fill,
.bi-volume-down-fill {
  font-size: 1.5rem;
}

@media only screen and (max-width: 400px) {
  .input-params {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AudioParams } from "../store/types";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/classic.min.css"; // 'classic' theme

const pickrOptions: Pickr.Options = {
  el: "#color-picker",
  theme: "classic", // or 'monolith', or 'nano'
  swatches: [
    "rgba(244, 67, 54, 0.6)",
    "rgba(103, 58, 183, 0.85)",
    "rgba(63, 81, 181, 0.8)",
    "rgba(0, 188, 212, 0.7)",
    "rgba(33, 202, 111, 0.7)",
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

@Component
export default class InputParams extends Vue {
  private state: AudioParams = this.$store.state.input;
  private pickr: Pickr | null = null;
  private isHoverVolume = false;

  private inputImage(event: InputEvent) {
    const reader = new FileReader();
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.state.imageFile = input.files[0];
      reader.readAsDataURL(this.state.imageFile);
      reader.onload = () => {
        this.state.imageFileUrl = reader.result as string;
      };
    } else {
      this.state.imageFileUrl = "";
    }
  }

  private autoScale() {
    if (this.state.imageFile) {
      const img = new Image();

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        const scale = (width * maxHeight) / (height * maxWidth);
        this.state.imageWidth = scale > 1 ? 1 : scale;

        URL.revokeObjectURL(img.src);
      };

      img.src = URL.createObjectURL(this.state.imageFile);
    }
  }

  private inputAudio(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.state.audioFile = input.files[0];
    }
  }

  private closeInputs() {
    this.state.showInputs = false;
  }

  private inputVolume(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.state.volume = parseFloat(target.value);
  }

  mounted() {
    this.state.visualiserType = "simple-bar";
    this.state.barColor = "#F5732499";
    this.state.savedBarColor = "#F5732499";

    this.state.showInputs = true;

    Vue.nextTick(() => {
      this.pickr = Pickr.create(pickrOptions);

      this.pickr.on("save", (color: any) => {
        this.state.barColor = color.toRGBA().toString();
        this.state.savedBarColor = color.toRGBA().toString();
        this.pickr!.hide();
      });
      this.pickr.on("change", (color: any) => {
        this.state.barColor = color.toRGBA().toString();
      });
      this.pickr.on("cancel", () => {
        this.state.barColor = this.state.savedBarColor;
      });
      this.pickr.on("hide", () => {
        this.state.barColor = this.state.savedBarColor;
      });
    });

    window.onwheel = (e) => {
      if (this.isHoverVolume) {
        if (e.deltaY < 0 && this.state.volume < 1) {
          this.state.volume += 0.05;
        } else if (e.deltaY > 0 && this.state.volume > 0) {
          this.state.volume -= 0.05;
        }
      }
    };
  }
}
</script>
