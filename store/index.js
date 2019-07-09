import Vue from 'vue'
import Vuex from 'vuex'

const env = require('dotenv').config();

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      account: [],
      transactions: [],
      transaction: {},
      accessToken: '',
      balance: {},
      loading: false,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      gmapKey: process.env.GOOGLE_MAPS_API_KEY
    },
    getters: {
      getAccount(state) {
        return state.account
      },
      getAccessToken(state) {
        return state.accessToken
      },
      getBalance(state) {
        return state.balance
      },
      getSingleTransaction(state) {
        return state.transaction
      },
      getTransactions(state) {
        return state.transactions
      },
      loading(state) {
        return state.loading
      }
    },
    mutations: {
      setLoading(state, payload) {
        state.loading = payload
      },
      setBalance(state, payload) {
        state.balance = payload
      },
      setTransactions(state, payload) {
        state.transactions = payload
      },
      setSingleTransaction(state, payload) {
        state.transaction = payload
      },
      setAccount(state, payload) {
        state.account = payload
      },
      setAccessToken(state, payload) {
        state.accessToken = payload
      }
    },
    actions: {
      getToken({commit, state, redirect}, payload) {
        const data = new FormData();
        const config = {headers: {'Content-Type': 'multipart/form-data'}};

        data.append("grant_type", 'authorization_code');
        data.append("client_id", state.client_id);
        data.append("client_secret", state.client_secret);
        data.append("redirect_uri", state.redirect_uri);
        data.append("code", payload);

        this.$axios.post('oauth2/token', data, config).then((res) => {
          let data = res.data;
          commit('setAccessToken', localStorage.setItem('token', data.access_token))
          return this.$router.replace({path: '/accounts'})

        }).catch((err) => {
          console.log(err)
        })
      },
      async getBalance({commit, state}, payload) {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        await this.$axios.get('balance?account_id=' + payload, config).then((res) => {
          commit('setBalance', res.data)
        }).catch((err) => {
          console.log(err)
        })
      },
      async getAccounts({commit, state}, payload) {
        await this.$axios.get('accounts', {
          params: {
            account_type: 'uk_retail' //get current account
          }
        }).then((res) => {
          commit('setAccount', res.data.accounts)
        }).catch((err) => {
          if (err.response.status === 401) {
            localStorage.clear()
            return this.$router.replace({path: '/'})
          }
          console.log(err)
        })
      },
      async getTransactions({commit, state}, payload) {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        commit('setLoading', true);
        await this.$axios.get('transactions?', {
          params: {
            account_id: payload,
            limit: 50, //limit to 50
            since: '2019-06-28T00:00:00Z', //from July first 2019
            "expand[]": "merchant"
          }
        }, config).then((res) => {
          let transactions = res.data;
          const stored = {
            ...JSON.parse(localStorage.getItem('transactions')),
            ...transactions
          }
          localStorage.setItem('transactions', JSON.stringify(stored))
          commit('setTransactions', stored.transactions);
          commit('setLoading', false)
        }).catch((err) => {
          console.log(err)
        })
      },
      async getSingleTransaction({commit, state}, payload) {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        };
        await this.$axios.get('transactions/' + payload + '?expand[]=merchant', config).then((res) => {
          commit('setSingleTransaction', res.data.transaction)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  })
};
export default store
