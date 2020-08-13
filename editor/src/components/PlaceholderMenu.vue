<template>
  <div id="menu">
    <div class="menu-container">
      <LoadingSpinner id="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingSpinner from "./loaders/LoadingSpinner.vue";

export default Vue.extend({
  name: "PlaceholderMenu",
  components: {
    LoadingSpinner
  }
});
</script>

<style scoped lang="scss">
#menu {
  display: flex;
  flex-flow: column;
  width: 31em;
  background-color: white;
  text-align: left;
  #loading {
    transform: scale(2);
  }
  .menu-container {
    padding: 25px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 999px) {
  #menu {
    width: 100%;
    height: 100%;
  }
  .menu-container {
    max-width: unset;
    min-width: 200px;
    margin: 0 auto;
    min-height: 45vh;
  }
}

@media print {
  #menu {
    display: none;
  }
}
</style>
