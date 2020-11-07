<template>
  <div class="lottoBall" v-bind:style="setColor">{{ number }}</div>
</template>

<script>
export default {
  // 이름
  name: 'LottoBall',
  // 컴포넌트
  components: {},
  // 프롭스
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  // 데이터
  data() {
    return {};
  },
  // 가공된 데이터
  computed: {
    setColor() {
      let background;
      let color;

      if (this.number <= 10) {
        background = '#bbbb00';
        color = '#ffffff';
      } else if (this.number <= 20) {
        background = '#268bff';
        color = '#ffffff';
      } else if (this.number <= 30) {
        background = '#c30505';
        color = '#ffffff';
      } else if (this.number <= 40) {
        background = '#666666';
        color = '#ffffff';
      } else {
        background = '#11b32c';
        color = '#ffffff';
      }
      return {
        background, color,
      };
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
  .lottoBall {
    display: inline-block;
    border: 1px solid #333333;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>