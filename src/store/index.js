import Vue from 'vue'
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    adminName:'123123',
    adminPwd:'123456',
    clientName:'456456',
    clientPwd:'456789',
  }
})

export default store;
