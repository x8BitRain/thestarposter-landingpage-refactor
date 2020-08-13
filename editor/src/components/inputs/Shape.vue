<template>
  <div class="input-container">
    <label for="Shape">{{ $t("subheadShape") }}</label>
    <div id="shape-container">
      <label for="Circle">
        <img
          src="../../assets/img/shape_circle.svg"
          alt="Circle"
          :style="shape === 'heart' ? 'opacity: 0.25' : null"
        />
      </label>
      <input
        type="radio"
        id="Circle"
        name="Circle"
        :checked="shape === 'circle'"
        @click="onShapeChange"
        value="circle"
        hidden
      />
      <label for="Heart">
        <img
          src="../../assets/img/shape_heart.svg"
          alt="Heart"
          :style="shape === 'circle' ? 'opacity: 0.25' : null"
        />
      </label>
      <input
        type="radio"
        id="Heart"
        name="Heart"
        :checked="shape === 'circle'"
        @click="onShapeChange"
        value="heart"
        hidden
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";

export default Vue.extend({
  name: "Shape",
  model: {
    prop: "shape",
    event: "change"
  },
  props: {
    shape: {
      type: String,
      required: true
    }
  },
  data: () => ({
    //
  }),
  methods: {
    onShapeChange(event): void {
      const target = event.target as HTMLTextAreaElement;
      this.$emit("change", target.value);
    }
  }
});
</script>

<style scoped lang="scss">
#shape-container {
  display: flex;
  column-gap: 6px;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 45px;
  }
  label {
    cursor: pointer;
  }
}
@media screen and (max-width: 999px) {
  #shape-container {
    img {
      height: 75px;
    }
  }
}
</style>
