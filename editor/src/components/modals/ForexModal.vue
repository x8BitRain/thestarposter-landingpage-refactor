<template>
  <div id="forexmodal">
    <div class="closeout" @click="close" />
    <button class="closebtn" @click="close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <div
      :class="isIOS ? 'modal-container modal-container-ios' : 'modal-container'"
    >
      <button class="closebtn mob" @click="close">
        X
      </button>
      <div class="modal-img" />
      <div class="modal-text">
        <h1>{{ $t("forexModal.headline") }}</h1>
        <h2>{{ $t("forexModal.subheadline") }}</h2>
        <p>{{ $t("forexModal.info") }}</p>
        <div class="modal-buttons">
          <a id="buttonFwd" @click="onCheckout">
            <button id="buttonFwd">
              {{ $t("addToCart") }}
            </button>
          </a>
          <button id="buttonPrev" @click="close">
            {{ $t("back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { isiOS } from "../../util/isSafari";
export default Vue.extend({
  name: "ForexModal",
  data() {
    return {
      isIOS: isiOS
    };
  },
  // mounted() {
  //   window.addEventListener(
  //     "hashchange",
  //     e => {
  //       const modal = document.querySelector("#forexmodal") as HTMLElement;
  //       if (window.location.hash.includes("forexmodal") && modal !== null) {
  //         modal.style.display = "block";
  //       } else {
  //         modal.style.display = "none";
  //       }
  //     },
  //     false
  //   );
  // },
  methods: {
    onCheckout() {
      this.$emit("checkout");
    },
    close() {
      this.$emit("close");
    }
  }
});
</script>

<style scoped lang="scss">
#forexmodal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1001; /* Sit on top */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  .closebtn {
    cursor: pointer;
    background-color: var(--btn-primary);
    border: none;
    border-radius: 100%;
    margin: 20px;
    height: 40px;
    width: 40px;
    user-select: none;
  }
  .mob {
    margin: 10px;
    font-size: 1.2em;
    font-weight: 900;
    color: white;
    line-height: 0;
    background-color: transparent !important;
  }
}
.modal-container {
  max-width: 30em;
  min-width: 30em;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.closeout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
}
.modal-container > button {
  display: none;
}
.modal-buttons {
  display: flex;
  column-gap: 8px;
  a {
    text-decoration: none;
  }
}
.modal-img {
  background-image: url("../../assets/img/forex_example-wide.jpg");
  background-image: image-set(
    url("../../assets/img/forex_example-wide.jpg") 1x,
    url("../../assets/img/forex_example-wide2x.jpg") 2x,
    url("../../assets/img/forex_example-wide3x.jpg") 3x
  );
  background-image: -webkit-image-set(
    url("../../assets/img/forex_example-wide.jpg") 1x,
    url("../../assets/img/forex_example-wide2x.jpg") 2x,
    url("../../assets/img/forex_example-wide3x.jpg") 3x
  );
  background-size: cover;
  background-position: center;
  height: 60vh;
}
.modal-text {
  background-color: white;
  padding: 30px;
  h1 {
    margin: 0;
    font-size: 1.8em;
  }
  h2 {
    margin: 0;
    font-size: 1.4em;
  }
  p {
    margin-bottom: 10px;
  }
}
@media only screen and (max-width: 768px) {
  .modal-container {
    min-width: 30em;
  }
}

@media only screen and (max-width: 500px) {
  .modal-img {
    height: auto !important;
  }
  .modal-btn {
    margin: 0 auto;
  }
  .modal-container {
    top: 45%;
    display: grid;
    grid-template-rows: 1.5fr min-content;
    min-width: 90%;
    min-height: 85%;
  }
  .modal-container-ios {
    top: 49% !important;
  }
  .modal-container-ios .modal-img {
    height: unset !important;
  }
  .modal-container > button {
    display: block !important;
    position: absolute;
  }
  #forexmodal > button {
    display: none !important;
  }
  .modal-text {
    padding: 20px !important;
    h1 {
      font-size: 20px;
      line-height: 1.2em;
    }
    h2 {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
  }
}
@media only screen and (max-height: 640px) {
  /* iphone SE fix */
  .modal-img {
    height: 75vh !important;
  }
  .modal-container {
    top: 45%;
  }
  #buttonProduct {
    width: 115px !important;
  }
}
</style>
