<template>
  <div class="index">
    <h1>トップページ</h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      titleTemplate: '',
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  color: $color-black;
  @include mq('sm', min) {
    font-size: $font-lg;
  }
}
</style>
