<template>
  <section class="section">
    <div class="section__header header">
      <h1>Валюты</h1>
      <button class="header__button text" @click="showModal()">Все валюты</button>
    </div>

    <div class="section__content">
      <button class="section__reverse" @click="reverse()">
        <ReverseSvg />
      </button>
      <button class="section__button text" v-for="(item, index) of compare" :key="index" @click="showModal(index + 1)">
        <template v-if="item">
          <span>{{item.compare}}</span>
          <span>{{item.CharCode}}</span>
        </template>
        <template v-else>
          <span class="text--gray">Выберите валюту</span>
        </template>
      </button>
    </div>

    <Teleport to="body">
      <modal :show="isShowModal" :index="modalIndex" @close="isShowModal = false" />
    </Teleport>

  </section>
</template> 

<script setup>
import { useValuteStore } from '@/stores/valute';
import { computed, ref } from 'vue-demi';
import Modal from './common/ModalValutes.vue';
import ReverseSvg from './svg/ReverseSvg.vue';

const isShowModal = ref(false);
const modalIndex = ref(0);

const store = useValuteStore();

const compare = computed(() => (store.compute))

const reverse = store.reverseValute;

const showModal = (index) => {
  modalIndex.value = index;
  isShowModal.value = true;
}
</script>


<style>

</style>