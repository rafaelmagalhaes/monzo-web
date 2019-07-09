<template>
  <section class="container-fluid background-gradient">
    <div class="d-flex container flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 ">
      <h5 class="my-0 mr-md-auto font-weight-normal">
        <Logo/>
      </h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <nuxt-link class="p-2 " to="/accounts">Account</nuxt-link>
        <nuxt-link class="p-2 " to="/maps">Maps</nuxt-link>
        <a class="p-2 cursor " @click="logout()">Logout</a>
      </nav>
    </div>
  </section>
</template>
<script>
  import Logo from '~/components/Logo/Logo'

  export default {
    components: {
      Logo
    },
    methods: {
      logout() {
        localStorage.clear();
        return this.$router.replace({path: '/'})
      }
    }
  }
</script>

<style scoped>

  a {
    color: white;
  }

  .cursor {
    cursor: pointer;
    color: white !important;
  }

  .cursor:hover {
    text-decoration: none;
    color: #f4395b !important;
  }

  a:hover {
    text-decoration: none;
    color: #f4395b;
  }
</style>
