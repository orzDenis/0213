<template>
  <NavBar></NavBar>
  <div class="container-fluid"><router-view/></div>
</template>

<script>
import emitter from '@/methods/emitter'
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  // 給所有元件都使用到使用 provide 傳給內層用
  provide () {
    return {
      emitter
    }
  },
  created () {
    // 抓token 的固定格式
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    // 把token 存起來
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      // 判斷如果 token 是空的即返回登入頁面
      if (!res.data.success) {
        this.$router.push('login')
      }
    }
    )
  }
}
</script>
