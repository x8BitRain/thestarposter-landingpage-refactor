<template>
  <div id="menu">
    <div class="menu-container" :style="useMaxWidth">
      <a href="/">
        <img id="logo" :src="useLogo" alt="Nachthimmel.de" />
      </a>
      <div v-show="shouldRoute('/')">
        <h3>{{ $t("placeAndLocation") }}</h3>
        <p>
          {{ $t("placeAndLocationHelper") }}
        </p>
        <Location v-model="posterProps.location" @error="onError" />
        <DatePicker
          v-model="posterProps.date"
          :display-time="posterProps.displayTime"
          @dateFormatted="updateFormattedDate"
        />
        <AdvancedOptions :advanced-options="posterProps.advancedOptions" />
      </div>
      <div v-show="shouldRoute('/dedication')">
        <Dedication v-model="posterProps.dedication" />
      </div>
      <br v-show="!isMobile" />
      <div v-show="shouldRoute('/layout')">
        <Theme v-model="posterProps.style" />
        <Shape v-model="posterProps.shape" />
        <Options :options="posterProps.options" />
      </div>
      <div v-show="shouldRoute('/products', true)">
        <ProductSelect
          :prices="prices"
          :currencies="currencies"
          :delivery="deliveryTimes"
          :db-settings="dbSettings"
        />
      </div>
      <br v-show="!isMobile" />
    </div>
    <div class="menu-footer">
      <button @click="$router.go(-1)" id="buttonPrev" class="nonprio">
        {{ $t("back") }}
      </button>
      <router-link
        id="buttonFwd"
        v-if="showNextBtn"
        :to="nextPage()"
        :style="hasError === 'silent' ? 'pointer-events: none' : null"
      >
        <button
          id="buttonFwd"
          @click="savePoster"
          :disabled="hasError === 'visible'"
        >
          {{ $t("continue") }}
        </button>
      </router-link>
    </div>
    <br v-show="isMobile" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IDBSettings } from "../provider/makeEditorData";
import { IStarPoster } from "../posterTypes";
import { getPrices, getCurrencies } from "../provider/getCurrencies";
import { getCookie } from "../util/getSetCookies";
import { language } from "../util/language";
import { savePoster } from "../provider/endpoint";
import { writePosterLocalStorage } from "../util/posterLocalStorage";
import getDeliveryTimes from "../provider/getDeliveryTimes";
import isMobile from "../util/isMobile";
import Location from "./inputs/Location.vue";
import DatePicker from "./inputs/DatePicker.vue";
import AdvancedOptions from "./inputs/AdvancedOptions.vue";
import Dedication from "./inputs/Dedication.vue";
import Theme from "./inputs/Theme.vue";
import Shape from "./inputs/Shape.vue";
import Options from "./inputs/Options.vue";
import ProductSelect from "./inputs/ProductSelect.vue";
import urlParameters from "@/util/urlParameters";

export default Vue.extend({
  name: "Menu",
  data: () => ({
    isMobile: isMobile,
    currencies: undefined,
    prices: undefined,
    selectedCurrency: undefined,
    deliveryTimes: undefined,
    hasError: "none"
  }),
  components: {
    Location,
    DatePicker,
    AdvancedOptions,
    Dedication,
    Theme,
    Shape,
    Options,
    ProductSelect
  },
  props: {
    posterProps: {
      type: Object as () => IStarPoster,
      required: true
    },
    dbSettings: {
      type: Object as () => IDBSettings,
      required: true
    }
  },
  methods: {
    randomPlace() {
      this.posterProps.lat = Math.random() * 180 - 90;
      this.posterProps.long = Math.random() * 360 - 180;
    },
    updateFormattedDate(formattedDate: string, displayTime: boolean) {
      this.posterProps.dateFormatted = formattedDate;
      this.posterProps.displayTime = displayTime;
    },
    shouldRoute(page: string, productSelect = false): boolean | undefined {
      if (!isMobile) {
        if (!productSelect && this.$route.path === "/") {
          return true;
        }
        if (productSelect && this.$route.path === "/") {
          return false;
        }
        if (productSelect && this.$route.path === page) {
          return true;
        }
        // Bugfix for new editor getting old editor routes.
        if (productSelect && this.$route.path === "/confirm") {
          return true;
        }
      }
      // Bugfix for new editor getting old editor routes.
      if (isMobile && this.$route.path === "/confirm") {
        return true;
      }
      if (isMobile) {
        return this.$route.path === page;
      }
    },
    nextPage(): string | Error {
      if (isMobile) {
        if (this.$route.path === "/") {
          return "/dedication";
        } else if (this.$route.path === "/dedication") {
          return "/layout";
        } else if (this.$route.path === "/layout") {
          return "/products";
        } else {
          throw new Error("Unknown route: " + this.$route.path);
        }
      } else {
        if (this.$route.path === "/") {
          return "/products";
        }
        // Bugfix for new editor getting old editor routes.
        if (this.$route.path === "/confirm") {
          return "";
        }
        throw new Error("Unable to get next page at " + this.$route.path);
      }
    },
    async savePoster(): Promise<void> {
      if (this.nextPage() === "/products") {
        this.$set(this.dbSettings, "currentPosterId", undefined);
        const posterId = await savePoster(this.posterProps);
        this.$set(this.dbSettings, "currentPosterId", posterId);
        this.$set(this, "dbSettings", this.dbSettings);
        localStorage.setItem("currentPosterId", posterId);
      }
    },
    onError(displayError: "silent" | "visible" | "none") {
      this.hasError = displayError;
    }
  },
  computed: {
    showNextBtn(): boolean {
      return this.$route.path !== "/products";
    },
    useMaxWidth() {
      // bug with textarea width prevents it's container from expanding.
      return this.$route.path === "/dedication" && isMobile
        ? "width: 100vw;"
        : null;
    },
    useLogo() {
      return language === "de"
        ? require("../assets/img/logo-de.png")
        : require("../assets/img/logo.svg");
    }
  },
  watch: {
    posterProps: {
      deep: true,
      handler() {
        writePosterLocalStorage(this.posterProps);
      }
    }
  },
  mounted() {
    const preferredCurrency = getCookie("preferredCurrency");
    if (preferredCurrency) {
      this.selectedCurrency = preferredCurrency;
    }
    // Preload prices and delivery times before product select is shown, then pass as props.
    getDeliveryTimes().then(times => {
      this.deliveryTimes = times;
    });
    getPrices(this.selectedCurrency).then(prices => {
      this.prices = prices;
    });
    getCurrencies().then(currencies => {
      this.currencies = currencies;
    });
  }
});
</script>

<style scoped lang="scss">
#menu {
  font-family: "Work Sans", "HelveticaNeue", "Helvetica Neue", sans-serif;
  display: flex;
  flex-flow: column;
  width: 31em;
  background-color: white;
  text-align: left;
  .menu-container {
    padding: 25px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    p {
      padding-right: 1px;
    }
  }
  .menu-footer {
    padding: 1.5em;
    display: flex;
    height: auto;
    border-top: 1px solid #e5e5e5;
    column-gap: 15px;
    a {
      text-decoration: none;
    }
    #buttonFwd {
      flex: 2;
      button {
        width: 100%;
        height: 100%;
        margin: 0;
        line-height: 0;
      }
      &:disabled {
        background-color: #dddddd;
        cursor: not-allowed;
      }
    }
    #buttonPrev {
      flex: 1;
      background-color: #f5f5f5;
      margin: 0;
      &:disabled {
        color: #cccccc;
        cursor: not-allowed;
      }
    }
  }
  #logo {
    margin: 10px 10px 10px 0;
    user-select: none;
    pointer-events: none;
  }
  .input-container:first-of-type {
    margin-top: 10px;
  }
}

button#buttonPrev {
  background-color: #fff;
  color: #3d4246;
  border: none;
}

button#buttonFwd,
button#buttonPrev {
  padding: 0.75em;
  box-shadow: none;
}

@media screen and (max-width: 999px) {
  #menu {
    width: 100%;
  }
  .menu-container {
    max-width: unset;
    min-width: 200px;
    margin: 0 auto;
  }
  #logo {
    display: none;
  }
}

@media print {
  #menu {
    display: none;
  }
}
</style>
