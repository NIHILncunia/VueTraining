import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// Vue와 스토어를 연결

export default new Vuex.Store({
  state: {
    // 중앙 스테이트
  },
  getters: {
    // 스테이트를 가공.
  },
  mutations: {
    // 스테이트를 (동기적)수정할 때 사용한다.
  },
  actions: {
    // 비동기를 사용할 때, 혹은 뮤테이션 여러개 실행할 때.
  },
});