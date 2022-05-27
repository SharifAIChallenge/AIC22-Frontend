<template>
  <div class="h-full my-16">
    <Header/>
    <v-container class="h-full d-flex flex-column align-center justify-center">
      <TitleContainer title="ورود"/>
      <div>
        <Box>
          <Login/>

        </Box>
        <div class="d-flex align-center justify-space-between my-10">
        <p class="caption ma-0">
          حساب کاربری ندارید؟
        </p>
          <v-btn
            to="/signup"
                 rounded
                 class="px-6 v-button--secondary"
          >
            <span class="font-weight-bold">ثبت نام</span>
          </v-btn>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import Header from "~/components/landing/Header";
import Box from "~/components/utilities/Box";
import Login from "~/components/userForms/login";
import TitleContainer from '~/components/TitleContainer';

export default {
  components: {TitleContainer, Login, Box, Header },
  layout: 'landing',
};
</script>
