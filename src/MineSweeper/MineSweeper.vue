<template>
  <div id="App">
    <mine-form />
    <div>{{ timer }}</div>
    <table-component />
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store, { INCREMENT_TIMER } from './store';
import MineForm from './MineForm';
import TableComponent from './TableComponent';

let interval;

export default {
  store,
  name: 'MineSweeper',
  components: {
    // 컴포넌트
    TableComponent,
    MineForm,
  },
  props: {
    // 프롭스
  },
  data() {
    // 데이터
    return {
      data: 1,
    };
  },
  computed: {
    // 가공된 데이터
    ...mapState(['timer', 'result', 'halted']),
  },
  watch: {
    // 데이터 감시
    halted(value, oldValue) {
      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000);
      } else {
        clearInterval(interval);
      }
    },
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
  },
};
</script>

<style lang="scss" scoped>

</style>