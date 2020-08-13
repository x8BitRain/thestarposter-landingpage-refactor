<template>
  <div>
    <transition name="fadeDelayed">
      <CanvasPlaceholder
        :style="isIos ? 'width: 72% !important;' : null"
        :color="theme.mapColor"
        v-show="!isReady"
      />
    </transition>
    <transition name="fade">
      <canvas
        xmlns="http://www.w3.org/1999/xhtml"
        id="starmap"
        v-show="isReady"
        :width="canvasWidth"
        :height="canvasWidth"
        ref="canvasContext"
      ></canvas>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import drawCelestial from "./drawCelestial";
import { Animator } from "./animate/Animator";
import { Long, Lat } from "../../math/types";
import { ICelestial } from "@/math";
import urlParameters from "../../util/urlParameters";
import { IColor, IOptions, Shapes } from "../../posterTypes";
import getEquivalentLocalTime from "./getEquivalentLocalTime";
import CanvasPlaceholder from "../loaders/CanvasPlaceholder.vue";

export default Vue.extend({
  name: "CanvasCelestial",
  components: {
    CanvasPlaceholder
  },
  props: {
    date: Date,
    lat: Number,
    long: Number,
    logDebugInfo: Boolean,
    theme: Object as () => IColor,
    shape: String as () => Shapes,
    options: Object as () => IOptions,
    isIos: Boolean
  },
  data: () => ({
    animationRunning: true,
    animator: undefined,
    lastRenderedCelestial: undefined,
    isReady: false,
    locationChanges: 0
  }),
  computed: {
    canvasWidth(): number {
      if (urlParameters.printMode) {
        return 6144;
      } else {
        return 1024; // Todo make this dynamic based on the canvas width
      }
    }
  },
  watch: {
    lat() {
      this.onLocationChanged();
    },
    long() {
      this.onLocationChanged();
    },
    date() {
      this.onLocationChanged();
    },
    theme() {
      this.redrawCelestial();
    },
    shape() {
      this.redrawCelestial();
    },
    options: {
      deep: true,
      handler() {
        this.redrawCelestial();
      }
    }
  },
  methods: {
    async redrawCelestial() {
      const canvas = this.$refs.canvasContext;
      if (!canvas) {
        throw new Error("canvas was null");
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("canvas was null");
      }
      const width = canvas.width;
      this.animationRunning = this.animator.isAnimationRunning();
      if (this.animationRunning) {
        const celestial: ICelestial = await this.animator.next();
        if (celestial) {
          this.isReady = true;
          drawCelestial(
            ctx,
            celestial,
            width,
            this.theme,
            this.shape,
            this.options.constellations,
            this.options.milkyway,
            this.options.coordinateGrid
          );
          this.lastRenderedCelestial = celestial;
        }
        window.requestAnimationFrame(() => this.redrawCelestial());
      } else {
        drawCelestial(
          ctx,
          this.lastRenderedCelestial,
          width,
          this.theme,
          this.shape,
          this.options.constellations,
          this.options.milkyway,
          this.options.coordinateGrid
        );
      }
    },
    async onLocationChanged() {
      const locationChangeId = ++this.locationChanges
      const timezonedDate = await getEquivalentLocalTime(
        this.date,
        this.lat,
        this.long
      );
      // The data changed again in the meantime and we would load stale data now
      if (locationChangeId !== this.locationChanges) {
        return;
      }
      this.animator.changeLocation({
        lat: this.lat,
        long: this.long,
        date: timezonedDate
      });
      if (!this.animationRunning) {
        this.redrawCelestial();
      }
    }
  },
  async mounted() {
    const timezonedDate = await getEquivalentLocalTime(
      this.date,
      this.lat,
      this.long
    );
    let initialLong = this.long - 180
    if (initialLong < -180) {
      initialLong += 360
    }
    this.animator = Animator(
      {
        lat: this.lat,
        long: initialLong as Long,
        date: timezonedDate
      },
      {
        lat: this.lat,
        long: this.long,
        date: timezonedDate
      }
    );
    const canvas = this.$refs.canvasContext;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.save();
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.width);
    this.redrawCelestial();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>
