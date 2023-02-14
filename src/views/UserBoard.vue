<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="nav-link" to="/user">首頁</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-link" to="/user/cart">產品頁</router-link>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled">Disabled</a>
      </div>
    </div>
  </div>
</nav>
<div class="container-fluid mt-3 position-relative">
  <ToastList></ToastList>
  <router-view></router-view>
</div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastList from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastList
  },
  // 給所有元件都使用到使用 provide 傳給內層用
  provide () {
    return {
      emitter
    }
  }
}
</script>
