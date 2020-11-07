<template>
  <div id="App">
    <div id="appTop">
      <h1 id="topTitle">당첨 숫자</h1>
      <div id="topItem">
        <lotto-ball v-for="(ball, index) in showballs" v-bind:key="`${index}-${ball}`" v-bind:number="ball" />
      </div>
    </div>
    <div v-if="restart" id="appBottom">
      <h1 id="bottomTitle">보너스 숫자</h1>
      <lotto-ball v-bind:number="bonus" />
      <button id="oneMore" v-on:click="onClickButton">다시 추첨</button>
    </div>
  </div>
</template>

<script>
import LottoBall from './LottoBall';

const getBalls = () => {
  const number = Array(45).fill().map((value, index) => index + 1);
  const shuffle = [];
  while (number.length > 0) {
    shuffle.push(number.splice(Math.floor(Math.random() * number.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const balls = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...balls, bonusNumber];
};

const timeOuts = [];

export default {
  // 이름
  name: 'LottoGenerator',
  // 컴포넌트
  components: {
    LottoBall,
  },
  // 프롭스
  props: {},
  // 데이터
  data() {
    return {
      balls: getBalls(),
      showballs: [],
      bonus: null,
      restart: false,
    };
  },
  // 가공된 데이터
  computed: {},
  // 데이터 감시
  watch: {},
  // 생명주기 - 생성
  beforeCreate() {},
  created() {},
  // 생명주기 - 렌더링
  beforeMount() {},
  mounted() {
    this.reShowBalls();
  },
  // 생명주기 - 리렌더링
  beforeUpdate() {},
  updated() {},
  // 생명주기 - 소멸
  beforeDestroy() {
    timeOuts.forEach((time) => {
      clearTimeout(time);
    });
  },
  destroyed() {},
  // 메소드
  methods: {
    onClickButton() {
      this.balls = getBalls();
      this.showballs = [];
      this.bonus = null;
      this.restart = false;
      this.reShowBalls();
    },
    reShowBalls() {
      for (let i = 0; i < this.balls.length - 1; i++) {
        timeOuts[i] = setTimeout(() => {
          this.showballs.push(this.balls[i]);
        }, (i + 1) * 1000);
      }
      timeOuts[6] = setTimeout(() => {
        this.restart = true;
        this.bonus = this.balls[6];
      }, 7000);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>