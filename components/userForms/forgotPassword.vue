<template>
  <div class="main pa-5">
    <div class="container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-form ref="form" v-model="valid" @submit.prevent="resetPassword">
            <v-text-field
                rounded
                :label="$t('form.email')"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
                outlined
                dir="ltr"
                height="36px"
                validate-on-blur
                class="autofill-bg"
            ></v-text-field>

            <v-row>
              <v-col>
                <v-btn
                    block
                    rounded
                    :disabled="!valid"
                    :loading="loading"
                    type="submit"
                    color="primary"
                >
                  ارسال لینک تغییر رمز عبور
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../mixins/formValidations';
import { resetPassword } from '../../api';

export default {
  mixins: [requiredRules, emailRules],
  data() {
    return {
      valid: false,
      email: '',
      loading: false,
    };
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
    async resetPassword() {
      this.loading = true;
      let data = await resetPassword(this.$axios,this.email)
      this.loading = false;
      if (data.detail) {
        if (data.detail === 'Successfully Sent Reset Password Email') {
          this.$toast.success('لینک تغییر رمز عبور به ایمیل شما ارسال شد.');
          this.$refs.form.reset();
        } else {
          this.$toast.error('ایمیل پیدا نشد.');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-forgot-form {
  margin: 100px auto;
  max-width: 500px;
}
.forgot-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 40px;
  font-weight: bold;
}
.login-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0;
  right: 0;
  border-radius: 0;
}
</style>
