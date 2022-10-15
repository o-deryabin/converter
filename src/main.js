import { createApp } from "vue";
import { createPinia } from "pinia";
import { routes } from "@/route";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "@/assets/styles.css";

const pinia = createPinia();
const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(pinia);
app.use(router);

app.mount("#app");
