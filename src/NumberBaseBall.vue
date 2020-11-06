<template>
  <div>
    <form class="submitForm" @submit.prevent="onSubmitForm">
      <input class="inputBar" ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button class="submitButton">입력</button>
      <button class="resetButton" v-if="end" @click="onClickReset">리셋</button>
    </form>
    <div class="gameMessage" v-if="end">{{ result }}</div>
    <div class="gameInfo">
      <div class="tryCounter">시도 횟수: {{ tries.length }}</div>
      <div class="winCounter" v-if="wincount > 0">승리 횟수: {{ wincount }}</div>
    </div>
    <ul class="resultList">
      <li class="listItem" v-bind:key="`${index}-${t}`" v-for="(t, index) in tries">
        <div class="itemIndex">{{ index + 1 }}</div>
        <div class="itemTries">
          <div class="try">{{ t.try }}</div>
          <div class="result">{{ t.result }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import './NumberBaseBall.scss';

const getNumbers = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const one = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(one);
  }

  return array;
};
export default {
  name: 'NumberBaseBall',
  components: {},
  props: {},
  data() {
    return {
      answer: getNumbers(),
      value: '',
      result: '',
      tries: [],
      end: false,
      wincount: 0,
    };
  },
  computed: {},
  methods: {
    onClickReset() {
      this.end = false;
      this.tries = [];
    },
    onSubmitForm() {
      if (this.value == this.answer.join('')) {
        this.tries.push({
          try: this.value,
          result: '홈런..!',
        });
        this.result = `홈런입니다! 게임에서 승리했습니다!《${this.answer.join(',')}》`;
        this.value = '';
        this.answer = getNumbers();
        this.$refs.answer.focus();
        this.end = true;
        this.wincount += 1;
      } else {
        if (this.tries.length >= 9) {
          this.result = `도전에 실패했습니다..《${this.answer.join(',')}》`;
          this.answer = getNumbers();
          this.value = '';
          this.end = true;
          this.$refs.answer.focus();
        }
        if (this.value.length != 4) {
          return;
        } else {
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split('').map(val => parseInt(val));
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] == this.answer[i]) {
              strike++;
            } else if (this.answer.includes(answerArray[i])) {
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike}스트라이크 ${ball}볼`,
          });
          this.$refs.answer.focus();
          this.value = '';
        }
      }
    },
  },
};
</script>

<style lang="scss">

</style>