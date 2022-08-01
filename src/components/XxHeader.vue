<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="right">
      <div class="title">
        <div class="first_title">我们来帮你</div>
        <div class="second_title">新乡抗疫互助</div>
      </div>
      <div class="connect_us">
        <ul>
          <li>
            <router-link to="/home">求助sos</router-link>
            <!-- <router-link to="/home">求助sos</router-link> -->
          </li>
          <li>
            <router-link to="/post">发布求助</router-link>
            <!-- <router-link to="/post">发布求助</router-link> -->
          </li>
          <li>
            <router-link to="/about">联系我们</router-link>
            <!-- <router-link to="/about">联系我们</router-link> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XxHeader",
  props: {
    msg: String,
  },
  setup() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  height: 110px;
  display: flex;
  background-color: rgb(250, 250, 250);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo img {
  width: 120px;
  height: 0.75rem;
}
.title {
  margin-left: 0.5rem;
  font-size: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.connect_us ul {
  list-style: none;
  margin: 0px;
  display: flex;
  justify-content: end;
}
.connect_us ul li {
  width: 1.5rem;
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  text-align: center;
}
a {
  text-decoration: none;
}
.right {
  width: 600px;
  display: flex;
  justify-content: space-between;
}
</style>
