<template>
  <div class="sceneContainer">
    <div class="posterContainer">
      <div v-if="isSafari" id="safari-poster">
        <CanvasCelestial
          :date="posterProps.date"
          :lat="posterProps.location.lat"
          :long="posterProps.location.long"
          :logDebugInfo="logDebugInfo"
          :theme="posterProps.style"
          :shape="posterProps.shape"
          :options="posterProps.options"
          :is-ios="isSafari"
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :viewBox="viewBox"
        :style="SVGStyle.backgroundColor"
        width="100%"
        height="100%"
        class="Poster"
      >
        <!-- <foreignObject height="100%" width="100%" x="0" y="0">
          <img
            height="auto"
            width="100%"
            style="opacity: 0.1"
            src="https://thestarposter.com/backend/starmap/r1gxOHm1P/preview.jpg"
          />
        </foreignObject> -->
        <foreignObject
          v-if="!isSafari"
          x="70"
          y="60"
          text-anchor="middle"
          width="360"
          height="365"
        >
          <CanvasCelestial
            :date="posterProps.date"
            :lat="posterProps.location.lat"
            :long="posterProps.location.long"
            :logDebugInfo="logDebugInfo"
            :theme="posterProps.style"
            :shape="posterProps.shape"
            :options="posterProps.options"
          />
        </foreignObject>
        <foreignObject
          x="0"
          y="65.65%"
          text-anchor="middle"
          width="100%"
          height="100"
        >
          <div id="dedication-container" :style="SVGStyle.textColor">
            <!-- <p
              v-for="(line, main) in posterProps.dedication"
              :key="main + '1'"
              class="dedication"
            >
              {{ line }}
            </p> -->
            <p>{{ posterProps.dedication.join("\r\n") }}</p>
          </div>
        </foreignObject>
        <text
          v-if="posterProps.advancedOptions.showLocation"
          font-size="0.8em"
          text-anchor="middle"
          x="50%"
          y="82%"
          :fill="SVGStyle.fillColor"
        >
          {{
            posterProps.advancedOptions.customLocation !== ""
              ? posterProps.advancedOptions.customLocation
              : posterProps.location.locationName
          }}
        </text>
        <text
          v-if="posterProps.advancedOptions.showCoordinates"
          font-size="0.8em"
          text-anchor="middle"
          x="50%"
          y="85%"
          :fill="SVGStyle.fillColor"
        >
          {{ formattedCoordinates }}
        </text>
        <text
          v-if="posterProps.advancedOptions.showDate"
          font-size="0.8em"
          text-anchor="middle"
          x="50%"
          y="87.8%"
          :fill="SVGStyle.fillColor"
        >
          {{
            posterProps.advancedOptions.customDate !== ""
              ? posterProps.advancedOptions.customDate
              : posterProps.dateFormatted
          }}
        </text>
      </svg>
      <p id="posterDimensions">50x70cm</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CanvasCelestial from "./celestial/CanvasCelestial.vue";
import { isSafari, isiOS } from "../util/isSafari";
import { IStarPoster } from "../posterTypes";
import { formatPair } from "@mapbox/sexagesimal";

export default Vue.extend({
  name: "Poster",
  components: {
    CanvasCelestial
  },
  props: {
    posterProps: {
      type: Object as () => IStarPoster,
      required: true
    }
  },
  data() {
    return {
      posterWidth: 500,
      posterHeight: 700,
      logDebugInfo: false,
      isSafari: isSafari || isiOS
    };
  },
  computed: {
    viewBox(): string {
      return [0, 0, this.posterWidth, this.posterHeight].join(" ");
    },
    SVGStyle(): {} {
      return {
        backgroundColor: {
          backgroundColor: this.posterProps.options.lightBackground
            ? this.posterProps.style.backgroundColor
            : this.posterProps.style.mapColor
        },
        textColor: {
          color: this.posterProps.options.lightBackground
            ? this.posterProps.style.textColor
            : this.posterProps.style.starColor
        },
        fillColor: this.posterProps.options.lightBackground
          ? this.posterProps.style.textColor
          : this.posterProps.style.starColor
      };
    },
    formattedCoordinates(): string {
      return formatPair({
        lat: this.posterProps.location.lat,
        lon: this.posterProps.location.long
      });
    }
  },
  methods: {
    //
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sceneContainer {
  width: 100%;
  display: grid;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f1f2f3;
}

.posterContainer {
  min-width: 500px;
}

.Poster {
  height: 92vh;
  width: 65.7vh;
  font-family: "Spectral SC", serif;
  background-color: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.05);
  pointer-events: none;
  user-select: none;
}

#posterDimensions {
  font-family: "Work Sans", "HelveticaNeue", "Helvetica Neue", sans-serif;
  width: 100%;
  margin: 0;
  text-align: center;
  padding-top: 0.5em;
  color: #788188;
}

#dedication-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
  word-wrap: break-word;
  width: 100%;
  white-space: pre-line;
  font-size: 0.99em;
}

#safari-poster {
  text-align: center;
  font-size: 1em;
  height: 92vh;
  width: 65.7vh;
  min-width: 65.7vh;
  margin: 0 auto;
  display: inline-block;
  position: absolute;
  div {
    width: 72%;
    height: auto;
    margin: 12.5% auto 0%;
  }
}

@media screen and (max-width: 999px) {
  .Poster {
    width: unset !important;
    height: unset !important;
    margin: 3% 3% 1% 3% !important;
  }
  #posterDimensions {
    padding: 0 0 1.5% 0;
  }
  #safari-poster {
    text-align: center;
    font-size: 1em;
    height: 0px;
    width: 100%;
    min-width: unset;
    margin: 0 auto;
    display: block;
    overflow: visible;
    canvas {
      width: 68%;
      height: auto;
      margin: 14.5% auto 0%;
    }
  }
}

@media screen and (max-width: 999px) and (min-width: 650px) {
  .posterContainer,
  .sceneContainer {
    min-width: 70vw !important;
  }
}

@media screen and (max-width: 650px) {
  .posterContainer,
  .sceneContainer {
    min-width: 100vw !important;
  }
}

@media print {
  #posterDimensions {
    display: none;
  }
}

// @media screen and (max-width: 768px) and (min-width: 650px) {
//   .posterContainer,
//   .sceneContainer {
//     min-width: 60vw !important;
//   }
// }
</style>
