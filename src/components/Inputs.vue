<template>
  <div class="inputs">
    <label for="goods" class="primary">需要得到物资* </label>
    <textarea id="goods" placeholder="请尽可能详细描述：物资类别、需要提供的数量、是否需要提供配送等" style="vertical-align: middle; width: 60vw"
      v-model="content" @blur="unInvalid"></textarea>
    <br />
    <label for="address" class="primary">详细地址* </label>
    <input class="m-2" placeholder="请输入" id="address" v-model="address" />
    <br />
    <label for="abstract" class="primary">信息摘要* </label>
    <input class="m-2" placeholder="请输入3-6个..." maxlength="6" minlength="3" id="abstract" v-model="abstract"
      @blur="validRange" />
    <br />
    <label for="contacts" class="primary">联系人* </label>
    <input class="m-2" placeholder="请输入" id="contacts" v-model="contacts" />
    <br />
    <label for="telephone" class="primary">联系电话* </label>
    <input class="m-2" placeholder="请输入" id="telephone" v-model="telephone" @blur="isTelephone" />
  </div>
</template>

<script>
import emitter from "../eventBus";
import { ref } from "@vue/reactivity";
export default {
  name: "MyInput",
  setup() {
    //输入框的值
    let content = ref(""); //详细内容
    let address = ref(""); //详细地址
    let abstract = ref(""); //摘要
    let contacts = ref(""); //联系人
    let telephone = ref(""); //联系电话

    //判断输入是否有效
    let correctContent = false;
    let correctAbstract = false;
    let correctTelephone = false;

    //向父组件传递数据
    emitter.on("input", function () {
      emitter.emit("fromInput", {
        value: {
          content: content.value, address: address.value, abstract: abstract.value, contacts: contacts.value, telephone: telephone.value
        },
        flags: {
          correctContent, correctAbstract, correctTelephone
        }
      });
    });

    // 详细内容 是否有效
    function unInvalid() {
      if (content.value.trim() == "") {
        alert("内容不能为空");
        // console.log("内容不能为空");
        correctContent = false;
      } else {
        correctContent = true;
      }
    }

    //消息摘要 是否有效
    function validRange() {
      if (
        abstract.value.trim().length < 3 ||
        abstract.value.trim().length > 6
      ) {
        // alert("请输入3-6个字符");
        console.log("请输入3-6个字符");
        correctAbstract = false;
      } else {
        correctAbstract = true;
      }
    }

    //判断是否为正确的电话号码
    function isTelephone() {
      if (
        !/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(telephone.value)
      ) {
        // alert("请输入正确的电话号码");
        console.log("请输入正确的电话号码");
        correctTelephone = false;
      } else {
        correctTelephone = true;
      }
    }

    return {
      content,
      address,
      abstract,
      contacts,
      telephone,
      correctContent,
      correctAbstract,
      correctTelephone,
      unInvalid,
      validRange,
      isTelephone
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

#goods {
  resize: none;
  width: 400px;
  height: 200px;
  font-size: 30px;
  border: rgba(153, 153, 153, 0.4) solid 1px;
  border-radius: 3px;
  /* text-indent: 10px; */
}

#goods:focus {
  outline: 1px solid rgba(0, 122, 204, 0.5);
}

.post-help input {
  /* letter-spacing:20px;  每个字符之间的间隔 */
  text-indent: 10px;
  margin: 15px 0;
  border-radius: 3px;
  height: 60px;
  width: 60vw;
  font-size: 30px;
}

.post-help input:focus {
  /* border: rgba(0,122,204,0.5) solid 1px; */
  /* 边框不用border，用outline */
  outline: 1px solid rgba(0, 122, 204, 0.5);
}

.m-2 {
  height: 40px;
  width: 226px;
  border: rgba(153, 153, 153, 0.4) solid 1px;
}
</style>