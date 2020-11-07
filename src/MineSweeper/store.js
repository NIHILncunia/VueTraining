import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export default new Vuex.Store({
  state: {
    // data와 비슷하다.
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
  },
  getters: {
    // 컴퓨티드와 비슷하다.
  },
  mutations: {
    // 스테이트를 (동기적)수정할 때 사용한다.
    [START_GAME](state, { row, cell, mine }) {
      state.data = {
        row,
        cell,
        mine,
      };
      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.halted = false;
      state.openedCount = 0;
      state.result = '';
    },
    [OPEN_CELL](state, { row, cell }) {
      let openedCount = 0;
      const checked = [];
      // 주변칸을 검색하는데, 한 번 검색한 칸은 위에 넣는다.
      function checkAround(row, cell) {
        // 주변 지뢰 탐색

        // 값이 없으면 스킵
        const checkUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if (checkUndefined) {
          return;
        }

        // 아래의 것들은 스킵
        if ([
          CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE,
          CODE.QUESTION, CODE.QUESTION_MINE
        ].includes(state.tableData[row][cell])) {
          return;
        }

        // 한 번 검사한 칸은 다시 검사하지 않음.
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }

        let around = [];
        if (state.tableData[row - 1]) {
          around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1],
          ]);
        }
        around = around.concat([
          state.tableData[row][cell - 1], state.tableData[row][cell + 1],
        ]);
        if (state.tableData[row + 1]) {
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1],
          ]);
        }
        const counted = around.filter(function(value) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(value);
        });

        // 주변에 지뢰가 없으면 열고, 있으면 숫자 표시
        if (counted.length == 0 && row > -1) {
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((value) => {
            if (state.tableData[value[0]][value[1]] != CODE.OPENED) {
              checkAround(value[0], value[1]);
            }
          });
        }
        if (state.tableData[row][cell] == CODE.NORMAL) {
          openedCount += 1;
        }
        Vue.set(state.tableData[row], cell, counted.length);
        // 리턴받은 값을 셀데이터의 값으로. 결과적으로 숫자가 나타나게 됨.
      }
      checkAround(row, cell);
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine == state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리했습니다!`;
      }
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;
    },
    [CLICK_MINE](state, { row, cell }) {
      state.halted = true;
      state.result = '지뢰가 터졌습니다!';
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
    },
    [FLAG_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] == CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] == CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] == CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    },
  },
  actions: {
    // 비동기를 사용할 때, 혹은 뮤테이션 여러개 실행할 때.
  },
});