import { defineStore } from "pinia";

export const useValuteStore = defineStore("valute", {
  state: () => ({
    loader: false,
    valutes: [],
    computeValutes: [],
  }),

  actions: {
    async fetchValutes() {
      try {
        this.loader = true;
        this.valutes = [];

        const data = await fetch(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        ).then((res) => res.json());

        Object.keys(data.Valute).forEach((key) => {
          this.valutes.push(data.Valute[key]);
        });

        this.valutes.map((item) => {
          item.Value = item.Value / item.Nominal;
          item.Previous = item.Previous / item.Nominal;
          item.difference = (
            ((item.Value - item.Previous) / item.Previous) *
            100
          ).toPrecision(4);
        });

        this.loader = false;
      } catch (error) {
        console.log(error);
      }
    },

    selectValute(item, index) {
      item.compare = 1;
      item.convert = 1;
      this.computeValutes[index] = item;
    },

    reverseValute() {
      this.computeValutes = this.computeValutes.reverse();
    },
  },

  getters: {
    search: (state) => (filter) => {
      const filteredValutes = state.valutes.filter(({ Name }) => {
        return Name.toLowerCase().includes(filter.toLowerCase().trim());
      });

      return filteredValutes;
    },

    compute: (state) => {
      const firstValute = state.computeValutes[0];
      const secondValute = state.computeValutes[1];

      if (firstValute) {
        firstValute.compare = 1;
      }

      if (secondValute && firstValute) {
        secondValute.compare = parseFloat(
          firstValute.Value / secondValute.Value
        ).toPrecision(4);

        secondValute.convert = parseFloat(
          firstValute.convert * secondValute.compare
        ).toPrecision(4);
      }

      return [firstValute, secondValute];
    },
  },
});
