<template>
  <div class="mySelect">
    <label for="" @click="showList = !showList">
      <input
        type="text"
        name=""
        id=""
        :placeholder="props.placeholderVal.value"
        @blur="onBlur($event)"
        :value="checkedVal === '全部' ? '' : checkedVal"
        readonly="readonly"
      />
      <i
        :class="
          showList
            ? 'iconfont icon-shangjiantou arrowTransform'
            : 'iconfont icon-shangjiantou arrowTransformReturn'
        "
      ></i>
    </label>
    <transition name="list">
      <div class="option" v-show="showList">
        <ul>
          <li
            v-for="item in arr"
            :key="item.id"
            @click="selectVal(item.value)"
            :class="checkedVal == item.value ? 'active' : ''"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "MySelect",
  props: ["arr", "changeFunc", "placeholderVal"],
  setup(props) {
    let arr = props.arr;
    let showList = ref(false);
    let checkedVal = ref("");
    let timer = null;
    const selectVal = (e) => {
      checkedVal.value = e;
      showList.value = false;
      props.changeFunc(checkedVal.value);
    };
    const onBlur = (e) => {
      timer = setTimeout(() => {
        showList.value = false;
        clearTimeout(timer);
      }, 100);
    };

    onMounted(() => {
      checkedVal.value = props.placeholderVal.value;
    });
    return {
      arr,
      showList,
      checkedVal,
      props,
      onBlur,
      selectVal,
    };
  },
};
</script>

<style scoped>
.mySelect {
  position: relative;
  top: 10px;
  left: -5px;
}
input {
  width: 200px;
  height: 40px;
  font-size: 24px;
  border: 1px solid rgb(220, 223, 230);
  text-indent: 0.2em;
  border-radius: 5px;
  color: black;
  caret-color: transparent;
  outline: rgb(64, 158, 255);
  background-color: #fff;
  cursor: pointer;
}
input:focus {
  border: 1px solid rgb(64, 158, 255);
}
input::-webkit-input-placeholder {
  color: grey;
}
.option {
  width: 200px;
  top: 10px;
  position: relative;
  overflow-y: scroll;
  background-color: aqua;
}
ul {
  position: fixed;
  width: 200px;
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(84, 84, 84);
  border-radius: 5px;
  box-shadow: 2px 2px 15px 6px rgb(205, 205, 205);
}

@keyframes list {
  from {
    transform: translateY(0px);
    height: 0px;
    box-shadow: 2px 2px 15px 6px rgb(255, 255, 255);
    background-color: rgb(255, 255, 255);
    z-index: 1000;
    overflow-y: hidden;
  }
  to {
    transform: translateY(0px);
    height: 200px;
    box-shadow: 2px 2px 15px 6px rgb(205, 205, 205);
    background-color: rgb(255, 255, 255);
    z-index: 1000;
    overflow-y: hidden;
  }
}
.list-enter-active {
  animation: list 0.15s;
}
.list-leave-active {
  animation: list 0.15s reverse;
}
.option li {
  text-indent: 0.2em;
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  margin: 10px 0;
}
ul::-webkit-scrollbar {
  display: none;
}
ul li:hover {
  background-color: rgb(245, 247, 250);
}
.active {
  background-color: rgb(200, 229, 251);
}
i {
  font-size: 40px;
  font-weight: 200;
  position: absolute;
  top: 0px;
  right: 0px;
  color: #8a8a8a;
}
.arrowTransform {
  transition: 0.3s;
  transform-origin: center;
  transform: rotate(180deg) scale(0.5);
}

.arrowTransformReturn {
  transition: 0.3s;
  transform-origin: center;
  transform: rotate(0deg) scale(0.5);
}
</style>