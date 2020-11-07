import Vue from 'vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
  // data와 비슷하다.
  state: {
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn: 'O',
    winner: '',
  },
  // 컴퓨티드와 비슷하다.
  getters: {},
  // 스테이트를 (동기적)수정할 때 사용한다.
  mutations: {
    // 대문자로 정의
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, {row, cell}) {
      Vue.set(state.tableData[row], cell, state.turn);
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === 'O' ? 'X' : 'O';
    },
    [RESET_GAME](state) {
      state.turn = 'O';
      state.tableData = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    },
    [NO_WINNER](state) {
      state.winner = '';
    }
  },
  // 비동기를 사용할 때, 혹은 뮤테이션 여러개 실행할 때.
  actions: {

  },
});