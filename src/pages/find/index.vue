<template>
  <div>发现</div>
  <x-tabbar />
</template>

<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";
import { ref } from "vue";
onLaunch(() => {
  console.log("发现加载");
});
</script>
