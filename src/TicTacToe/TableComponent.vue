<template>
  <table>
    <slot />
  </table>
</template>

<script>

export default {
  // 이름
  name: 'TableComponent',
  // 컴포넌트
  components: {},
  // 프롭스
  props: {},
  // 데이터
  data() {
    return {};
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