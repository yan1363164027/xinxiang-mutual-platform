<template>
  <div class="home_home">
    <div class="home_head">
      <div class="home_top">
        <div>
          最新求助更新时间：{{}} <button @click="toHelp">发布求助信息</button>
        </div>
      </div>
      <div class="home_limit">
        <div>
          <label for="in_three_hours"
            ><input
              type="checkbox"
              :checked="query.condition.in_three_hours > 0 ? true : false"
              @click="changeTime"
              id="in_three_hours"
            />
            只看三小时</label
          >
        </div>
      </div>
      <div class="home_classification">
        <div class="home_item">
          <span>紧急程度 </span>
          <MySelect
            :arr="urgent"
            :changeFunc="choseExtent"
            :placeholderVal="urgent[0]"
          />
        </div>
        <div class="home_item">
          分类
          <MySelect
            :arr="category"
            :changeFunc="choseClassify"
            :placeholderVal="category[0]"
          />
        </div>
        <div class="home_item">
          地址
          <MySelect
            :arr="areas"
            :changeFunc="choseArea"
            :placeholderVal="areas[0]"
          />
        </div>
      </div>
      <div class="home_progress">
        <div class="home_progressItem">
          <i
            class="iconfont icon-jinxingzhong"
            style="color: rgb(138, 138, 138); font-size: 20px"
          ></i>
          待跟进{{ progress.notFollow }}
        </div>
        <div class="home_progressItem">
          <i
            class="iconfont icon-jinxingzhong"
            style="
              color: rgb(138, 138, 138);
              font-size: 20px;
              color: rgb(45, 141, 255);
            "
          ></i>
          跟进中{{ progress.following }}
        </div>
        <div class="home_progressItem">
          <i
            class="iconfont icon-chenggongyijiejue"
            style="
              color: rgb(138, 138, 138);
              font-size: 20px;
              color: rgb(34, 181, 133);
            "
          ></i>
          已解决{{ progress.followed }}
        </div>
      </div>
    </div>
    <div class="home_form">
      <XxTable
        :titles="titles"
        :tableData="tableData"
        :getTableData="getTableData"
        :mergeList="mergeList"
        :gap="gap"
        :text="text"
      />
    </div>
  </div>
</template>

<script>
import XxTable from "../components/XxTable.vue";
import MySelect from "../components/MySelect.vue";
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { getSosList } from "../utils/ajax";
import { computed, onMounted, watch } from "@vue/runtime-core";
export default {
  name: "Home",
  components: {
    XxTable,
    MySelect,
  },
  setup() {
    // 标题
    let titles = ["编号", "时间", "程度", "分类", "摘要", "地址", "详情"];
    // arr
    let tableData = reactive({
      arr: [],
      total: 0,
    });
    // 计时器
    let timer = null;
    // 设置范围
    let gap = 60;
    // 路由
    let router = useRouter();
    // 要传给tablede的参数
    let query = reactive({
      condition: {
        in_three_hours: 0, // 0否 1是
        extent: "全部", // 全部 紧急 较紧急 极紧急
        classify: "全部", // 全部 重病 孕妇 物资
        area: "全部", // 红旗区
      },
      page_info: {
        page_num: 1,
        page_size: 60
      }
 
    });
    // 是否三小时
    function changeTime() {
      query.condition.in_three_hours =
        query.condition.in_three_hours > 0 ? 0 : 1;
    }
    // 紧急程度
    let urgent = [
      {
        id: 1,
        value: "全部",
      },
      {
        id: 2,
        value: "极紧急",
      },
      {
        id: 3,
        value: "紧急",
      },
      {
        id: 4,
        value: "较急",
      },
    ];
    // 分类
    let category = [
      {
        id: 1,
        value: "全部",
      },
      {
        id: 2,
        value: "疾病",
      },
      {
        id: 3,
        value: "物资",
      },
      {
        id: 4,
        value: "重伤",
      },
      {
        id: 5,
        value: "其他",
      },
    ];
    // 地址
    let areas = [
      { id: 0, value: "全部" },
      {
        id: 1,
        value: "卫滨区",
      },
      {
        id: 2,
        value: "红旗区",
      },
      {
        id: 3,
        value: "牧野区",
      },
      {
        id: 4,
        value: "凤泉区",
      },
      {
        id: 5,
        value: "辉县市",
      },
      {
        id: 6,
        value: "卫辉市",
      },
      {
        id: 7,
        value: "长垣市",
      },
      {
        id: 8,
        value: "新乡县",
      },
      {
        id: 9,
        value: "获嘉县",
      },
      {
        id: 10,
        value: "原阳县",
      },
      {
        id: 11,
        value: "延津县",
      },
      {
        id: 12,
        value: "封丘县",
      },
    ];
    // 进度占比
    let progress = {
      notFollow: 0,
      following: 0,
      followed: 0,
    };
    //  更改 page_Info
    function changeCurPage() {
      query.page_info.page_num += 1;
    }
    // 获取紧急程度
    function choseExtent(value) {
      query.condition.extent = value;
    }
    // 获取分类
    function choseClassify(value) {
      query.condition.classify = value;
    }
    // 获取地址
    function choseArea(value) {
      query.condition.area = value;
    }
    function toHelp() {
      router.push("/post");
    }
    // const toHelp = () => {
    //   router.push("/post");
    // };
    let text = ref("");
    // 获取表格数据
    async function getTableData() {
      const res = await getSosList("/sos/SOSList?", "get", query);
      changeCurPage();
      if (res.code === 0) {
        if (res.data.list.length === 0) {
          text.value = "暂无数据";
        } else {
          return res.data;
        }
      }
    }
    // 暂无数据
    // 监测筛选情况的变化
    watch(query.condition, () => {
      tableData.arr = [];
      timer && clearTimeout(timer);
      //  筛选条件重置后默认冲第一也开始获取数据
      query.page_info.page_num = 1;
      timer = setTimeout(async () => {
        const res = await getTableData();
        tableData.arr = res.list;
        tableData.total = res.total;
      }, 1200);
    });

    function mergeList(res) {
      tableData.arr = [...tableData.arr, ...res.list];
    }
    onMounted(async () => {
      const res = await getTableData();
      console.log();
      tableData.arr = res.list;
      tableData.total = res.total;
      // if(!window.navigator.userAgent || !document.cookie){
      //   router.push('/403')
      // }
    });

    return {
      text,
      gap,
      titles,
      tableData,
      getTableData,
      query,
      urgent,
      category,
      areas,
      progress,
      toHelp,
      changeTime,
      choseExtent,
      choseClassify,
      choseArea,
      changeCurPage,
      mergeList,
    };
  },
};
</script>

<style>
.home_home {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: auto;
  font-size: 24px;
}
.home_head {
  margin: 0 auto;
  width: 96%;
  height: 300px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.home_top {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.home_top button {
  margin-left: 10px;
  font-size: 20px;
  background-color: rgb(255, 77, 79);
  border: none;
  padding: 8px;
  color: white;
}
.home_limit {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.home_limit input {
  zoom: 150%;
}
.home_classification {
  width: 680px;
  height: 80px;
  display: flex;
  justify-content: space-around;
}

.home_item {
  /* width: 33%; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.home_progress {
  width: 600px;
  height: 50px;
  background-color: rgb(234, 234, 234);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
}
.home_form {
  width: 98%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>