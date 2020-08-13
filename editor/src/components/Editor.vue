<template>
  <div id="app">
    <CartIcon v-if="!isPrintMode" />
    <PlaceholderMenu v-if="!translationLoaded.loaded" />
    <transition name="fade">
      <Menu
        v-if="translationLoaded.loaded && !isLoading"
        :poster-props="poster"
        :db-settings="dbSettings"
      />
    </transition>
    <transition name="fade">
      <Poster :poster-props="poster" v-if="!isLoading" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Poster from "./Poster.vue";
import Menu from "./Menu.vue";
import PlaceholderMenu from "./PlaceholderMenu.vue";
import CartIcon from "./modals/CartIcon.vue";
import makeEditorData, { IEditorData } from "../provider/makeEditorData";

export default Vue.extend({
  name: "editor",
  data(): IEditorData {
    return makeEditorData();
  },
  computed: {
    dateOfBirth(): Date | undefined {
      if (this.isLoading === false) {
        return this.poster.date;
      }
      return undefined;
    }
  },
  components: {
    Poster,
    Menu,
    PlaceholderMenu,
    CartIcon
  }
});
</script>

<style scoped lang="scss">
@import url("../assets/css/global.scss");
@import url("../assets/css/printMode.scss");

#app {
  height: 100%;
  width: 100vw;
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1f2f3;
  overflow-x: hidden;
}

@media screen and (max-width: 999px) {
  #app {
    flex-direction: column-reverse;
    overflow-y: auto;
  }
}
</style>
