<template>
  <section class="section">

    <div class="section__header header">
      <h1>Конвертер валют</h1>
    </div>



    <div class="section__content">
      <template v-if="convert[0]">
        <div>
          <div class="text--gray" @click="showModal(1)">{{convert[0].Name}}</div>
          <input type="number" v-model="convert[0].convert" class="section__button text">
        </div>
      </template>
      <template v-else>
        <button class="section__button text" @click="showModal(1)">
          <span class="text--gray">Выберите валюту</span>
        </button>
      </template>
      <button class="section__reverse" @click="reverse()">
        <ReverseSvg />
      </button>
      <template v-if="convert[1]">
        <div>
          <button class="section__button text" @click="showModal(2)">
            <span>{{convert[1].convert}}</span>
            <span>{{convert[1].CharCode}}</span>
          </button>
        </div>
      </template>
      <template v-else>
        <button class="section__button text" @click="showModal(2)">
          <span class="text--gray">Выберите валюту</span>
        </button>
      </template>
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

const convert = computed(() => (store.compute))

const reverse = store.reverseValute;

const showModal = (index) => {
  modalIndex.value = index;
  isShowModal.value = true;
}
</script>

<style>

</style>