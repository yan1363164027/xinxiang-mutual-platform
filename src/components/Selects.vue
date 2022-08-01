<template>
  <div class="selects">
    <div class="addresses">
      <label for="addresses" class="primary">地区* </label>
      <input type="text" placeholder="请选择地区" v-model="areas" @click="showAddresses" @blur="showAddresses" />
      <!-- <el-icon><CaretBottom /></el-icon>
      <el-icon><CaretTop /></el-icon> -->
      <ul style="display: none" ref="diquDom" class="diqu-lists">
        <li v-for="item in addresses" :key="item.value" @mouseenter="areasSelectItim(item.value)">
          {{ item.value }}
        </li>
      </ul>
    </div>

    <div class="category">
      <label for="category" class="primary">类别* </label>
      <input type="text" placeholder="请选择类别" v-model="category" @click="showCategories" @blur="showCategories" />
      <ul style="display: none" ref="leibieDom" class="leibie-lists">
        <li v-for="item in categories" :key="item.value" @mouseenter="categorySelectItim(item.value)">
          {{ item.value }}
        </li>
      </ul>
    </div>

    <div class="degree">
      <label for="degree" class="primary">紧急程度* </label>
      <input type="text" placeholder="请选择程度" v-model="degree" @click="showDegrees" @blur="showDegrees" />
      <ul style="display: none" ref="chengduDom" class="chengdu-lists">
        <li v-for="item in degrees" :key="item.value" @mouseenter="degreeSelectItim(item.value)">
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { CaretBottom, CaretTop } from "@element-plus/icons-vue";
import emitter from "../eventBus"
import { ref } from "@vue/reactivity";
export default {
  name: "MySelects",
  props: ["addresses", "categories", "degrees"],
  // components: { CaretBottom, CaretTop },
  setup() {

    let areas = ref(""); //地区
    let category = ref(""); //分类
    let degree = ref(""); //程度

    // 发送数据
    emitter.on("select", function () {
      emitter.emit("fromSelect", { areas: areas.value, category: category.value, degree: degree.value });
    });

    //#region
    //获取 地区数据列表 节点元素
    let diquDom = ref(null);
    //列表显示与隐藏
    function showAddresses() {
      if (diquDom.value.style.display == "none") {
        diquDom.value.style.display = "block";
      } else {
        diquDom.value.style.display = "none";
      }
    }
    //选择选项
    function areasSelectItim(value) {
      areas.value = value;
    }
    //#endregion

    //#region
    //获取 类别数据列表 节点
    let leibieDom = ref(null);
    //列表显示与隐藏
    function showCategories() {
      if (leibieDom.value.style.display == "none") {
        leibieDom.value.style.display = "block";
      } else {
        leibieDom.value.style.display = "none";
      }
    }
    //选择选项
    function categorySelectItim(value) {
      category.value = value;
    }
    //#endregion

    //#region
    //获取 程度数据列表 节点
    let chengduDom = ref(null);
    //列表显示与隐藏
    function showDegrees() {
      if (chengduDom.value.style.display == "none") {
        chengduDom.value.style.display = "block";
      } else {
        chengduDom.value.style.display = "none";
      }
    }
    //选择选项
    function degreeSelectItim(value) {
      degree.value = value;
    }
    //#endregion

    return {
      areas,
      category,
      degree,
      diquDom,
      leibieDom,
      chengduDom,
      showAddresses,
      showCategories,
      showDegrees,
      areasSelectItim,
      categorySelectItim,
      degreeSelectItim,
    };
  },
};
</script>

<style scoped>
label {
  margin: 40px 0;
  display: inline-block;
  width: 2rem;
  text-align: center;
  font-weight: bold;
}

input {
  width: 60vw;
  height: 60px;
  font-size: 30px;
  text-indent: 10px;
  margin: 15px 0;
  border-radius: 3px;
  border: rgba(153, 153, 153, 0.4) solid 1px;
}

.post-help input:focus {
  /* border: rgba(0,122,204,0.5) solid 1px; */
  /* 边框不用border，用outline */
  outline: 1px solid rgba(0, 122, 204, 0.5);
}

ul {
  position: absolute;
  z-index: 100;
  background: #fff;
  width: 40vw;
  text-align: center;
  left: 420px;
  font-size: 30px;
  border: 1px solid #999;
  height: 300px;
  overflow: scroll;
  border-radius: 10px;
}

ul li {
  padding: 10px 0;
  letter-spacing: 10px;
}

ul li:hover {
  background: rgba(64, 158, 255, 0.5);
  color: #fff;
}

.leibie-lists,
.chengdu-lists {
  height: auto;
  /* overflow: auto; */
  overflow: hidden;
}

/*
::v-deep .el-input__wrapper {
  margin: 15px 0;
  width: 60vw;
  height: 60px;
}

::v-deep .el-icon {
  
    修改 element-ui 默认样式的方法 : 样式穿透
    审查元素找到要修改的样式类名，在该类名前加上 ::v-deep 即可
 
  background-color: white;
}
*/
</style>