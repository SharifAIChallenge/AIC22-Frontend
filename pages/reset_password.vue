<template>
  <div class="h-full my-16">
    <Header/>
    <v-container class="h-full d-flex flex-column align-center justify-center">
      <TitleContainer title="تغییر رمز عبور"/>
      <Box>
        <ResetPassword/>
      </Box>
    </v-container>
  </div>
</template>

<script>
import ResetPassword from "~/components/userForms/resetPassword";
import TitleContainer from "~/components/TitleContainer";
import Box from "~/components/utilities/Box";
import Header from "~/components/landing/Header";

export default {
  layout: 'form',
  components:{Header, Box, TitleContainer, ResetPassword},
  mounted() {
    this.$store.commit('formStatus/toggleShow');
    this.$store.commit('formStatus/changeStatus', 'reset');
  },
};
</script>
