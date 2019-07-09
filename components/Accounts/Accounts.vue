<template>
  <section>
    <Loader v-if="loading"/>
    <div class=" background-gradient account" v-if="!loading">
      <div class="d-flex container flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
        <Balance :balance="balance"/>
      </div>
    </div>
    <div class="accounts__transactions" v-if="!loading">
      <div class="accounts__transactions__list">
        <Transactions :transactions="transactions"/>
      </div>
      <div class="accounts__transactions__detail">
        <TransactionDetail/>
      </div>
    </div>
  </section>
</template>

<script>

  import Balance from '~/components/Balance/Balance'
  import Loader from '~/components/Loader/Loader'
  import Transactions from '~/components/Transactions/Transactions'
  import TransactionDetail from '~/components/TransactionDetail/TransactionDetail'

  export default {
    mounted() {
      this.account.filter(async acc => { //loop over the accounts array and return the current account
        if (acc.type === 'uk_retail') {
          await Promise.all([
            this.$store.dispatch('getBalance', acc.id), // get account balance
            this.$store.dispatch('getTransactions', acc.id) // get account transactions
          ]);
          this.current_account = acc
        }
      })
    },
    data() {
      return {
        current_account: {}
      }
    },
    components: {
      Balance,
      Loader,
      Transactions,
      TransactionDetail
    },
    props: {
      account: {
        type: Array,
        required: true
      }
    },
    computed: {
      balance() {
        return this.$store.getters.getBalance
      },
      transactions() {
        return this.$store.getters.getTransactions
      },
      loading() {
        return this.$store.getters.loading
      }
    }
  }

</script>
<style scoped>
  .account {
    margin-top: -16px;
  }

  .nav-tabs {
    border: none;
  }

  .nav-tabs .nav-item {
    margin-bottom: -78px;
  }

  .nav-tabs .nav-link {
    border-color: transparent transparent white;

  }


</style>
