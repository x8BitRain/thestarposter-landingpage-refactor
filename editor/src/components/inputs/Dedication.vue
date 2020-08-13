<template>
  <div class="input-container">
    <h3 for="Dedication">{{ $t("dedicationHeadline") }}</h3>
    <label>
      {{
        hasError ? $t("dedicationErrors." + errorTxt) : $t("dedicationHelper")
      }}
    </label>
    <textarea
      type="text"
      name="Dedication"
      maxlength="140"
      rows="3"
      :style="style"
      :value="dedication.join('\n')"
      :placeholder="$t('dedicationPlaceholder2')"
      @input="onDedicationChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";
import isMobile from "../../util/isMobile";
import {
  lineBreaker,
  lineTooLong,
  filterIllegalCharacters
} from "../../util/inputTools";

export default Vue.extend({
  name: "Dedication",
  model: {
    prop: "dedication",
    event: "change"
  },
  props: {
    dedication: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    style: "",
    hasError: false,
    errorTxt: "tooManyLines",
    isMobile: isMobile
  }),
  methods: {
    onDedicationChange(event): void {
      const target = event.target as HTMLTextAreaElement;
      const cleanStr = filterIllegalCharacters(target.value);
      const lines = lineBreaker(cleanStr);
      if (lines.length > 3) {
        this.style = "border: 1px solid red";
        this.hasError = true;
        this.errorTxt = "tooManyLines";
      } else if (lineTooLong(lines)) {
        this.style = "border: 1px solid red";
        this.hasError = true;
        this.errorTxt = "lineExceeded";
      } else {
        this.style = "";
        this.hasError = false;
        this.$emit("change", lines);
      }
    }
  }
});
</script>

<style scoped lang="scss">
//
</style>
