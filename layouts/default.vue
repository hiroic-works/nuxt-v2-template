<template>
  <div class="wrapper">
    <MainHeader />
    <main class="main">
      <Nuxt />
    </main>
    <MainFooter />
  </div>
</template>

<script>
export default {
  name: 'DefalutLayout',
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
</style>
