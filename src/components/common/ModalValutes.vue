<template>
  <Transition name="modal">
    <div v-if="show" class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <input class="modal__input" type="text" v-model="searchText" placeholder="Введите название валюты">
            <button class="modal__close-button" @click="close()"></button>
          </div>
          <div class="modal__list">
            <div class="modal__item" v-for="(item, i) of filteredValutes" :key="i">
              <template v-if="index">
                <div @click="select(item)">
                  {{item.Name}} <span
                    :class="{'green': item.Value > item.Previous, 'red': item.Value < item.Previous}">{{item.difference}}%
                    <ArrowUpSvg v-if="item.Value > item.Previous" />
                    <ArrowDownSvg v-else />
                  </span>
                </div>
              </template>
              <template v-else>
                {{item.Name}} <span
                  :class="{'green': item.Value > item.Previous, 'red': item.Value < item.Previous}">{{item.difference}}%</span></template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useValuteStore } from '@/stores/valute';
import { computed, ref, defineProps, defineEmits, toRefs } from 'vue-demi';
import ArrowUpSvg from '../svg/ArrowUpSvg.vue';
import ArrowDownSvg from '../svg/ArrowDownSvg.vue';

const props = defineProps({
  show: Boolean,
  index: Number,
});

const emit = defineEmits(['close'])

const { show, index } = toRefs(props);

const searchText = ref('');

const store = useValuteStore();

const filteredValutes = computed(() => (store.search(searchText.value)));

const select = (item) => {
  store.selectValute(item, index.value - 1);
  searchText.value = '';
  emit('close');
}

const close = () => {
  searchText.value = '';
  emit('close');
}
</script>

<style>
.green,
.red {
  padding: 5px 10px;
  border-radius: 3px;
}

.green {
  color: green;
  background-color: rgba(0, 128, 0, 0.1);
}

.red {
  color: red;
  background-color: rgba(128, 0, 0, 0.1);
}

.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__container {
  width: 800px;
  max-height: 500px;
  overflow-y: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal__header {
  display: flex;
  justify-content: space-between;
}

.modal__input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  border-radius: 0;
  width: 500px;
}

.modal__input:focus {
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.modal__close-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
}

.modal__list {
  margin-top: 20px;
}

.modal__item {
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
}

.modal__item:hover {
  background-color: #f5f4f4;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>