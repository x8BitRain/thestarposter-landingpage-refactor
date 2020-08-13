<template>
  <div class="input-container">
    <details>
      <summary @click="onOptionsExpand">
        <div id="advanced-options-headline">
          <p>{{ $t("advancedHeadline") }}</p>
          <p>{{ expanded ? "-" : "+" }}</p>
        </div>
      </summary>
      <p>{{ $t("advancedOpts.customDisclaimer") }}</p>
      <input
        type="text"
        ref="customLocation"
        name="CustomLocation"
        maxlength="40"
        :style="customLocationStyle"
        :placeholder="$t('advancedOpts.customLocation')"
        :value="advancedOptions.customLocation"
        @input="onCustomLocationChange"
      />
      <input
        type="text"
        ref="customDate"
        name="CustomDate"
        maxlength="40"
        :style="customDateStyle"
        :placeholder="$t('advancedOpts.customDate')"
        :value="advancedOptions.customDate"
        @input="onCustomDateChange"
      />
      <div class="options-checkbox-container">
        <div class="options-checkbox" @click="onShowLocationToggle">
          <label for="showLocation">{{ $t("advancedOpts.location") }}</label>
          <input
            id="showLocation"
            name="showLocation"
            type="checkbox"
            :checked="advancedOptions.showLocation"
          />
        </div>
        <div class="options-checkbox" @click="onShowCoordinatesToggle">
          <label for="showCoordinates">{{
            $t("advancedOpts.coordinates")
          }}</label>
          <input
            id="showCoordinates"
            name="showCoordinates"
            type="checkbox"
            :checked="advancedOptions.showCoordinates"
          />
        </div>
        <div class="options-checkbox" @click="onShowDateToggle">
          <label for="showDate">{{ $t("advancedOpts.date") }}</label>
          <input
            id="showDate"
            name="showDate"
            type="checkbox"
            :checked="advancedOptions.showDate"
          />
        </div>
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";
import { IAdvancedOptions } from "../../posterTypes";

export default Vue.extend({
  name: "AdvancedOptions",
  props: {
    advancedOptions: {
      type: Object as () => IAdvancedOptions,
      required: true
    }
  },
  data: () => ({
    expanded: false
  }),
  computed: {
    customLocationStyle(): string | null {
      return this.advancedOptions.customLocation.length === 40
        ? "border: 1px solid red"
        : null;
    },
    customDateStyle(): string | null {
      return this.advancedOptions.customDate.length === 40
        ? "border: 1px solid red"
        : null;
    }
  },
  methods: {
    onCustomLocationChange(event): void {
      const target = event.target as HTMLTextAreaElement;
      this.advancedOptions.customLocation = target.value;
    },
    onCustomDateChange(event): void {
      const target = event.target as HTMLTextAreaElement;
      this.advancedOptions.customDate = target.value;
    },
    onShowLocationToggle() {
      this.advancedOptions.showLocation = !this.advancedOptions.showLocation;
    },
    onShowCoordinatesToggle() {
      this.advancedOptions.showCoordinates = !this.advancedOptions
        .showCoordinates;
    },
    onShowDateToggle() {
      this.advancedOptions.showDate = !this.advancedOptions.showDate;
    },
    onOptionsExpand() {
      this.expanded = !this.expanded;
    }
  }
});
</script>

<style scoped lang="scss">
summary {
  //margin: 20px 0 10px 0;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  color: #788188;
  transition: 0.2s;
  list-style-type: none;
  #advanced-options-headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5em;
    p {
      margin: 0;
      font-weight: 600;
    }
  }
  p {
    font-size: 1.1em;
    line-height: 0px;
    font-weight: 100;
  }
  &::-webkit-details-marker {
    display: none;
  }
  &:hover {
    color: black;
  }
}

.options-checkbox:nth-child(-n + 2) {
  border-bottom: 1px solid #e5e5e5;
}

details {
  margin-bottom: 2.3em;
  p {
    margin-bottom: 10px;
  }
  input[type="text"] {
    margin-bottom: 8px;
  }
}
</style>
