<template>
  <div class="input-container">
    <h2 id="product-headline">
      {{ $t("productSelection") }}
    </h2>
    <div id="currency-selector-container">
      <label for="currency-selector">Currency</label>
      <select id="currency-selector" @change="changeCurrency($event)">
        <option
          v-for="currency in currencies"
          :value="currency.iso"
          :key="currency.iso"
          :selected="currency.default || currency.iso === selectedCurrency"
        >
          {{ currency.iso }}
        </option>
      </select>
      <LoadingSpinner v-show="isLoading" />
    </div>
    <div id="optionInputConfirmation">
      <div class="product-option">
        <h3>
          {{ $t("posterHeadline") }} -
          <span v-if="priceObj">{{ priceString("poster") }}</span>
        </h3>
        <h4>{{ $t("posterSubheadlineMulticurrency") }}</h4>
        <ul>
          <li>{{ $t("posterClaims.1") }}</li>
          <li>{{ $t("posterClaims.2") }}</li>
        </ul>
        <p v-if="delivery">
          {{ delivery.poster.deliverTimeFormatted }}
        </p>
        <a class="product-button" @click="checkoutUrlPrint">
          <button class="btnMenu">
            {{ isEditMode ? $t("posterCartUpdate") : $t("addToCart") }}
          </button>
        </a>
      </div>
      <div class="product-option">
        <h3>
          {{ $t("forexHeadline") }} -
          <span v-if="priceObj">{{ priceString("forex") }}</span>
        </h3>
        <h4 id="our-favorite">
          {{ $t("ourFavorite") }}
          -
          <a @click="toggleForexModal">{{ $t("forexModal.moreInfo") }}</a>
        </h4>
        <h4>{{ $t("forexSubheadline") }}</h4>
        <ul>
          <li>{{ $t("forexClaims.1") }}</li>
          <li>{{ $t("forexClaims.2") }}</li>
        </ul>
        <transition name="fade">
          <p v-if="delivery">
            {{ delivery.forex.deliverTimeFormatted }}
          </p>
        </transition>
        <a class="product-button" @click="checkoutUrlForex">
          <button class="btnMenu">
            {{ isEditMode ? $t("posterCartUpdate") : $t("addToCart") }}
          </button>
        </a>
      </div>
      <div class="product-option">
        <h3>
          {{ $t("pdfHeadline") }} -
          <span v-if="priceObj">{{ priceString("digital") }}</span>
        </h3>
        <h4>{{ $t("pdfSubheadline") }}</h4>
        <ul>
          <li>{{ $t("pdfClaims.1") }}</li>
          <li>{{ $t("pdfClaims.2") }}</li>
          <li>{{ $t("pdfClaims.3") }}</li>
        </ul>
        <a class="product-button" @click="checkoutUrlDigital">
          <button class="btnMenu">
            {{ isEditMode ? $t("posterCartUpdate") : $t("addToCart") }}
          </button>
        </a>
      </div>
    </div>
    <transition name="fade">
      <ForexModal
        v-show="showForexModal"
        @checkout="checkoutUrlForex"
        @close="toggleForexModal"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ForexModal from "../modals/ForexModal.vue";
import LoadingSpinner from "../loaders/LoadingSpinner.vue";
import { getPrices, getCurrencies } from "../../provider/getCurrencies";
import { getCookie, setCookie } from "../../util/getSetCookies";
import { cartUrl } from "../../util/endpointConfig";
import { resetUnsavedPoster } from "../../util/posterLocalStorage";
import { IDBSettings } from "../../provider/makeEditorData";

export default Vue.extend({
  name: "ProductSelect",
  components: {
    ForexModal,
    LoadingSpinner
  },
  props: {
    prices: {
      type: Object,
      required: false
    },
    currencies: {
      type: Array,
      required: false
    },
    delivery: {
      type: Object,
      required: false
    },
    dbSettings: {
      type: Object as () => IDBSettings,
      required: true
    }
  },
  data: () => ({
    priceObj: undefined,
    currenciesArr: undefined,
    selectedCurrency: undefined,
    isLoading: false,
    showForexModal: false
  }),
  computed: {
    checkoutBaseURL() {
      // If the initial poster Id is the same as the current one, then set replaceId to undefined to avoid a cart bug.
      return (
        cartUrl +
        `?productType=starmap&productId=${
          !this.hasPosterId
            ? this.localPosterId
            : this.dbSettings.currentPosterId
        }&replaceId=${
          this.dbSettings.initialPosterId ===
          (this.dbSettings.currentPosterId || this.dbSettings.initialPosterId)
            ? undefined
            : this.dbSettings.initialPosterId
        }`
      );
    },
    hasPosterId() {
      return this.dbSettings.currentPosterId !== undefined;
    },
    isEditMode() {
      const url = new URL(window.location.href);
      return url.searchParams.get("edit");
    },
    localPosterId() {
      return localStorage.getItem("currentPosterId");
    }
  },
  methods: {
    checkoutUrlPrint() {
      this.$router.replace(
        "?posterId=" +
          (this.hasPosterId
            ? this.dbSettings.currentPosterId
            : this.localPosterId)
      );
      resetUnsavedPoster();
      location.href =
        this.checkoutBaseURL + "&lineItemProperties[delivery]=poster";
    },
    checkoutUrlForex() {
      this.$router.replace(
        "?posterId=" +
          (this.hasPosterId
            ? this.dbSettings.currentPosterId
            : this.localPosterId)
      );
      resetUnsavedPoster();
      location.href =
        this.checkoutBaseURL + "&lineItemProperties[delivery]=forex";
    },
    checkoutUrlDigital() {
      this.$router.replace(
        "?posterId=" +
          (this.hasPosterId
            ? this.dbSettings.currentPosterId
            : this.localPosterId)
      );
      resetUnsavedPoster();
      location.href =
        this.checkoutBaseURL + "&lineItemProperties[delivery]=pdf";
    },
    changeCurrency(event) {
      const curr = event.target.value;
      this.isLoading = true;
      setCookie("preferredCurrency", curr, 90);
      getPrices(curr).then(prices => {
        this.priceObj = prices;
        this.isLoading = false;
      });
    },
    priceString(type: string) {
      return [
        this.priceObj.currencySymbol.prefix,
        this.priceObj.prices[type],
        this.priceObj.currencySymbol.postfix
      ].join(" ");
    },
    toggleForexModal() {
      console.log("showing modal");
      this.showForexModal = !this.showForexModal;
    }
  },
  mounted() {
    const preferredCurrency = getCookie("preferredCurrency");
    if (preferredCurrency) {
      this.selectedCurrency = preferredCurrency;
    }
    // I prop is passed from <Menu> move them into data, if props
    // are empty get prices manually.
    if (this.prices && this.currencies) {
      this.priceObj = this.prices;
      this.currenciesArr = this.currencies;
    } else {
      getPrices(this.selectedCurrency).then(prices => {
        this.priceObj = prices;
      });
      getCurrencies().then(currencies => {
        this.currenciesArr = currencies;
      });
    }
  }
});
</script>

<style scoped lang="scss">
#currency-selector-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
  #currency-selector {
    width: fit-content;
    background-color: white;
    border: none;
    transform: scale(0.8);
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("../../assets/img/dropdown.svg");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 4px;
    border: 1px solid #dfdfdf;
    padding: 5px 20px 5px 10px;
  }
}

#product-headline {
  text-align: center;
}

#confirmationInput {
  hr {
    margin: 0 0 20px 0;
  }
}

.product-option {
  margin-bottom: 20px;
  .product-button {
    text-decoration: none;
    button {
      width: 100%;
    }
  }
  #our-favorite {
    margin: 5px 0 10px 0;
    color: black;
    cursor: pointer;
    a {
      color: #0000ee;
      font-size: 17px;
      letter-spacing: 1px;
      text-decoration: none;
    }
    &::first-letter {
      color: red;
      font-size: 1.2em;
    }
  }
  p {
    text-align: center;
    color: darkgreen;
    font-weight: 900;
    margin-top: -5px;
    margin-bottom: 15px;
  }
  h3,
  h4 {
    text-align: center;
  }
  h3 {
    margin: 5px 40px 5px 40px;
  }
  h4 {
    color: #707070;
  }
}

ul {
  list-style-type: disc;
  padding: 0;
  margin-left: 2em;
}

li {
  display: list-item;
  color: #788188;
  margin-bottom: 0.4em;
}
</style>
