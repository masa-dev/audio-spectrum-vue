<template>
  <div>
    <div class="image-blur-wrapper" :style="backgroundStyle"></div>
    <div class="image-wrapper" :style="backgroundStyle"></div>
  </div>
</template>

<style lang="scss">
.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-image: url("@/assets/party.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -10;
}

.image-blur-wrapper {
  position: absolute;
  top: -40px !important;
  left: -40px !important;
  width: calc(100% + 80px) !important;
  min-height: calc(100vh + 80px) !important;
  background-image: url("@/assets/party.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -11;

  filter: blur(20px);
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

interface BackgroundStyle {
  "background-image": string;
  left: string;
  width: string;
}

@Component
export default class BackgroundImage extends Vue {
  @Prop({ type: String, default: "/audio-spectrum-vue/img/party.png" })
  private imageUrl!: string;

  @Prop({ type: Number, default: 1 })
  private width!: number;

  get getImageUrl(): string {
    const defaultUrl = "/audio-spectrum-vue/img/party.png";
    return this.imageUrl ? this.imageUrl : defaultUrl;
  }

  get getImageWidth(): number {
    if (this.width > 1 && this.width < 0) {
      return 1;
    } else {
      return this.width;
    }
  }

  get backgroundStyle(): BackgroundStyle {
    const style: BackgroundStyle = {
      "background-image": `url("${this.getImageUrl}")`,
      width: `${this.width * 100}%`,
      left: `${50 - this.width * 50}%`,
    };
    return style;
  }
}
</script>
