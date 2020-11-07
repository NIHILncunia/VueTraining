<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData" :key="cellIndex"
        :style="cellDataStyle(rowIndex, cellIndex)"
        @click="onClickTd(rowIndex, cellIndex)"
        @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store';

export default {
  name: 'TableComponent',
  components: {
    // 컴포넌트
  },
  props: {
    // 프롭스
  },
  data() {
    // 데이터
    return {};
  },
  computed: {
    // 가공된 데이터
    ...mapState(['tableData', 'halted']),

    cellDataStyle(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: '#666666',
              color: '#ffffff',
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: '#dddddd',
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background: '#950d0d',
              color: '#ffffff',
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: '#cccc24'
            };
          case 1:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#356bff',
            };
          case 2:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#356bff',
            };
          case 3:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#11b32c',
            };
          case 4:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#11b32c',
            };
          case 5:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#860c0c',
            };
          case 6:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#860c0c',
            };
          case 7:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#000068',
            };
          case 8:
            return {
              background: '#dddddd',
              fontWeight: '900',
              color: '#000068',
            };
          default:
            return {};
        }
      };
    },
    cellDataText() {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return 'X';
          case CODE.NORMAL:
            return '';
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return '!';
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return '?';
          case CODE.CLICKED_MINE:
            return '펑!';
          default:
            return this.$store.state.tableData[row][cell] || '';
        }
      };
    }
  },
  watch: {
    // 데이터 감시
  },
  beforeCreate() {},
  created() {
    // 생명주기 - 생성
  },
  beforeMount() {},
  mounted() {
    // 생명주기 - 렌더링
  },
  beforeUpdate() {},
  updated() {
    // 생명주기 - 리렌더링
  },
  beforeDestroy() {},
  destroyed() {
    // 생명주기 - 소멸
  },
  methods: {
    // 메소드
    onClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL, { row, cell });
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE, { row, cell });
        default:
          return;
      }
    },
    onRightClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL, { row, cell });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL, { row, cell });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          this.$store.commit(NORMALIZE_CELL, { row, cell });
          return;
        default:
          return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;

  td {
    border: 1px solid #333333;
    width: 30px;
    height: 30px;
    text-align: center;
    user-select: none;
  }
}
</style>