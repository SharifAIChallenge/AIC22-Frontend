<template>
  <v-card flat tile class='call_to_action transparent mx-auto'>
    <!--    this will be used for background-->
    <!--    <img src='../assets/images/logo/logo__white.svg' class='background-logo' />-->
    <div style='text-align: center;'>
      <v-row sm='5' class='align-start justify-center' style='z-index:1'>
        <img src="~/assets/images/logo/header-logo-01.svg" width="320px" height="320px" alt="logo" class="object-fit"/>
      </v-row>
      <v-row sm='5' class='align-start justify-center' style='z-index:1'>
        <div class='d-flex flex-column align-center align-sm-end justify-center pl-5' style='height:100%'>
          <div class='font-weight-bold text-sm-h4 text-h6 mt-4 mb-1'>{{ $t('form.registerNow') }}!</div>
        </div>
      </v-row>
      <v-row sm='5' class='align-start justify-center px-5'>
        <v-col cols='4'>
          <v-btn
              block
              color='primary'
              to="/signup"
              class='mt-4 ml-4 px-6 v-btn--primary'
          >
            {{ $t('form.register')}}
          </v-btn>
        </v-col>
      </v-row>
      <v-row sm='5' class='align-start justify-center px-5'>
        <v-col cols='4'>
          <v-btn
              block
              color='secondary'
              class='mt-0 ml-4 px-6 v-btn--primary'
          >

            ثبت نام با گوگل
            <v-icon class="mr-2">mdi-google</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--        <v-btn @click="loginWithGoogle" block tile x-large :disabled="true" class="primary my-3 text-center" style="width:12px">-->
    <!--          <v-icon>mdi-google</v-icon>-->
    <!--          ثبت نام با گوگل-->
    <!--        </v-btn>-->
    <!--        <v-btn @click="toggleShow()" tile block x-large :disabled="true" class="black white&#45;&#45;text my-3 px-sm-1 text-center" style="width:calc(100% - 12px)">-->
    <!--          ثبت نام با ایمیل و رمز عبور-->
    <!--        </v-btn>-->

  </v-card>
</template>
<script>
import {sendGoogleAuthCode} from '~/api/auth';

export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    async loginWithGoogle() {
      const googleUser = await this.$gAuth.signIn();
      const googleData = googleUser.getAuthResponse();
      const {id_token, access_token, scope, expires_in, expires_at} = googleData;
      let res = await sendGoogleAuthCode(this.$axios, {access_token, id_token, scope, expires_in, expires_at});
      if (res.status_code === 400) {
        this.$toast.error('لاگین با خطا مواجه شد');
      } else {
        this.$store.commit('auth/setToken', res);
        this.$router.push('/dashboard');
        this.$store.commit('formStatus/toggleShow');
        this.$cookies.set('token', res.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
      }
    },
    toggleShow() {
      this.$store.commit('formStatus/changeStatus', 'signUp');
      this.$store.commit('formStatus/toggleShow');
    },
  },
};
</script>

<style scoped>
.background-logo {
  position: absolute;
  top: 0;
  opacity: 0.15;
  z-index: 0;
}

.call_to_action {
  max-width: 750px;
  position: relative;
  padding-top: 5rem;
  padding-bottom: 200px;
  margin-top: 5rem;
  overflow: hidden;
}
</style>
