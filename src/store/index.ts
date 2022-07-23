import Vue from "vue";
import Vuex from "vuex";
import { AudioParams, ReaminBarStatus, PlayStatusParams } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    input: {
      imageFile: null,
      audioFile: null,
      imageFileUrl: "",
      visualiserType: "",
      delayTime: 0,
      barColor: "",
      savedBarColor: "",
      showInputs: false,
      volume: 0.2,
      imageWidth: 1,
      canvasWidth: 1,
    } as AudioParams,
    play: {
      startedAt: 0,
      pausedAt: 0,
      currentTime: 0,
      playing: false,
      durationTime: 0,
    } as PlayStatusParams,
    remainBars: [] as Array<ReaminBarStatus>,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
