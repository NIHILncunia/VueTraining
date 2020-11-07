<template>
  <div>
    <input type="number" placeholder="가로" :value="row" @change="onChageRow" />
    <input type="number" placeholder="세로" :value="cell" @change="onChageCell" />
    <input type="number" placeholder="지뢰" :value="mine" @change="onChageMine" />
    <button @click="onClickButton">시작</button>
  </div>
</template>

<script>
import { START_GAME } from './store';

export default {
  name: 'MineForm',
  components: {
    // 컴포넌트
  },
  props: {
    // 프롭스
  },
  data() {
    // 데이터
    return {
      row: 10,
      cell: 10,
      mine: 20,
    };
  },
  computed: {
    // 가공된 데이터
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
    onChageRow(e) {
      this.row = e.target.value;
    },
    onChageCell(e) {
      this.cell = e.target.value;
    },
    onChageMine(e) {
      this.mine = e.target.value;
    },
    onClickButton() {
      this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>