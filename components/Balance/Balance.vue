<template>
  <section class="d-flex">
    <div class="my-0 mr-lg-5 ">
      <h5 class="balance">Balance <br/>
        <span>£{{this.balance.balance | currency }}</span></h5>
    </div>
    <div class="my-0 mr-md-auto">
      <h5 class="balance">Spent Today <br/>
        <span>£{{this.balance.spend_today | currency}}</span></h5>
    </div>
  </section>
</template>
<script>
  import '~/plugins/filters'

  export default {
    props: {
      balance: {
        type: Object,
        required: true
      }
    },
  }
</script>
<style>
  .balance {
    text-transform: uppercase;
    font-size: 15px;
    color: #aab2c0;
  }
  .balance span {
    color: white;
    font-weight: 300;
    font-size: 20px;
  }
</style>
