import Vue from 'vue';
import Vuex from 'vuex';
import template from './modules/template';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    template
  },
  getters
});

export default store;
