<template>
  <div class="container">
    <template v-if="store.loader">
      <MyLoader />
    </template>
    <template v-else>

      <aside class="sidebar">
        <nav class="nav">
          <router-link to="/" class="link">Валюты</router-link>
          <router-link to="/converter" class="link">Конвертер валют</router-link>
        </nav>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script setup>
import MyLoader from './components/common/MyLoader.vue';
import { useValuteStore } from '@/stores/valute';
const { onMounted } = require("vue-demi")

const store = useValuteStore();

const fetchValutes = async () => {
  await store.fetchValutes()
}

onMounted(() => {
  fetchValutes();
});
</script>

<style>

</style>
