<template>
  <!-- loading的動畫 isLoading是自訂義 -->
  <LoadingShow :active="isLoading"></LoadingShow>
  <div class="text-end"><br>
    <button class="btn btn-primary" type="button" @click="openModal(true)">增加一個產品</button>
  </div>
    <table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id" >
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td class="text-right">
        {{ $filters.currency(item.origin_price) }}
      </td>
      <td class="text-right">
        {{ $filters.currency(item.price) }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-success" v-else>啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="delProductOpen(item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<PaginationList :pages="pagination" @emit-pages="getProducts"></PaginationList>
<PorductModal ref="productModal"
:product="tempProduct"
@update-product="updataPordutc"></PorductModal>
<DelProduct ref="delProduct" :item="tempProduct" @del-product="delProduct"></DelProduct>
</template>

<script>
import PorductModal from '../components/ProductModel.vue'
import PaginationList from '@/components/PaginationList.vue'
import DelProduct from '@/components/DelProduct.vue'

export default {
  data () {
    return {
      // 東西放進來的地方
      products: [],
      // 頁數
      pagination: {},
      // 新增商品時候放置區
      tempProduct: {},
      // 判斷是不是新的(為了要編輯)
      isNew: false,
      // loading 先false=不啟用
      isLoading: false
    }
  },
  components: {
    // 新增一個元件
    PorductModal,
    DelProduct,
    PaginationList
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      // 啟用loading動畫
      this.isLoading = true
      this.$http.get(api).then((res) => {
        // 關閉loading 動畫
        this.isLoading = false
        if (res.data.success) {
          // console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      }
      )
    },
    // 把是不是新的,把編輯的品項加進來
    openModal (isNew, item) {
      // 如果他是新的就把物件打空
      if (isNew) {
        this.tempProduct = {}
      // 不是的話就把item 引用進來
      } else {
        this.tempProduct = { ...item }
      }
      // 會等於我們所傳入的isNew
      this.isNew = isNew
      // 在把ref指向抓起來 套用引用的元件的方法
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    // 上傳新增資料
    updataPordutc (item) {
      this.isLoading = true
      // 先把上傳資料的資料引進temp裡面
      this.tempProduct = item
      // 這段是新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      // 新增的話是用post
      let httpMethod = 'post'
      // 此段是編輯 用isNew去判斷 id要帶進來
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      // 在把ref指向抓起來 套用引用的元件的方法
      const productComponent = this.$refs.productModal
      // 用thhp的post (api, 要推進去的資料) [放要用什麼方法]
      this.$http[httpMethod](api, { data: this.tempProduct }).then(res => {
        this.isLoading = false
        // 成功上傳後就把新增商品隱藏
        productComponent.hideModal()
        if (res.data.success) {
          // 重新渲染
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          console.log(res)
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '操作失敗！',
            content: res.data.message.join('、')
          })
        }
      })
    },
    // 開啟刪除彈跳視窗
    delProductOpen (item) {
      this.tempProduct = { ...item }
      const productComponent = this.$refs.delProduct
      productComponent.showModal()
    },
    delProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false
        const productComponent = this.$refs.delProduct
        productComponent.hideModal()
        this.getProducts()
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
