<template>
  <div class="animate">
    <div class="select-container">
      <div class="input-container">
        <input
          class="input"
          v-model="searchValue"
          type="text"
          :placeholder="placeholder"
          :readonly="!isSearch"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <div v-if="!isSearch" class="input-icon">
          <i class="iconfont iconarrow-down"></i>
        </div>
      </div>
      <div class="select-content" :class="{ active: showSelect }">
        <div
          v-for="(item, index) in list"
          class="select-line"
          @click="select(item)"
          :key="'select_' + index"
        >
          <label>{{ item.label }}</label>
          <span v-if="value == item.value" class="selected"
            ><i class="iconfont iconseleted"></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "customSelect",
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSelect: false,
      searchValue: "",
    };
  },
  watch: {
    searchValue: {
      immediate: true,
      handler: function (newVal) {
        this.$emit("searchChange", newVal);
      },
    },
    value: {
      immediate: true,
      handler: function (newVal) {
        let item = this.list.find((it) => it.value == newVal);
        if (item) this.searchValue = item.label;
      },
    },
  },
  mounted() {},
  methods: {
    inputFocus() {
      this.showSelect = true;
    },
    inputBlur() {
      setTimeout(() => {
        this.showSelect = false;
      }, 100);
    },
    select(item) {
      this.searchValue = item.label;
      this.$emit("input", item.value);
    },
  },
};
</script>
<style>
.animate{
    width: 400px;
    height: 400px;
    margin: 0 auto;
    top: 300px;
}
.select-container {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  border-radius: 6px;
  position: relative;
}
.select-container .input-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-container .input-container .input {
  flex: 1;
  border: 0;
  height: 100%;
  background-color: transparent;
  padding: 0px 10px;
  height: 40px;
  line-height: 40px;
}
.select-container .input-container .input-icon {
  width: 40px;
  height: 40px;
  text-align: center;
}
.select-container .input-container .input-icon .iconfont {
  font-size: 24px;
  color: #999999;
}
.select-container .select-content {
  position: absolute;
  width: 100%;
  top: 42px;
  left: 0;
  background-color: #ffffff;
  z-index: 999999;
  border-radius: 6px;
  max-height: 200px;
  overflow: auto;
  border: 1px solid #f2f2f2;
  display: none;
}
.select-container .select-content.active {
  display: block;
  animation: selectanim 0.25s;
  -webkit-animation: selectanim 0.25s;
}
.select-container .select-content .select-line {
  width: 100%;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  border-bottom: 1px solid #f2f2f2;
}
.select-container .select-content .select-line:last-child {
  border-bottom: 0;
}
.select-container .select-content .select-line .selected {
  flex-shrink: 0;
}
.select-container .select-content .select-line .selected .iconfont {
  font-size: 24px;
}
@keyframes selectanim {
  from {
    opacity: 0;
    top: 60px;
  }
  to {
    opacity: 1;
    top: 42px;
  }
}
@-webkit-keyframes selectanim {
  from {
    opacity: 0;
    top: 60px;
  }
  to {
    opacity: 1;
    top: 42px;
  }
}
</style>