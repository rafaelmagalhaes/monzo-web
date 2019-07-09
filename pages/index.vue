<template>
  <section class="background-gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <Logo/>
          <h2 class="subtitle">
            a Web interface for monzo
          </h2>
          <div class="links">
            <p> Authorize monzo-web to use your Monzo account.</p>
            <a class="btn btn-outline-primary"
               v-bind:href="'https://auth.monzo.com/?client_id='+ clientID + '&redirect_uri=' +redirectUri+ '&response_type=code'">
              Authorize
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo/Logo'

  export default {
    components: {
      Logo
    },
    computed: {
      clientID() {
        return this.$store.state.client_id
      },
      redirectUri() {
        return this.$store.state.redirect_uri
      }
    },
    fetch({redirect}) {
      if (localStorage.getItem('token')) {
        return redirect('/accounts')
      }
    },


  }

</script>

<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .row {

    text-align: center;
  }

  .subtitle {
    font-weight: 300;
    font-size: 22px;
    padding-top: 15px;
  }

  .links {

    padding-top: 15px;
  }

</style>
