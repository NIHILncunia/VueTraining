<template>
  <div id="App">
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">
          {{ cellData }}
        </td>
      </tr>
    </table-component>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import { mapState } from 'Vuex';
import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';
import TableComponent from './TableComponent';

export default {
  // Vuex 스토어
  store,
  // 이름
  name: 'TicTacToe',
  // 컴포넌트
  components: {
    TableComponent,
  },
  // 프롭스
  props: {},
  // 데이터
  data() {
    return {};
  },
  // 가공된 데이터
  computed: {
    // ...mapState(['turn', 'winner', 'tableData']),

    // 간단하게 스토어에서 스테이트를 가져올 수 있다.
    // 위는 배열 형식으로 가져온다. 아래는 객체 형식으로 가져온다.
    // 맵 스테이트 아래는 반복적인 작업이기 때문에 위처럼 가져오자.

    ...mapState({
      turn: state => state.turn,
      winner: state => state.winner,
      tableData: state => state.tableData,
    }),

    // turn() {
    //   return this.$store.state.turn;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
  },
  // 데이터 감시
  watch: {},
  // 생명주기 - 생성
  beforeCreate() {},
  created() {},
  // 생명주기 - 렌더링
  beforeMount() {},
  mounted() {},
  // 생명주기 - 리렌더링
  beforeUpdate() {},
  updated() {},
  // 생명주기 - 소멸
  beforeDestroy() {},
  destroyed() {},
  // 메소드
  methods: {
    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) return;

      // const rootData = this.$root.$children[0].$data;
      // 위처럼 자손 컴포넌트에서 최상위 데이터에 접근할 수 있다.
      // rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;
      // 위처럼 하면 값은 변하지만 화면은 변하지 않는다. 아래처럼 해야 변한다.
      // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

      // EventBus.$on('click-td', this.onClickTd);
      // 이벤트를 중앙에서 관리한다. 이벤트를 정의할 때 on을 쓴다.
      //created에서 처리해준다.

      // EventBus.$emit('click-td', this.rowIndex, this.cellIndex);
      // 정의한 이벤트를 사용할 때에 emit을 쓴다. 중앙으로 데이터를 보낼 수 있다.

      this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});
      // 스토어에 존재하는 뮤테이션을 실행한다.

      let win = false;

      if (this.tableData[rowIndex][0] == this.turn &&
        this.tableData[rowIndex][1] == this.turn &&
        this.tableData[rowIndex][2] == this.turn) {
        win = true;
      }
      if (this.tableData[0][cellIndex] == this.turn &&
        this.tableData[1][cellIndex] == this.turn &&
        this.tableData[2][cellIndex] == this.turn) {
        win = true;
      }
      if (this.tableData[0][0] == this.turn &&
        this.tableData[1][1] == this.turn &&
        this.tableData[2][2] == this.turn) {
        win = true;
      }
      if (this.tableData[0][2] == this.turn &&
        this.tableData[1][1] == this.turn &&
        this.tableData[2][0] == this.turn) {
        win = true;
      }

      if (win) {
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GAME);
      } else {
        let all = true;
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GAME);
        } else {
          this.$store.commit(CHANGE_TURN);
        }
      }
    },
  },
};
</script>

<style lang="scss">
  table {
    border-collapse: collapse;

    td {
      border: 1px solid #333333;
      width: 100px;
      height: 100px;
      text-align: center;
    }
  }
</style>