<template>
  <div>
    <div class="loading">...</div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "LoadingSpinner"
});
</script>
<style scoped lang="css">
.loading,
.loading:after {
  border-radius: 50%;
  width: 1em;
  height: 1em;
}
.loading {
  position: relative;
  text-indent: -9999em;
  border-top: 5px solid rgba(121, 121, 121, 0.2);
  border-right: 5px solid rgba(121, 121, 121, 0.2);
  border-bottom: 5px solid rgba(121, 121, 121, 0.2);
  border-left: 5px solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

loading {
  position: absolute;
  right: 25%;
}

@media only screen and (max-width: 768px) {
  loading {
    right: 55px;
  }
  .loading {
    border-radius: 50%;
    width: 0.6em;
    height: 0.6em;
  }
}
</style>
