<template>
  <div class="footer">
    <p>豫ICP备10086111号-1</p>
  </div>
</template>

<script>
export default {
  name: "XxFooter",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  margin-top: 30px;
  position: relative;
  width: 100%;
  height: 0.5rem;
  bottom: 0px;
}
p {
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.5rem;
  color: #777;
}
</style>
