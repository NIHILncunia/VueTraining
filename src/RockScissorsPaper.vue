<template>
  <div id="App">
    <div id="screen" v-bind:style="screenImage"></div>
    <div id="buttons">
      <button v-on:click="onClickButton('가위')">가위</button>
      <button v-on:click="onClickButton('바위')">바위</button>
      <button v-on:click="onClickButton('보')">보</button>
    </div>
    <div>결과: {{ result }}</div>
    <div>누적 점수: {{ Score }}점</div>
  </div>
</template>

<script>
const rspCoords = {
  가위: '-240px',
  바위: '0',
  보: '-480px'
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((value) => {
    return value[1] == imgCoord;
  })[0];
};

let interval = null;

export default {
  // 이름
  name: 'RockScissorsPaper',
  // 컴포넌트
  components: {},
  // 프롭스
  props: {},
  // 데이터
  data() {
    return {
      imgCoord: rspCoords.바위,
      score: null,
      result: '',
    };
  },
  // 가공된 데이터
  computed: {
    Score() {
      return this.score || 0;
    },
    screenImage() {
      return {
        background: `url(https://nihilncunia.github.io/VueTraining/images/RSP.png) ${this.imgCoord} 0`
      };
    },
  },
  // 생명주기 - 생성
  beforeCreate() {},
  created() {},
  // 생명주기 - 렌더링
  beforeMount() {},
  mounted() {
    this.changeHand();
  },
  // 생명주기 - 리렌더링
  beforeUpdate() {},
  updated() {},
  // 생명주기 - 소멸
  beforeDestroy() {
    clearInterval(interval);
  },
  destroyed() {},
  // 메소드
  methods: {
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;

      if (diff == 0) {
        this.result = '무승부 (+0점)';
      } else if ([-1, 2].includes(diff)) {
        this.result = '승리! (+1점)';
        this.score += 1;
      } else {
        this.result = '패배.. (-1점)';
        this.score -= 1;
      }

      setTimeout(() => {
        this.changeHand();
      }, 1000);
    },
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCoord == rspCoords.바위) {
          this.imgCoord = rspCoords.가위;
        } else if (this.imgCoord == rspCoords.가위) {
          this.imgCoord = rspCoords.보;
        } else if (this.imgCoord == rspCoords.보) {
          this.imgCoord = rspCoords.바위;
        }
      }, 80);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px auto;
}

body {
  padding: 10px;
}

#App {
  text-align: center;

  #screen {
    width: 240px;
    height: 240px;
    margin-bottom: 10px;
  }

  #buttons {
    & button {
      padding: 5px 10px;
      background: #2b89f5;
      color: #ffffff;
      border: 0px;
    }
  }
}
</style>