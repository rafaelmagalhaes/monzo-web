/*jshint esversion: 6 */

import Vue from 'vue';
import moment from 'vue-moment';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(moment);
Vue.use(VueGoogleMaps, {
  load:{
    key: process.env.GOOGLE_MAPS_API_KEY,
    libraries: "places" // necessary for places input
  }
});
