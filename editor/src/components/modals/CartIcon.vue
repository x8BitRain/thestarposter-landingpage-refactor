<template>
  <a id="cart-link" href="/cart">
    <div id="cart-wrapper">
      <div v-show="cartItemsNumber > 0" id="cart-number">
        <span>{{ cartItemsNumber }}</span>
      </div>
      <img :src="cartIcon" alt="Cart" />
    </div>
  </a>
</template>

<script>
import Vue from "vue";
import { getCookie } from "@/util/getSetCookies";
import isMobile from "@/util/isMobile";

export default Vue.extend({
  name: "CartIcon",
  data() {
    return {
      isMobile: isMobile,
      cartIcon: require("../../assets/img/cartIcon.svg")
    };
  },
  computed: {
    cartItemsNumber() {
      return getCookie("numberOfItemsInCart");
    }
  }
});
</script>

<style scoped lang="scss">
#cart-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 8px;
  color: #fff;
  text-align: center;
  align-items: center;
  background-color: white;
  img {
    padding: 4px 5px 5px 5px;
  }
}

#cart-number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: white;
  vertical-align: top;
  margin-left: 22px;
  margin-top: -5px;
  text-align: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #2d5385;
  position: absolute;
  span {
    font-weight: 700;
  }
}
</style>