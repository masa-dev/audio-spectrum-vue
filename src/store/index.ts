import Vue from "vue";
import Vuex from "vuex";
import { AudioParams, ReaminBarStatus } from "./types";

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
    } as AudioParams,
    remainBars: [] as Array<ReaminBarStatus>,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
