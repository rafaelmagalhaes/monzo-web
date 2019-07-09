<template>
  <section class="container">
    <div>
      <h1 class="title">
        fallback
      </h1>
      <h2 class="subtitle">
        Web interface for monzo
      </h2>
      <div class="links">

        <form method="post">

        </form>
      </div>
    </div>
  </section>


</template>


<script>

  export default {
    mounted: function () {
      return this.$store.dispatch('getToken', this.code)
    },
    data() {
      return {
        code: this.$route.query.code
      }
    }
  }
</script>
