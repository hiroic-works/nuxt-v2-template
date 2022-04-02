<template>
  <div class="news">
    <h1>更新情報ページ</h1>
    <ul>
      <li v-for="(list, i) in lists" :key="i">
        <NuxtLink :to="`/news/${list.id}`">{{ list.title }}</NuxtLink>
      </li>
    </ul>

    <ul v-if="pagerNumbers.length > 1" class="pager">
      <li
        v-for="(number, i) in pagerNumbers"
        :key="i"
        class="page"
        :class="{ active: CurrentpagerNum == number + 1 }"
      >
        <NuxtLink :to="{ path: '/news/page/' + (number + 1) }">
          {{ number + 1 }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  layout: 'sub',
  async asyncData({ app, $config, params, error }) {
    const CurrentpagerNum = params.id || 1 // 現在のページ番号
    const limit = $config.postPerPage // 1ページあたりのper_page
    // ダミー
    let lists, totalCount
    try {
      const { data, headers } = await app.$axios.get(
        `${$config.apiBaseUrl}/posts?_limit=${limit}&_start=${
          (CurrentpagerNum - 1) * limit
        }`
      )
      lists = data
      totalCount = headers['x-total-count']
    } catch (e) {
      error({ statusCode: 404, message: 'News not found.' })
    }

    const pagerNumbers = [...Array(Math.ceil(totalCount / limit)).keys()]

    // 取得したデータが空だったら（取得し終えたら）
    if (!lists.length > 0) {
      error({ statusCode: 404, message: 'News not found.' })
    }

    return { lists, CurrentpagerNum, pagerNumbers }
  },
  data() {
    return {}
  },
  head() {
    return {
      title: '更新情報',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '更新情報ページです',
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
.pager {
  display: flex;
  list-style: none;
  .page {
    margin: 0 5px;
    &.active a {
      background-color: $color-gray-300;
      pointer-events: none;
    }
    a {
      background-color: $color-blue-300;
      padding: 5px 10px;
      display: block;
      color: $color-white;
      text-decoration: none;
    }
  }
}
</style>
