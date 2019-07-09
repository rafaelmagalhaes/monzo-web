<template>
  <section class="transaction-detail" v-if="transaction.id">
    <div class="transaction-detail__map" v-if="!hide_in_map"
         :style="{ 'background-image': 'url(' + getAddress + ')' }">
    </div>

    <!-- Get Merchant logo   -->
    <img v-if="merchant &&  merchant.logo && !hide_in_map" :src="merchant.logo"
         class="transaction-detail__logo" :alt="merchant.name">
    <!--If counter party get party name and send the first character-->
    <CategoryIcon v-if="transaction.counterparty &&  transaction.counterparty.name"
                  :character="transaction.counterparty.name.charAt(0)"
                  class="transaction-detail__logo"/>

    <div class="transaction-detail__summary">
      <div class="transaction-detail__summary__main">

        <div class="transaction-detail__item transaction-detail__header">
          <div class="transaction-detail__header__name">
            {{processTransactionTitle}}
            <!-- get emoji if there is one -->
            <span v-if="merchant">{{merchant.emoji}}</span>
          </div>
          <div class="transaction-detail__header__price">
                            <span :class="{'text-danger': transaction.decline_reason}"
                                  class="transaction-detail__international-currency"
                                  v-if="transaction.notes !== 'Active card check' &&
                                  transaction.local_currency === transaction.currency">
                                 {{transaction.currency   |CurrencyCode}}
                                 {{transaction.amount | currency}}
                            </span>
            <span :class="{'text-danger': transaction.decline_reason}"
                  class="transaction-detail__international-currency"
                  v-else>
                                 {{transaction.currency  |CurrencyCode }}
                                 {{transaction.amount | currency}}
                                 {{transaction.local_currency  |CurrencyCode  }}
                                 {{transaction.local_amount | currency}}
                            </span>
          </div>
        </div>
        <div class="transaction-detail__item " v-if="merchant">
          <a href="">{{merchant.address.short_formatted}}</a>
        </div>
        <div class="transaction-detail__item transaction-detail__created">
          {{transaction.created | moment("dddd, MMMM Do YYYY")}}
        </div>
      </div>
      <div class="transaction-detail__summary__other">
        <div class="transaction-detail__category" v-if="transaction.category">
          <CategoryIcon :category='transaction.category'/>
        </div>
        <div class="transaction-detail__item" v-if="transaction.notes">{{transaction.notes}}</div>
        <div class="transaction-detail__item" v-if="transaction.decline_reason">
          <span class="text-danger">{{getDeclineTranslation(transaction.decline_reason)}}</span>
        </div>
        <div class="transaction-detail__item"
             v-if="transaction.local_currency !== transaction.currency">
          Approximate exchange rate&nbsp;
          <span class="transaction-detail__approx-rate">
                  {{transaction.local_amount  / transaction.amount.toFixed(10) }}
                  {{transaction.local_currency}}
                  &nbsp;to 1GBP
                </span>
        </div>
        <div class="transaction-detail__item transaction-detail__description">
          {{transaction.description}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import '~/plugins/filters'
  import CategoryIcon from '~/components/CategoryIcon/CategoryIcon'

  export default {
    components: {CategoryIcon},
    data() {
      return {
        category: 'transaction-detail__map--category-' + 'entertainment',
      }
    },
    props: {
      transactionDetail: {
        type: Object
      }
    },
    methods: {
      getDeclineTranslation(code) {
        if (!code) {
          return false
        }

        switch (code) {
          case 'INVALID_EXPIRY_DATE':
            return 'Declined, the expiry date was wrong';
          case 'INSUFFICIENT_FUNDS':
            return 'Declined, you had insufficient funds.';
          case 'CARD_INACTIVE':
            return 'Declined, card inactive.';
          case 'CARD_BLOCKED':
            return 'Declined, card blocked.';
          case 'PIN_RETRY_COUNT_EXCEEDED':
            return 'Declined, PIN retry count exceeded.';
          case 'INVALID_CVC':
            return 'Declined, invalid CVC code used';
          default:
            return `Declined, unknown code: ${code}`;
        }
      }
    },
    computed: {
      hide_in_map(){
        if(this.$route.name === 'maps'){
          return true
        }
      },
      transaction() {
        if (this.transactionDetail) {
          return this.transactionDetail
        } else {
          return this.$store.getters.getSingleTransaction
        }
      },
      merchant() {
        if (this.transaction.merchant) {
          return this.transaction.merchant
        }
      },
      processTransactionTitle() {
        let transaction = this.transaction;

        if (transaction.counterparty) {
          if (transaction.counterparty.name) {
            return transaction.counterparty.name;
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
      getAddress() {
        let merchant = this.merchant;
        let address = {};
        let mapImage = '';
        if (merchant) { // check if merchant data is available
          if (merchant.address) { // check if merchant have an address
            address = merchant.address;
            mapImage = 'https://maps.googleapis.com/maps/api/staticmap?size=640x320&zoom=' + address.zoom_level + '&markers=' + address.latitude + ',' + address.longitude + '&scale=1&key=' + process.env.GOOGLE_MAPS_API_KEY;
            //generate a google maps static image of merchant address
            return mapImage //  return static map image
          }
        }
        return mapImage
      }
    }
  }
</script>
<style lang="css">
  .transaction-detail__logo {
    position: absolute;
    height: 5rem;
    width: 5rem;
    top: calc(160px - 3.5rem);
    left: 1rem;
    border-radius: 5px;
  }

  .transaction-detail__empty {
    color: grey;
    text-align: center;
  }

  @media (max-width: 800px) {
    .transaction-detail__empty {
      text-align: left;
    }

    .transaction-detail {
      margin-bottom: 1em;
    }
  }

  .transaction-detail {
    background-color: white;
    border: 1px solid lightgrey;
    position: relative;
  }

  .transaction-detail__map {
    width: 100%;
    height: 9em;
    background-color: lightgrey;
    background-position: center;
    background-size: 110%;
  }

  .transaction-detail__summary__main,
  .transaction-detail__summary__other {
    padding: 1em;
  }

  .transaction-detail__summary__main {
    background: lightgrey;
  }

  .transaction-detail__summary__other {
    padding-right: 4.5em;
    position: relative;
  }

  .transaction-detail__summary__main {
    background: white;
  }

  .transaction-detail__summary__other {
    position: relative;
  }

  .transaction-detail__international-currency {
    color: grey;
    font-size: 0.85em;
    margin-left: 0.25em;
  }

  .transaction-detail__approx-rate {
    font-weight: 600;
  }

  .transaction-detail__item {
    padding: 0.25em 0;
  }

  .transaction-detail__item a {
    color: grey;
  }

  .transaction-detail__category {
    position: absolute;
    right: 1em;
    top: -1.5em;
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .transaction-detail__category img {
    max-width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }

  .transaction-detail__header {
    padding-top: 1em;
    font-size: 1.15em;
    display: flex;
    justify-content: space-between;
  }

  .transaction-detail__header__name {
    font-weight: 600;
    margin-top: 10px;

  }

  .transaction-detail__header__price {
    font-size: 1em;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .transaction-detail__created, .transaction-detail__description {
    color: grey;
  }

  .transaction-detail__description {
    font-size: 75%;
  }


</style>
