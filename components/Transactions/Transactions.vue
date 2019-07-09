<template>
  <section>
    <div class="transactions">
      <ul class="transactions_list">
        <Transaction :transactions="sortByDate"/>
      </ul>
    </div>
  </section>
</template>

<script>
  import Transaction from '~/components/Transaction/Transaction'

  export default {
    components: {
      Transaction
    },
    watch: {
      transactions: function (newVal) {
        return this.transactions = newVal
      }
    },
    props: {
      transactions: {required: true}
    },
    data() {
      return {
        scheme: 'uk_retail_pot'
      }
    },
    computed: {
      getTransactions() {
        return this.transactions
      },
      removePotFromTransactions() { // remove transactions to do with the pots
        let transactions = this.getTransactions;
        return transactions.filter((pot) => {
          if (pot.scheme !== this.scheme) {
            return pot
          }
        })
      },
      sortByDate() {
        let transactions = this.removePotFromTransactions
        transactions.sort((a, b) => { // sort the transactions by date created
          return new Date(b.created) - new Date(a.created);
        })
        return transactions
      },
    }

  }
</script>

<style>
  .transactions {
    background-color: white;
    border-top: 1px solid lightgray;
    height: 67vh;
    width: 100%;
    overflow-y: auto;
  }

  .transactions_list {
    list-style-type: none;
  }
</style>
