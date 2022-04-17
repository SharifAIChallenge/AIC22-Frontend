<template>
  <v-app>
    <Header color="transparent" />
    <v-main>
      <nuxt />
    </v-main>
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';
import Header from '~/components/landing/old/Header.vue';
export default {
  components: { MyFooter, Header },
};
</script>
