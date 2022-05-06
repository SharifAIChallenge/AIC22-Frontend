<template>
  <div class="h-full my-16">
    <Header/>
    <v-container class="h-full d-flex flex-column align-center justify-center">
      <div class='curveTitleContainer'>
        <img class='curveTitleContainer__curveFirstImg' src='../../assets/images/curve1.svg' alt='curve-icon'>
        <img class='curveTitleContainer__curveSecondImg' src='../../assets/images/curve2.svg' alt='curve-icon'>
        <div class='curveTitleContainer__text'>
          ثبت نام
        </div>
      </div>
      <div>
        <Box>
          <SignUp/>

        </Box>
        <div class="d-flex align-center justify-space-between my-10">
          <p class="caption ma-0">
            حساب کاربری دارید؟
          </p>
          <v-btn
            to="/register"
            rounded
            class="px-6 v-button--secondary"
          >
            <span class="font-weight-bold">ورود</span>
          </v-btn>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import Header from "~/components/landing/Header";
import Box from "~/components/utilities/Box";
import SignUp from "~/components/userForms/signUp";

export default {
  components: { SignUp,  Box, Header },
  layout: 'landing',
};
</script>
