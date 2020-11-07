<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from 'Vuex';

export default {
  // 이름
  name: 'TableTd',
  // 컴포넌트
  components: {},
  // 프롭스
  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    cellIndex: {
      type: Number,
      required: true
    },
  },
  // 데이터
  data() {
    return {};
  },
  // 가공된 데이터
  computed: {
    // 스토어에 존재하는 데이터를 가져온다.
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      // 디스가 없으니 화살표 함수로 가져와도 된다.
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex];
        // this를 사용하면 화살표 함수는 안된다.
      }
    }),
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // }
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
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>