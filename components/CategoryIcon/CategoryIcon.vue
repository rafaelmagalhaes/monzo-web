<template>
  <img v-if="category" :src="imgSrc" alt="" :class="'category-icon--'+ category+ '-bg'">
  <div v-else-if="character"
       class="category-icon--character"
       :style="characterBackground">
    {{character}}
  </div>
</template>

<script>
  export default {
    props: ['category', 'character'],
    computed: {
      imgSrc: function () {
        return require('../../static/category-icons/' + this.category + '.svg')
      },
      characterBackground() {
        return {'backgroundColor': 'hsl(' + this.nameToHue(this.character) + ', 37%, 50%)'}
      }

    },
    methods: {
      mapRange(value, low1, high1, low2, high2) {
        return (low2 + ((high2 - low2) * (value - low1))) / (high1 - low1);
      },
      nameToHue(name) {
        const MIN_CHAR_CODE = 65;
        const MAX_CHAR_CODE = 90;
        const MIN_HUE = 0;
        const MAX_HUE = 360;
        return this.mapRange(name.charCodeAt(0), MIN_CHAR_CODE, MAX_CHAR_CODE, MIN_HUE, MAX_HUE);
      }
    }
  }
</script>
<style>
  @import '~/assets/vars.css';

  .category-icon--character {
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 200%;
  }

  .category-icon--transport-bg {
    background-color: var(--color-category-transport);
  }

  .category-icon--groceries-bg {
    background-color: var(--color-category-groceries);
  }

  .category-icon--eating_out-bg {
    background-color: var(--color-category-eatingOut);
  }

  .category-icon--cash-bg {
    background-color: var(--color-category-cash);
  }

  .category-icon--bills-bg {
    background-color: var(--color-category-bills);
  }

  .category-icon--entertainment-bg {
    background-color: var(--color-category-entertainment);
  }

  .category-icon--shopping-bg {
    background-color: var(--color-category-shopping);
  }

  .category-icon--holidays-bg {
    background-color: var(--color-category-holidays);
  }

  .category-icon--family-bg {
    background-color: var(--color-category-family);
  }

  .category-icon--personal_care-bg {
    background-color: var(--color-category-personalCare);
  }

  .category-icon--general-bg {
    background-color: var(--color-category-general);
  }

  .category-icon--expenses-bg {
    background-color: var(--color-category-expenses);
  }

</style>
