<template>
  <main class="bg-success d-flex justify-content-center align-items-center">
    <form class="bg-white p-3 rounded shadow-lg" @submit.prevent="userLogin">
      <div>
        <label>Kullanıcı Adı</label>
        <input class="form-control" type="text" v-model="login.username" />
      </div>
      <div>
        <label>Şifre</label>
        <input class="form-control" type="text" v-model="login.password" />
      </div>
      <div>
        <button class="btn btn-success w-100 mt-2" type="submit">Giriş Yap</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
  main {
    height: 100vh;
  }
</style>