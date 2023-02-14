<template>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <!-- 外層叫做pagination 亦是後端設定的名稱 可以透過console看陣列格式 -->
    <!-- pages.total_pages 是後端設的資訊 透過外層傳進來到pages裡面再取出來 -->
    <!-- current_page 亦是後端設定的資訊 在此乃當前頁面 故page=current_pageg時候啟動active 的屬性 -->
    <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{ 'active': page === pages.current_page}">
    <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
