<template>
<LoadingShow :active="isLoading"></LoadingShow>
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col" v-for="item in products" :key="item">
    <div class="card h-100 ">
      <img :src="item.imageUrl" style="height: 50%; width: 100%;" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
      </div>
      <div class="card-footer">
      </div>
      <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">查看更多</button>
      <button type="button" class="btn btn-primary" data-bs-toggle="button" autocomplete="off">加入購物車</button>
    </div>
  </div>
</div>
<PaginationList :pages="pagination" @emit-pages="getProducts"></PaginationList>
</template>

<script>
import PaginationList from '@/components/PaginationList.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {}
    }
  },
  components: {
    PaginationList
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          // console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      }
      )
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    }
  },
  created () {
    this.getProducts()
  }
}

</script>
