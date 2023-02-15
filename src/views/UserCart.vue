<template>
<LoadingShow :active="isLoading"></LoadingShow>
<div class="row g-3">
  <div class="row row-cols-1 col-9 row-cols-md-3 g-4 col-md-7 col-lg-8">
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
        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="button" autocomplete="off"
        :disabled="this.status.loadingItem === item.id"
        @click="addCart(item.id)">加入購物車<div v-if="this.status.loadingItem === item.id" class="spinner-grow text-danger spinner-grow-sm" role="status">
        <span class="visually-hidden">Loading...</span>
        </div></button>
      </div>
    </div>
  </div>
  <div class="col-md-5 col-3 col-lg-4 order-md-last" v-if="cartList">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">購物車</span>
            <span class="badge bg-primary rounded-pill">總計{{ cartList.length }}項</span>
          </h4>
          <ul class="list-group mb-3" >
            <li class="list-group-item d-flex justify-content-between lh-sm" v-for="item in cartList" :key="item">
              <div>
                <h6 class="my-0">{{ item.product.title }}</h6>
                <button class="btn btn-outline-dander btn-sm" @click="delCart(item.product.id)" type="button"><i class="bi bi-trash"></i></button>
                <small class="text-muted">{{ item.product.content }}</small>
              </div>
              <span class="text-muted">${{ item.total }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>清空購物車</span>
              <button class="btn btn-outline-dander btn-sm" @click="delCartAll" type="button"><i class="bi bi-trash"></i></button>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>總計 (NTW)</span>
              <strong>{{ price }}</strong>
            </li>
          </ul>
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
      pagination: {},
      status: {
        loadingItem: '' // 對應品項ID
      },
      cartList: [],
      price: '',
      totalPrice: ''
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
          this.getCartList()
        }
      }
      )
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.status.loadingItem = ''
        this.getCartList()
      })
    },
    getCartList () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.cartList = res.data.data.carts
        this.price = res.data.data.total
        this.totalPrice = res.data.data.final_total
      })
    },
    delCart (id) {
      this.status.loadingItem = id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.status.loadingItem = ''
        this.isLoading = false
        console.log(res)
        this.getProducts()
      })
    },
    delCartAll (id) {
      this.status.loadingItem = id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.status.loadingItem = ''
        this.getProducts()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getCartList()
    this.getProducts()
  }
}

</script>
