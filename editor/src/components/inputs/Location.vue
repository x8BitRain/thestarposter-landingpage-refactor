<template>
  <div class="input-container">
    <label for="Location" ref="label">{{ $t("place") }}</label>
    <input
      type="text"
      name="Location"
      ref="locationInput"
      autocomplete="off"
      :value="inputVal"
      :placeholder="inputVal"
      @keyup="onKeyChange"
      @click="clearInput"
      @blur="onInputBlur"
    />
    <div id="location-result-container">
      <div
        class="location-result"
        v-for="result in searchResults"
        :key="result.place_id"
        @click="onLocationSelected(result)"
      >
        {{ result.structured_formatting.main_text }}
        <small>{{ result.structured_formatting.secondary_text }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../../assets/css/inputs.scss";
import debouncedAutoComplete, {
  IAutocompleteResult
} from "../../provider/autocompleteProvider";
import geolocation from "../../provider/geolocationProvider";
import { ILocation } from "../../posterTypes";

export default Vue.extend({
  name: "Location",
  model: {
    prop: "location",
    event: "change"
  },
  props: {
    location: {
      type: Object as () => ILocation,
      required: true
    }
  },
  data: () => ({
    currentSearchTerm: undefined,
    searchResults: [],
    isSearching: false,
    isResultsFocused: false,
    inputCleared: false
  }),
  computed: {
    inputVal: function() {
      return this.currentSearchTerm !== undefined
        ? this.currentSearchTerm
        : this.location.locationName;
    }
  },
  methods: {
    async onLocationSelected(result: IAutocompleteResult): Promise<void> {
      this.isSearching = false;
      this.$refs.locationInput.style = "border: none";
      this.$refs.label.style = "color: initial";
      this.$emit("error", "none");
      this.currentSearchTerm = undefined;
      this.searchResults = [];

      const locationResult = await geolocation(
        result.place_id,
        result.structured_formatting.main_text
      );

      this.$emit("change", {
        locationName: result.structured_formatting.main_text,
        lat: locationResult.lat,
        long: locationResult.lon
      });
    },
    async onKeyChange(event): Promise<void> {
      this.currentSearchTerm = event.target.value;
      this.isSearching = true;
      this.$emit("error", "silent");
      const result = await debouncedAutoComplete(event.target.value);
      // The user might have continued typing so that this request went stale, if yes we can discard it
      if (event.target.value !== this.currentSearchTerm) {
        return;
      }
      this.searchResults = result;
      // this.$emit("error", "none");
    },
    clearInput() {
      if (!this.inputCleared) {
        this.$refs.locationInput.value = "";
        this.inputCleared = true;
      }
    },
    onInputBlur() {
      // 100ms delay on this check as to prevent a short flash of red box outline.
      setTimeout(() => {
        if (this.isSearching) {
          this.$refs.locationInput.style = "border: solid 1px red";
          this.$refs.label.style = "color: #ff4d4d";
          this.$emit("error", "visible");
        }
      }, 100);
    }
  }
});
</script>

<style scoped lang="scss">
#location-result-container {
  .location-result {
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    padding: 8px 10px 8px 10px;
    cursor: pointer;
    user-select: none;
    &:last-child {
      border-bottom: 1px solid #e3e3e3;
    }
    &:hover {
      background-color: #e5e5e5;
    }
  }
}
</style>
