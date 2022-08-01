<template>
    <xxheader />
    <router-view />
    <XxFooter />
</template>
<script>
import xxheader from "@/components/XxHeader.vue";
import XxFooter from "@/components/XxFooter.vue"
export default {
  name: "App",
  components: {
    xxheader,
    XxFooter
  },
  setup() {

  },
};
</script>
<style>
#app {
  width: 100%;
  height: auto;
  position: relative;
  max-width: 1620px;
  margin: 0 auto;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
}

.active-router {
  border-bottom: #f00 0.1rem solid;
}
</style>
