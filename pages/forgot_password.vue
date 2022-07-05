<template>
  <div class="h-full my-16">
    <Header/>
    <v-container class="h-full d-flex flex-column align-center justify-center">
      <title-container title="فراموشی رمز عبور"></title-container>
        <Box>
          <forgot-password/>
        </Box>
    </v-container>
  </div>
</template>

<script>
import forgotPassword from "~/components/userForms/forgotPassword";
import TitleContainer from "~/components/TitleContainer";
import Header from "~/components/landing/Header";
import Box from "~/components/utilities/Box";

export default {
  layout: 'form',
  components:{Box, Header, TitleContainer, forgotPassword},
  mounted() {
    this.$store.commit('formStatus/toggleShow');
    this.$store.commit('formStatus/changeStatus', 'forgot');
  },
};
</script>
