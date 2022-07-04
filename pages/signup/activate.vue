<template>
  <div>
    <v-row
        v-if="isActivated && !loading"
        justify="center"
        align="center"
        style="height: 100vh"
        class="ma-n3 flex-column"
    >
      <glow>
        <div class="text-center">
          <v-icon size="200" color="success">
            mdi-account-check-outline
          </v-icon>
        </div>
      </glow>
      <div class="text-center">
        حساب کاربری شما فعال شد!
      </div>
      <v-btn rounded outlined depressed light large color="white" class="px-10 my-10" to="/login">
        <v-icon left color="primary">
          mdi-shield-star
        </v-icon>
        {{ $t('form.signIn') }}
      </v-btn>
    </v-row>
    <v-row v-else-if="!isActivated && !loading" justify="center" align="center" style="height: 100vh" class="ma-n3 flex-column">
      <glow>
        <div class="text-center">
          <v-icon size="200" color="error">
            mdi-account-search-outline
          </v-icon>
        </div>
      </glow>
      <div class="text-center">
        خطایی رخ داده است!
      </div>
      <div class="mt-5">
        <v-row>
          <form ref="form" v-model="valid" @submit.prevent="resendActivationLink">
            <v-col cols="12">
              <v-text-field
                  rounded
                  :label="$t('form.email')"
                  v-model="form.email"
                  type="email"
                  :rules="emailRules"
                  required
                  outlined
                  :error="result.errors.email"
                  dir="ltr"
                  height="36px"
                  validate-on-blur
                  class="autofill-bg"
                  @focus="clearError('email')"
              ></v-text-field>
            </v-col>
            <v-col class="text-center" cols="12">
              <v-btn block
                     rounded
                     :loading="loading"
                     type="submit"
                     color="primary">ارسال دوباره لینک فعال سازی</v-btn>
            </v-col>
          </form>
        </v-row>
      </div>
      <v-btn rounded outlined depressed light large color="white" class="px-10 my-10" to="/">
        <v-icon left color="primary">
          mdi-home
        </v-icon>
        {{ $t('home.home') }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Glow from '../../components/Glow'
import { emailRules, requiredRules, phoneRules } from '../../mixins/formValidations';

export default {
  layout: 'form',
  components: {Glow},
  mixins: [requiredRules, emailRules, phoneRules],

  data() {
    return{
      isActivated : false,
      loading : true,
      valid : false,
      isSent:false,
      form:{
        email:''
      },
      result: {
        value: false,
        type: 'success',
        message: '',
        errors: {},
      },
    }
  },
  methods:{
    resendActivationLink(){
      if (this.form.email ==='') return
      this.$axios.$post('/account/resend-activation-link',this.form).then(() =>{
        this.$toast.success('ثبت‌نام با موفقیت انجام شد، برای ادامه ایمیل(به همراه پوشه اسپم) خود را چک کنید.')
        this.isSent = true
      })
      if (this.isSent)  this.$toast.success('ثبت‌نام با موفقیت انجام شد، برای ادامه ایمیل(به همراه پوشه اسپم) خود را چک کنید.')
      else this.$toast.error("ایمیل وارد شده صحیح نمی باشد درصورت اطمینان از ثبت نام بار دیگر امتحان کنید")
    },
    clearError(field) {
      if (this.result.errors[field]) {
        this.result.errors[field] = false;
      }
    },
  },
  mounted() {
    let eid = this.$route.query.eid
    let token = this.$route.query.token
    this.loading = true
      this.$axios.$get(`/account/activate/${eid}/${token}`).then(res => {
        if (res.detail === 'Account Activated'){
          this.isActivated = true
          this.$toast.success("اکانت شما با موفقیت فعال شد.")
        }
        this.loading = false
      })
    this.loading = false
    if (!this.isActivated) this.$toast.error(" در روند فعال سازی اکانت شما مشکلی پیش آمده است.")
  }
}
</script>

<style scoped></style>
