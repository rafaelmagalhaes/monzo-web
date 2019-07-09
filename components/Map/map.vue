<template>
  <div>
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="12"
      style="width:100%;  min-height: 400px; height: 100%">
      <gmap-info-window class="w-100"
                        :opened="infoOpened"
                        :position="infoPosition"
                        @closeclick="infoOpened=false">
        <TransactionDetail v-if="infoContent.id" :transactionDetail="infoContent"></TransactionDetail>
      </gmap-info-window>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfo(m,index)"
      ></gmap-marker>


    </gmap-map>

  </div>
</template>
<script>
  import "~/plugins/plugins";
  import {gmapApi} from "vue2-google-maps";
  import TransactionDetail from '~/components/TransactionDetail/TransactionDetail'


  export default {
    components: {TransactionDetail},
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: {lat: 45.508, lng: -73.587},
        markers: [],
        map: "map",
        infoOptions: {
          width: 0,
          height: -35

        },
        infoPosition: {
          lat: 0,
          lng: 0
        },
        infoOpened: false,
        infoContent: ""
      };
    },

    mounted() {
      return this.geolocate()
    },
    computed: {
      google: gmapApi, // call google map api to be able to refer to google maps api
      transactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions'))
        return transactions.transactions.filter(transac => {
          if (transac.merchant) {
            return transac.merchant;
          }
        });
      }
    },
    methods: {
      toggleInfo(m) {

        this.infoOpened = true;
        this.infoPosition = m.position
        this.infoContent = m.transaction
      },
      geolocate: function () {
        this.$refs.mapRef.$mapPromise.then(map => {
            // reference the map
            var markerBounds = this.google && new google.maps.LatLngBounds();
            var cords, address;
            var infowindow = new google.maps.InfoWindow();
            this.transactions.map(obj => {
              cords = {
                lat: obj.merchant.address.latitude,
                lng: obj.merchant.address.longitude
              };
              // Generate points for transaction address
              // Draw a marker for each transaction point
              this.markers.push({
                position: cords,
                title: obj.merchant.name,
                transaction: obj
              });

              // Extend markerBounds with each transaction point.
              markerBounds.extend(cords);
            })


            map.fitBounds(markerBounds);
          }
        )
        ;
      }
    }
  }
  ;
</script>
<style>
  .gm-style .gm-style-iw {
    width: 100% !important;
    height: 100% !important;
    min-height: 200px;

  }

  /*style the p tag*/
  .gm-style .gm-style-iw #google-popup p {
    padding: 10px;
  }
</style>
