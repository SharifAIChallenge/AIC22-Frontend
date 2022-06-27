<template>
<div>
  <Sponsor class="mt-15"></Sponsor>
  <AzkiOpenPositions/>
</div>
</template>

<script>
import AzkiOpenPositions from '~/components/sponsors/azkiOpenPositions.vue';
import Sponsor from "~/components/landing/Sponsor";

export default {
    name: "azki",
    components: { AzkiOpenPositions,Sponsor }
}
</script>

<style scoped>

</style>