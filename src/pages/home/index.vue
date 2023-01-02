<template>
  <div>首页</div>
  <x-tabbar />
</template>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  uni.preloadPage({ url: "/pages/find/index" });
  uni.preloadPage({ url: "/pages/my/index" });
});
</script>
