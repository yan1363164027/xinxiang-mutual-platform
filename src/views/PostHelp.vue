<template>
  <div class="post-help">
    <h3 class="text">请详细描述问题，志愿者会第一时间与您联系</h3>
    <form class="form">
      <Inputs />
      <Selects :addresses="addresses" :categories="categories" :degrees="degrees" />
      <br />
      <el-button type="primary" size="large" class="confirm" @click="postData">确认发布</el-button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import emmiter from "../eventBus";
import Selects from "../components/Selects.vue";
import Inputs from "../components/Inputs.vue";
export default {
  name: "MyPost",
  components: { Selects, Inputs },
  setup() {
    let valueOfInput = null;
    let flags = null;
    let valueOfSelect = null;

    //接收数据
    emmiter.on("fromInput", function (data) {
      valueOfInput = data.value;
      console.log(valueOfInput);
      flags = data.flags;
    });
    emmiter.on("fromSelect", function (data) {
      valueOfSelect = data;
    });

    //发送 post 请求
    function postData() {
      emmiter.emit("input");
      emmiter.emit("select");
      if (flags.correctContent && flags.correctAbstract && flags.correctTelephone) {
        //#region 
        axios
          .post(
            "/api/sos/inf",
            //data 参数
            {
              extent: valueOfSelect.degree,
              classify: valueOfSelect.category,
              abstract: valueOfInput.abstract,
              area: valueOfInput.address,
              status: 0,
              details: {
                name: valueOfInput.contacts,
                telephone: valueOfInput.content,
                address: valueOfSelect.areas,
                content: valueOfInput.content,
              },
            },
            //响应格式
            {
              headers: { "Content-Type": "application/json" },
            }
          ) // 响应回调
          .then(
            (value) => {
              console.log(value);
            },
            (error) => {
              console.log(error);
            }
          );
        //#endregion

      } else {
        console.log("输入错误");
      }
    }

    //选择器表单数据
    const addresses = [
      {
        value: "卫滨区",
        label: "卫滨区",
      },
      {
        value: "红旗区",
        label: "红旗区",
      },
      {
        value: "牧野区",
        label: "牧野区",
      },
      {
        value: "凤泉区",
        label: "凤泉区",
      },
      {
        value: "辉县市",
        label: "辉县市",
      },
      {
        value: "卫辉市",
        label: "卫辉市",
      },
      {
        value: "长垣市",
        label: "长垣市",
      },
      {
        value: "新乡县",
        label: "新乡县",
      },
      {
        value: "获嘉县",
        label: "获嘉县",
      },
      {
        value: "原阳县",
        label: "原阳县",
      },
      {
        value: "延津县",
        label: "延津县",
      },
      {
        value: "封丘县",
        label: "封丘县",
      },
    ];
    const categories = [
      {
        value: "重病",
        label: "重病",
      },
      {
        value: "孕妇",
        label: "孕妇",
      },
      {
        value: "疾病",
        label: "疾病",
      },
      {
        value: "物资",
        label: "物资",
      },
    ];
    const degrees = [
      {
        value: "极紧急",
        label: "极紧急",
      },
      {
        value: "紧急",
        label: "紧急",
      },
      {
        value: "较急",
        label: "较急",
      },
    ];
    return {
      addresses,
      categories,
      degrees,
      valueOfInput,
      valueOfSelect,
      flags,
      postData,
    };
  },
};
</script>

<style scoped>
.post-help {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}

.form {
  height: 100%;
}

.post-help .text {
  font-size: 30px;
  margin-bottom: 30px;
}


.confirm {
  display: inline-block;
  margin-top: 30px;
  width: 100%;
  height: 60px;
  border-radius: 30px;
  font-size: 30px;
}
</style>