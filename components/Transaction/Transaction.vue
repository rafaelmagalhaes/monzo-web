<template>
  <section>
    <div class="transaction-search__container">
      <input type="text" v-model="search" placeholder="Search transactions..." class="transaction-search__input"/>
    </div>
    <li class="transaction" v-on:click="loadSingleTransaction(transaction)"
        v-for="transaction in filteredTransactions">
      <div class="transaction__logo-container">
        <div v-if="transaction.merchant">
          <img class="transaction__logo" v-if="transaction.merchant.logo" :src="transaction.merchant.logo"
               alt=""/>

          <CategoryIcon v-else-if="transaction.merchant.category" class="transaction__logo"
                        :category="transaction.merchant.category"/>

        </div>


        <CategoryIcon v-else-if="transaction.counterparty && transaction.counterparty.name"
                      class="transaction__logo"
                      :character="transaction.counterparty.name.charAt(0)"/>

        <CategoryIcon v-else-if="transaction.is_load" class="transaction__logo"
                      :character="'+'"/>
      </div>

      <div class="transaction_detail">
        <div class="transaction_title">{{processTitle(transaction)}}</div>
        <div class="transaction_info">
          <span class="transaction__amount">{{transaction.created  | moment("DD,MM,YY")}}</span>
          <span class="transaction__info"></span>
        </div>
      </div>
      <div class="transaction_amount ml-auto">{{transaction.local_currency | CurrencyCode}}{{transaction.amount |
        currency }}
      </div>
    </li>
  </section>
</template>

<script>
  import currencyCodes from '~/assets/currency-codes.json'
  import CategoryIcon from '~/components/CategoryIcon/CategoryIcon'
  export default {
    props: {
      transactions: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        search: ''
      }
    },
    components: {
      CategoryIcon
    },
    computed: {
      filteredTransactions() {
        return this.transactions.filter(transaction => {

          if (transaction.merchant) {
            if (transaction.merchant.name) {
              return transaction.merchant.name.toLowerCase().includes(this.search.toLowerCase())

            }
          }

          if (transaction.counterparty) {
            if (transaction.counterparty.name) {
              return transaction.counterparty.name.toLowerCase().includes(this.search.toLowerCase())
            }

          }
          return ''
        })
      },


    },

    methods: {
      processTitle(transaction) {
        if (transaction.counterparty) {
          if (transaction.counterparty.name) {
            return transaction.counterparty.name;
          }

          if (transaction.counterparty.number) {
            return transaction.counterparty.number;
          }
        }

        if (transaction.merchant) {
          const googlePlacesName = (
            transaction.merchant.metadata && transaction.merchant.metadata.google_places_name
          );
          if (transaction.merchant.name) {
            if (transaction.merchant.atm) {
              return `${transaction.merchant.name}${googlePlacesName ? ` - ${googlePlacesName}` : ''}`;
            }
            return transaction.merchant.name;
          }
        }

        if (transaction.is_load) {
          return 'Top up';
        }

        if (transaction.notes) {
          return transaction.notes;
        }

        return '';
      },
      loadSingleTransaction(obj) {
        this.$store.dispatch('getSingleTransaction', obj.id)
      }
    }

  }

</script>

<style>
  .transaction {
    padding: 0.75em;
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color .05s linear;
  }

  .transaction:last-child {
    border: none;
  }

  .transaction__detail {
    width: 100%;
  }

  .transaction__info {
    color: gray;
    font-size: 0.85em;
  }

  .transaction__amount {
    width: 10em;
    text-align: right;
    font-size: 1.25em;
  }

  .transaction__amount-positive {
    color: green;
  }

  .transaction__logo-container {
    margin-right: 1em;
  }

  .transaction__logo {
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 2px;
  }

  .transaction__detail-decline {
    color: red;
  }

  .transaction:hover {
    background-color: lightgrey;
  }

  .transaction:active {
    background-color: grey;
  }

  .transaction:focus {
    background-color: lightgrey;
    outline: none;
  }

  .transaction-search__container {
    min-width: 16em;
  }

  .transaction-search__label {
    margin-bottom: 0.4em;
    color: lightgrey;
  }

  .transaction-search__input {
    padding: 0.5em 1em;
    border: 2px solid transparent;
    line-height: 1.5em;
    width: 100%;
    font-size: 75%;
  }
</style>
