<template>
  <div class="x-tabbar">
    <div ref="tabbar" id="tabbar" class="x-tabbar-wrap">
      <view
        @click="tabChange(index)"
        v-for="(item, index) in tabbarList"
        :key="index"
        class="x-tabbar-item"
        :class="{
          'x-tabbar-item-active': index === currentIndex,
        }"
      >
        <view class="tabbar_icon-bulge" v-if="item.bulge">
          <image :src="currentIndex === index ? item.selectedIconPath : item.iconPath" class="x-tabbar-icon x-tabbar-bulge" />
        </view>
        <view v-else class="tabbar_icon">
          <image :src="currentIndex === index ? item.selectedIconPath : item.iconPath" class="x-tabbar-icon" />
        </view>
        <view class="tababr_text">{{ item.text }}</view>
      </view>
    </div>
    <x-safe-bottom />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, getCurrentInstance, onBeforeMount } from "vue";
import PageConfig from "@/pages.json";
import XSafeBottom from "./XSafeBottom.vue";

const obj2strStyle = (obj: any) => {
  let style = "";
  for (let key in obj) {
    style += `${key}:${obj[key]};`;
  }
  return style;
};

const padFirstSymbol = (str: string, smb: string) => {
  if (str.startsWith(smb) || str.startsWith("http")) {
    return str;
  }
  return `/${str}`;
};
const replaceTabbarList = (list: any[]) => {
  // @ts-ignore
  if (!list.length > 0) {
    return [];
  }
  return list.map((item) => {
    if (item.iconPath) {
      item.iconPath = padFirstSymbol(item.iconPath, "/");
    }
    if (item.pagePath) {
      item.pagePath = padFirstSymbol(item.pagePath, "/");
    }
    if (item.selectedIconPath) {
      item.selectedIconPath = padFirstSymbol(item.selectedIconPath, "/");
    }
    return item;
  });
};

const title = ref("Hello123");
const currentIndex = ref(0);
const safeAreaInsetsBottom = ref(0);
const tabbar = ref(null);

const getTabbarHeight = () => {
  const { windowWidth, safeAreaInsets } = <any>uni.getSystemInfoSync();
  const ratio = 750 / windowWidth;
  safeAreaInsetsBottom.value = safeAreaInsets.bottom * ratio;
  // 获取组件实例
  const instance = getCurrentInstance();
  const query = uni.createSelectorQuery().in(instance);
  query
    .select("#tabbar")
    .boundingClientRect((rect) => {
      console.log("rect", rect);
      if (rect) {
        console.log("rect", rect);
      }
    })
    .exec();
};
const tabChange = (index: number) => {
  if (index === currentIndex.value) {
    return;
  }
  jumpPage(index);
};

// 进行跳转
const jumpPage = (index: number) => {
  uni.switchTab({
    url: tabbarList.value[index].pagePath,
  });
};

// 模态框标题
const tabbarList = computed(() => {
  const { list } = PageConfig.tabBar;
  if (list) {
    return replaceTabbarList(list);
  }
  return [];
});

onMounted(() => {
  //  @ts-ignore
  const currentPage = getCurrentPages()[0].$page.fullPath;
  console.log("看看currentPage");
  console.log(currentPage);
  currentIndex.value = tabbarList.value.findIndex((item) => item.pagePath === currentPage);
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const route = page.route;
  console.log("看看route");
  console.log(route);
});
</script>

<style lang="less">
.x-tabbar {
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background-color: #fff;
  z-index: 9999;
  .x-tabbar-wrap {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    box-shadow: 0px -2px 10rpx rgba(206, 206, 206, 0.32);
    color: #9a9a9a;
    .x-tabbar-item {
      flex: 1;
      padding: 2px 0;
      font-size: 24rpx;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .x-tabbar-icon {
    display: block;
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 6rpx;
  }
  .tabbar_icon-bulge {
    width: 90rpx;
    height: 90rpx;
    margin-top: -50px;
    margin-bottom: 5px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0px -2px 10rpx rgba(206, 206, 206, 0.32);
    .x-tabbar-bulge {
      width: 88rpx;
      height: 88rpx;
    }
  }
}
</style>
