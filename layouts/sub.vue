<template>
  <div class="wrapper">
    <MainHeader />
    <div class="main">
      <div class="container">
        <main class="content">
          <Nuxt />
        </main>
        <aside class="side">サイドメニューとか</aside>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
export default {
  name: 'SubLayout',
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}
.main {
  flex: 1;
  overflow-x: hidden;
}
.container {
  padding: 10px;
  @include mq('lg', min) {
    max-width: 1536px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 300px;
  }
}
</style>
