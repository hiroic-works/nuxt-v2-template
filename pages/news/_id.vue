<template>
  <section class="news">
    <article>
      <h1>{{ list.title }}</h1>
      <time>{{ $dayjs().format('YYYY/MM/DD HH:mm:ss') }}</time>
      <div
        :class="`news-article news-article-${list.id}`"
        v-html="list.body"
      ></div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'NewsPage',
  layout: 'sub',
  async asyncData({ app, $config, params, error }) {
    // ダミー
    let list
    try {
      const { data } = await app.$axios.get(
        `${$config.apiBaseUrl}/posts/${params.id}`
      )
      list = data
    } catch (e) {
      error({ statusCode: 404, message: 'News not found.' })
    }
    return { list }
  },
  data() {
    return {}
  },
  head() {
    return {
      title: this.list.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.list.body,
        },
        { hid: 'og:title', property: 'og:title', content: this.list.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.list.body,
        },
        { hid: 'og:url', property: 'og:url', content: 'ページURL' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'ページOGP画像URL',
        },
      ],
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
