import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    search: "",
  }),
  getters: {
    getSearch(state) {
      return state.search;
    },
  },
  actions: {
    modifySearch(newSearch) {
      this.search = newSearch;
    },
  },
});

// https://stackoverflow.com/questions/77653872/how-do-i-use-a-vue3-pinia-store-inside-the-methods-of-a-component
