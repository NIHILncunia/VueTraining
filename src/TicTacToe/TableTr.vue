<template>
  <tr>
    <table-td
      v-for="(cellData, index) in rowData"
      v-bind:key="index" v-bind:row-index="rowIndex" v-bind:cell-index="index"
    ></table-td>
  </tr>
</template>

<script>
import TableTd from './TableTd';

export default {
  // 이름
  name: 'TableTr',
  // 컴포넌트
  components: {
    TableTd,
  },
  // 프롭스
  props: {
    rowIndex: {
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
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    },
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