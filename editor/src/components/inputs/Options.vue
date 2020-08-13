<template>
  <div class="input-container">
    <label>{{ $t("subheadOptions") }}</label>
    <div class="options-checkbox-container">
      <div class="options-checkbox" @click="onUseLightBackgroundToggle">
        <label for="useLightBackground">{{
          $t("details.lightBackground")
        }}</label>
        <input
          id="useLightBackground"
          name="useLightBackground"
          type="checkbox"
          :checked="options.lightBackground"
        />
      </div>
      <div class="options-checkbox" @click="onShowConstellations">
        <label for="showConstellations">{{
          $t("details.constellations")
        }}</label>
        <input
          id="showConstellations"
          name="showConstellations"
          type="checkbox"
          :checked="options.constellations"
        />
      </div>
      <div class="options-checkbox" @click="onShowMilkyWay">
        <label for="showMilkyway">{{ $t("details.milkyway") }}</label>
        <input
          id="showMilkyway"
          name="showMilkyway"
          type="checkbox"
          :checked="options.milkyway"
        />
      </div>
      <div class="options-checkbox" @click="onShowCoordinates">
        <label for="showCoordinateGrid">{{ $t("details.coords") }}</label>
        <input
          id="showCoordinateGrid"
          name="showCoordinateGrid"
          type="checkbox"
          :checked="options.coordinateGrid"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";
import { IOptions } from "../../posterTypes";

export default Vue.extend({
  name: "Options",
  props: {
    options: {
      type: Object as () => IOptions,
      required: true
    }
  },
  data: () => ({
    expanded: false
  }),
  computed: {
    //
  },
  methods: {
    onUseLightBackgroundToggle() {
      this.options.lightBackground = !this.options.lightBackground;
    },
    onShowConstellations() {
      this.options.constellations = !this.options.constellations;
    },
    onShowMilkyWay() {
      this.options.milkyway = !this.options.milkyway;
    },
    onShowCoordinates() {
      this.options.coordinateGrid = !this.options.coordinateGrid;
    }
  }
});
</script>

<style scoped lang="scss">
.options-checkbox:nth-child(-n + 3) {
  border-bottom: 1px solid #e5e5e5;
}
</style>
