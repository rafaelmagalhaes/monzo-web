import Vue from 'vue'
import currencyCodes from '~/assets/currency-codes.json'


Vue.filter('currency', function (val) {
  if (!val && typeof val === 'undefined') {
    return '';
  }

  let addition = false
  let newAmount = String(val)

  if (!newAmount.includes('-') && newAmount !== 0) {
    addition = true
  }

  newAmount = newAmount.replace('-', '');
  let formattedAmount = '0';

  if (newAmount.length > 2) {
    formattedAmount = `${newAmount.substr(0, newAmount.length - 2)}.${newAmount.substr(-2)}`;
  } else if (newAmount.length === 2) {
    formattedAmount = `0.${newAmount}`;
  } else {
    formattedAmount = `0.0${newAmount}`;
  }

  return formattedAmount;

});

Vue.filter('CurrencyCode', function (val) {
  if (!val && typeof val === 'undefined') {
    return '';
  }
  return currencyCodes[val].symbol
});

