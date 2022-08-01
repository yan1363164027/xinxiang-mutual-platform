<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" align="center"  />
    <el-table-column prop="date" label="Date" align="center"  />
    <el-table-column prop="degree" label="程度" align="center"  >
      <!-- <template #default="scope">
        <el-button>
           
        </el-button>
      </template> -->
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      align="center"
      
    />
    <el-table-column prop="mainCont" label="摘要" align="center" />
    <el-table-column
      prop="address"
      label="地址"
      align="center"
      
    />
    <el-table-column label="详情" lign="center">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="visible = true">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    background
    :page-size="10"
    :pager-count="11"
    layout="prev, pager, next"
    :total="1000"
    style="margin: 10px auto 0"
  />
  <!-- 显示详细信息 -->
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close }">
      <div class="my-header">
        <el-button @click="close">
          Close
        </el-button>
      </div>
    </template>
    <b><h4 style="font-size: 20px;color: black;">求助内容</h4></b><br>
    <span>需要去公司一趟，给员工发工资，让他们有钱买菜。</span><br><br>
    <span>联系人：张先生</span><br><br>
    <span>联系电话：张先生</span>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "Table_Element",
  setup() {
    // 10条数据
    const tableData = [
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "No. 189, Grove St, 其他",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "No. 189, Grove St, 其他",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "No. 189, Grove St, 其他",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "No. 189, Grove St, 其他",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "No. 189, Grove St, 其他",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "红旗区",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "红旗区",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "红旗区",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "红旗区",
        detail: "查看",
      },
      {
        id: 7198,
        date: "2016-05-03",
        degree: "极紧急",
        category: "其他",
        mainCont: "失眠",
        address: "红旗区",
        detail: "查看",
      },
    ];
    const total = 1000;
    const visible = ref(false);

    return {
      tableData,
      total,
      visible,
    };
  },
};
</script>

<style>
.my-header {
  display: flex;
  justify-content: flex-end;
}
</style>