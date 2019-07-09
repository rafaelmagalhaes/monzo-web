<template>
  <section>
    <Accounts v-if="accounts.length" :account="accounts"/>
  </section>
</template>

<script>

  import Accounts from '~/components/Accounts/Accounts'

  export default {
    middleware: 'auth',
    components: {
      Accounts
    },
    async mounted() {
      await this.$store.dispatch('getAccounts')
    },
    data() {
      return {}
    },
    computed: {
      accounts() {
        return this.$store.getters.getAccount
      }
    }
  }

</script>
