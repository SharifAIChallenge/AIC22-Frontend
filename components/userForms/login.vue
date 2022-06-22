<template>
  <div class="main pa-5">
    <div class="main-login-form container">
      <v-row justify="center" align="center">
        <v-col>
          <v-form ref="form" v-model="valid" @submit.prevent="login">
            <v-text-field
              v-model="email"
              :label="$t('form.email')"
              outlined
              rounded
              dir="ltr"
              type="email"
              :rules="emailRules"
              required
              autofocus
              validate-on-blur
              height="36px"
              aria-autocomplete="email"
              class="autofill-bg"
            ></v-text-field>
            <password-input v-model="password" />
            <a @click="changeStatus('forgot')" class="caption">{{ $t("form.forgotPassword") }}</a>

            <v-row class="mb-14 mb-md-0 mt-4">
              <v-col>
                <v-btn
                  block
                  :disabled="loading || !valid"
                  :loading="loading"
                  type="submit"
                  color="primary"
                  rounded
                >
                  {{ $t("form.signIn") }}
                </v-btn>
                <div class="my-6">
                  <div class="or-separator"><span class="px-3">یا</span></div>
                </div>
                <v-btn
                  @click="loginWithGoogle"
                  block
                  color="secondary"
                  rounded>
                  {{ $t("form.signInWithGoogle") }}
                  <v-icon style="margin:5px" size="25px">mdi-google</v-icon>
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
import PasswordInput from "../PasswordInput";
import { emailRules, requiredRules } from "../../mixins/formValidations";
import { mapState } from "vuex";
import { sendGoogleAuthCode } from "~/api/auth";

export default {
  mixins: [requiredRules, emailRules],
  components: { PasswordInput },
  data() {
    return {
      showPassword: false,
      valid: false,
      email: "",
      password: ""
    };
  },
  methods: {
    changeStatus(form) {
      this.$store.commit("formStatus/changeStatus", form);
    },
    login() {
      this.loading = true;
      this.$store.dispatch("auth/login", {
        username: this.email,
        password: this.password
      });
    },
    async loginWithGoogle() {
      const googleUser = await this.$gAuth.signIn();

      // console.log(await this.$gAuth.signIn());
      // const googleUser = await this.$gAuth.signIn();
      // const googleData = googleUser.getAuthResponse();
      // const { id_token, access_token, scope, expires_in, expires_at } = googleData;
      // let res = await sendGoogleAuthCode(this.$axios, { access_token, id_token, scope, expires_in, expires_at });
      // if (res.status_code === 400) {
      //   this.$toast.error("لاگین با خطا مواجه شد");
      // } else {
      //   this.$store.commit("auth/setToken", res);
      //   this.$router.push("/dashboard");
      //   this.$store.commit("formStatus/toggleShow");
      //   this.$cookies.set("token", res.token, {
      //     maxAge: 60 * 60 * 24 * 7,
      //     path: "/"
      //   });
      // }
    }
  },
  beforeCreate() {
    this.$router.push("/")
  },
  computed: {
    ...mapState({
      loading: state => state.auth.isLoading
    })
  }
};
</script>

<style lang="scss" scoped>
.or-separator {
  width: 100%;
  display: flex;
  align-items: center;

  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ffffff;
  }
}

.main-login-form {
  margin: auto;
  max-width: 500px;
}

.close-btn {
  position: relative;
  font-size: 50px;
  right: 15px;
  top: 15px;
  cursor: pointer;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 55px;
  font-weight: bold;
}

.sigin-up-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0;
  right: 0;
  border-radius: 0;
}
</style>
