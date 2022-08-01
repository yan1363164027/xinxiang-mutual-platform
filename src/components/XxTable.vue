<template>
  <!-- 表格 -->
  <div class="wrapper" @scroll="mouseUp">
    <table id="table">
      <tr>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </tr>
      <!-- 列表渲染 -->
      <template v-if="arr.length">
        <tr v-for="item in showTr" :key="item.sos.id">
          <td class="idCode">{{ item.sos.id }}</td>
          <td>
            {{ item.str_time }}
          </td>
          <td class="urgent">
            <button
              @click.prevent
              :class="
                item.sos.extent === '极紧急'
                  ? 'danger'
                  : item.sos.extent === '紧急'
                  ? 'warn'
                  : 'common'
              "
            >
              {{ item.sos.extent }}
            </button>
          </td>
          <td>{{ item.sos.classify }}</td>
          <td class="dealTd">
            <div class="deal">{{ item.sos.abstract }}</div>
          </td>
          <td class="area">{{ item.sos.area }}</td>
          <td>
            <p
              style="color: rgb(24, 144, 255); cursor: pointer"
              @click="showDetail(item)"
            >
              查看
            </p>
          </td>
        </tr>
      </template>
    </table>
    <template v-if="!props.tableData.arr.length">
      <div class="loading">{{ loading }}...</div>
    </template>
  </div>
  <!-- 遮罩层 -->
  <div
    :class="showMark.flag ? 'mark showMark' : 'mark'"
    @click="closeMark"
  ></div>
  <!-- 显示详情 -->
  <div :class="showMark.flag ? 'detail' : 'showDetial detail'">
    <div class="btn"><button @click="closeMark">关闭</button></div>
    <div class="mainContent">
      <p style="font-size: 30px">求助内容：</p>
      <div class="content">
        {{ helpContent.content }}
      </div>
      <div class="">
        联系人：<span>{{ helpContent.name }}</span>
      </div>
      <div class="tel">
        <div>
          联系电话：
          <span v-show="!showTel.tel">xxxxxxxxxxxx</span>
          <span v-show="showTel.tel">{{ helpContent.telephone }}</span>
        </div>
        <button @click="changeShowTel">显示电话</button>
      </div>
      <div class="">
        地址：<span>{{ helpContent.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import XxFooter from "./XxFooter.vue";
import { reactive, ref, toRefs } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
export default {
  name: "Table",
  components: {
    XxFooter,
  },
  props: ["titles", "tableData", "getTableData", "mergeList", "gap", "text"],
  setup(props) {
    let loading = ref("loading");
    let startNum = ref(0); // 开始的索引
    let slider = null; // 容器 wrapper
    let titles = props.titles || []; // 标题
    let tableData = props.tableData;
    let scroll = reactive({
      flag: true, // 节流阀
      wait: 1000, // 定义一个wait变量
      down: true,
    });
    // 是否显示遮罩
    let showMark = reactive({
      flag: false,
    });
    // 是否显示电话号码
    let showTel = reactive({
      tel: false,
    });
    // 定义表格
    // 控制详情显示
    let visible = ref(false);
    // 求助信息详情
    let helpContent = reactive({
      content: "",
      name: "",
      telephone: "",
      address: "",
    });
    // 详情显示
    function showDetail(item) {
      let obj = item.sos.details;
      helpContent["content"] = obj.content;
      helpContent["name"] = obj.name;
      helpContent["telephone"] = obj.telephone;
      helpContent["address"] = obj.address;
      changeMark();
    }

    // 显示电话
    function changeShowTel() {
      showTel.tel = !showTel.tel;
    }
    // 显示遮罩
    function changeMark() {
      showMark.flag = true;
    }
    // 关闭遮罩
    function closeMark() {
      showTel.tel = false;
      showMark.flag = false;
    }
    // 下滑判断是否加载数据（鼠标上滑）
    async function mouseUp() {
      const { scrollHeight, scrollTop, offsetHeight } = slider;
      if (scrollHeight - scrollTop <= offsetHeight && scroll.flag) {
        scroll.flag = false; //必须放在首先执行的位置
        scroll.down = false;
        startNum.value = startNum.value + 20;
        if (startNum.value + 40 >= tableData.arr.length) {
          let res = await props.getTableData();
          props.mergeList(res);
        }
        setTimeout(() => {
          scroll.flag = true;
        }, scroll.wait);
      } else if (scrollTop <= offsetHeight + 200 && !scroll.down) {
        func();
      }
    }
    // 改变startNum.value
    function func() {
      if (startNum.value < 0) {
        startNum.value = 0;
        return;
      }
      startNum.value -= 20;
    }
    // 上滑更改start.value的值（鼠标下滑）
    function touchDown() {
      scroll.down = true;
      const { scrollTop, offsetHeight } = slider;
      if (scrollTop <= offsetHeight + 200) {
        func(scrollTop, offsetHeight);
      }
    }

    /*
      处理一个小问题： 当节流阀关闭且值为false的时候，
      如果此时不触发滚动事件则不会被监听到，导致props不会重新刷新
      因为onMounted设置了定时器，scroll.flag的值会一直修改，所以可以根据这个来判断
      如果用户不 “活动” 当scroll.flag的值改变后，会触发监听重新获取此时的距离，满足条件则继续发送数据
    */
    watch(
      () => scroll.flag,
      async () => {
        mouseUp();
      }
    );
    // 显示的列表
    let showTr = computed(() => {
      return [
        ...tableData.arr.slice(
          startNum.value >= 0 ? startNum.value : 0,
          (startNum.value >= 0 ? startNum.value : 0) + props.gap
        ),
      ];
    });

    // 计算用户上滑还是下滑
    function GetSlideDirection(startX, startY, endX, endY) {
      var dy = startY - endY;
      //var dx = endX - startX;
      var result = 0;
      if (dy > 0) {
        //向上滑动
        result = 1;
      } else if (dy < 0) {
        //向下滑动
        result = 2;
      } else {
        result = 0;
      }
      return result;
    }

    onMounted(async () => {
      slider = document.querySelector(".wrapper");
      //滑动处理
      var startX, startY;
      // touchstart
      document.addEventListener(
        "touchstart",
        function (ev) {
          startX = ev.touches[0].pageX;
          startY = ev.touches[0].pageY;
        },
        false
      );
      // touchend
      document.addEventListener(
        "touchend",
        function (ev) {
          var endX, endY;
          endX = ev.changedTouches[0].pageX;
          endY = ev.changedTouches[0].pageY;
          var direction = GetSlideDirection(startX, startY, endX, endY);
          // 0无滑动  1 向上滑动  2向下滑动
          if (direction === 2) {
            touchDown();
          }
        },
        false
      );

      const device = document.querySelector(".wrapper");
      device.style.height = document.documentElement.clientHeight - 500 + "px";
    });

    return {
      props,
      loading,
      titles,
      startNum,
      showTr,
      visible,
      helpContent,
      showTel,
      showMark,
      mouseUp,
      showDetail,
      changeShowTel,
      changeMark,
      closeMark,
      ...toRefs(tableData),
    };
  },
};
</script>

<style scoped>
.loading {
  position: relative;
  top: 20px;
  width: 100%;
  text-align: center;
  height: 50px;
  font-size: 26px;
  color: grey;
  margin: 0 auto;
}
.mark {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(73, 73, 73, 0.4);
  display: none;
}
.showMark {
  display: block;
}
.detail {
  position: fixed;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  height: 360px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.showDetial {
  display: none;
}
.btn {
  width: 100%;
  height: 40px;
  /* background-color: brown; */
  display: flex;
  justify-content: flex-end;
  margin: 0 auto 0;
}
.btn button {
  border-radius: 5px;
  background-color: white;
  color: grey;
  cursor: pointer;
}
.mainContent {
  width: 90%;
  height: 280px;
  /* background-color: rgb(158, 158, 158); */
  margin: 0 auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 25px;
  color: grey;
}
.mainContent span {
  color: black;
}
.content {
  width: 98%;
  line-height: 36px;
  margin: 0 auto;
  height: auto;
  text-indent: 1em;
  word-wrap: break-word;
  color: black;
  /* 字间距 */
  letter-spacing: 2px;
}
.tel {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tel button {
  width: auto;
  padding: 0 10px;
  background-color: white;
  color: grey;
}
.wrapper {
  width: 100%;
  height: 850px;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 隐藏滚动条 */
.wrapper::-webkit-scrollbar {
  display: none;
}
table {
  position: relative;
  top: 0;
  width: 94%;
  height: auto;
  margin: 0 auto;
  border: none;
}
th {
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
}
td {
  width: 60px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  /* background-color: aquamarine; */
  border-bottom: 1px solid gray;
  padding-top: 15px;
}

.idCode {
  width: 65px;
}
.dealTd {
  width: 100px;
}
.deal {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
button {
  width: 100px;
  height: 40px;
  font-size: 24px;
  border: none;
  border-radius: 5px;
}
.danger {
  background-color: rgb(255, 211, 204);
  color: red;
}
.warn {
  background-color: rgb(248, 220, 179);
  color: rgb(231, 137, 0);
}
.common {
  background-color: rgb(224, 224, 224);
  color: rgb(0, 0, 0);
}
.my-header {
  display: flex;
  justify-content: flex-end;
}
.paging {
  position: relative;
  top: 20px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  font-size: 24px;
}
.urgent {
  width: 100px;
}
.area {
  width: 100px;
}
</style>