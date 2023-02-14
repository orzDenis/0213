<template>
      <nav >
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
  <div class="container-fluid">
    <a href="#">六角</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      <router-link class="nav-link" to="/login">登入</router-link>
      <router-link class="nav-link" to="/dashboard">DASHBOARD</router-link>
      <router-link class="nav-link" to="/dashboard/products">產品</router-link>
      <router-link class="nav-link" to="/dashboard/products" @click.prevent="logout">登出</router-link>
      </div>
    </div>
  </div>
</nav>
</nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        }
        )
    }
  }
}
</script>
