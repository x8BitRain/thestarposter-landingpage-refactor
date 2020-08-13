<template>
  <div class="input-container">
    <h3>{{ $t("layoutHeadline") }}</h3>
    <label for="Theme">{{ $t("subheadTheme") }}</label>
    <div id="theme-select">
      <div
        v-for="(color, index) in themes"
        :key="color.id"
        class="color-container"
      >
        <input
          :id="index"
          name="colorSelector"
          type="radio"
          :checked="index === currentTheme"
        />
        <label
          class="color-picker"
          :for="index"
          :id="index"
          @click="onStyleChange"
          :style="{
            background: color.mapColor
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";
import { IColor } from "../../posterTypes";
import styles from "../../styles";

export default Vue.extend({
  name: "Theme",
  model: {
    prop: "theme",
    event: "change"
  },
  props: {
    theme: {
      type: Object as () => IColor,
      required: true
    }
  },
  data: () => ({
    themes: styles
  }),
  computed: {
    currentTheme(): string {
      return this.theme.name;
    }
  },
  methods: {
    onStyleChange(event): void {
      const target = event.target as HTMLTextAreaElement;
      this.$emit("change", this.themes[target.id]);
    }
  },
  mounted() {
    //
  }
});
</script>

<style scoped lang="scss">
label > span {
  font-size: 0.78em;
  color: #898989;
}

h3 {
  margin-bottom: 11px;
}

#theme-select {
  margin-top: 0.3em;
  margin-bottom: 10px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  width: 85%;
  label {
    box-sizing: border-box;
  }
  input[type="radio"] {
    display: none;
  }
  input[type="radio"]:checked + .color-picker {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15),
      inset 0 0 0px 1px rgba(255, 255, 255, 1);
    border: 3px solid #2d5385;
  }
  label {
    &:hover {
      box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15),
        inset 0 0 0px 1px rgba(255, 255, 255, 1);
      border: 3px solid #2d5385;
      z-index: 10;
    }
  }
}
.color-container {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  margin-right: 3px;
  margin-bottom: 3px;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  &:last-child {
    margin-right: 0;
  }
}
.color-picker {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  cursor: pointer;
  box-sizing: border-box;
}

@media screen and (max-width: 999px) {
  .color-container {
    width: 65px;
    height: 65px;
  }
  #theme-select {
    width: 100%;
  }
}
</style>
