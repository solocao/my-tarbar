import { createSSRApp } from "vue";
import App from "./App.vue";
import XTabbar from "@/components/XTabbar.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.component("x-tabbar", XTabbar); // 2.调用app.component方法全局注册组件
  return {
    app,
  };
}
