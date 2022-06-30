<template>
  <div class="image-wrapper" :style="backgroundStyle"></div>
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
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

interface BackgroundStyle {
  "background-image": string;
}

@Component
export default class BackgroundImage extends Vue {
  @Prop({ type: String, default: "/audio-spectrum-vue/img/party.png" })
  private imageUrl!: string;

  get getImageUrl(): string {
    const defaultUrl = "/audio-spectrum-vue/img/party.png";
    return this.imageUrl ? this.imageUrl : defaultUrl;
  }

  get backgroundStyle(): BackgroundStyle {
    const style: BackgroundStyle = {
      "background-image": `url("${this.getImageUrl}")`,
    };
    return style;
  }
}
</script>
