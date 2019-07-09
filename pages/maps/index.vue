<template>
  <section>
    <Map/>
  </section>
</template>

<script>
  import Map from "~/components/Map/Map";
  export default {
    middleware: "auth",
    components: {
      Map
    }
  };
</script>
