<template>
  <div id="app">
    <div class="title">당신의 반응 속도를 측정하세요.</div>
    <div id="screen" v-bind:class="state" v-on:click="onClickScreen">{{ message }}</div>
    <div v-if="toggleControl" class="control">
      <div class="time">평균 시간: {{ average }}ms</div>
      <button class="reset" v-on:click="onReset">다시 시작</button>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeOut = null;

export default {
  name: 'ResponseCheck',
  components: {},
  props: {},
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭',
      toggleControl: false,
    };
  },
  computed: {
    average() {
      return (this.result.reduce((a, c) => a + c, 0) / this.result.length || 0).toFixed(0);
    },
  },
  methods: {
    onClickScreen() {
      if (this.state == 'waiting') {
        this.state = 'ready';
        this.message = '준비';
        timeOut = setTimeout(() => {
          this.state = 'now';
          this.message = '클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (this.state == 'ready') {
        clearTimeout(timeOut);
        this.state = 'waiting';
        this.message = '실패! 클릭하여 재시작';
      } else if (this.state == 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭';
        this.result.push(endTime - startTime);
        this.toggleControl = true;
      }
    },
    onReset() {
      this.result = [];
      this.toggleControl = false;
    },
  },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);

$size0: 46pt;
$size1: 40pt;
$size2: 32pt;
$size3: 28pt;
$size4: 24pt;
$size5: 20pt;
$size6: 16pt;
$size7: 12pt;

* {
  margin: 0px auto;
  padding: 0px;
  font-family: "Noto Sans KR",sans-serif;
}

@media (min-width: 1001px) {
  .title {font-size: $size3;}
  #screen {font-size: $size0;}
  .time {font-size: $size2;}
  .reset {font-size: $size3;}
}

@media (min-width: 601px) and (max-width: 1000px) {
  .title {font-size: $size4;}
  #screen {font-size: $size1;}
  .time {font-size: $size3;}
  .reset {font-size: $size4;}
}

@media (min-width: 401px) and (max-width: 600px) {
  .title {font-size: $size5;}
  #screen {font-size: $size3;}
  .time {font-size: $size4;}
  .reset {font-size: $size5;}
}

@media (min-width: 201px) and (max-width: 400px) {
  .title {font-size: $size7;}
  #screen {font-size: $size5;}
  .time {font-size: $size6;}
  .reset {font-size: $size7;}
}

html, body {
  height: 100%;
}

#app {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;

  & .title {
    width: 100%;
    background: #333333;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
  }

  & #screen {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    flex: 1 1 0;
    cursor: pointer;

    &.waiting {
      background: #1d7fff;
      color: #ffffff;
    }

    &.ready {
      background: #901414;
      color: #ffffff;
    }

    &.now {
      background: #10851a;
      color: #ffffff;
    }
  }

  & .control {
    width: 100%;

    & .time {
      background: #eeeeee;
      color: #333333;
      box-sizing: border-box;
      padding: 10px;
    }

    & .reset {
      width: 100%;
      border: none;
      padding: 10px;
      background: #333333;
      color: #ffffff;
      box-sizing: border-box;

      &:hover {
        background: #888888;
        color: #ffffff;
      }

      &:active {
        background: #666666;
        color: #ffffff;
      }
    }
  }
}
</style>