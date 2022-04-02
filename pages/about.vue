<template>
  <div class="about">
    <h1>アバウトページ</h1>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  head() {
    return {
      title: 'アバウト',
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
