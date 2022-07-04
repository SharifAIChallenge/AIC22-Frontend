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

export default {
  layout: 'form',
  components: {Glow},

  data() {
    return{
      isActivated : false,
      loading : true
    }
  },
  mounted() {
    let eid = this.$route.query.eid
    let token = this.$route.query.token
    this.$axios.$get(`/account/activate/${eid}/${token}`).then(res => {
      this.loading = true
      if (res.detail === 'Account Activated') this.isActivated = true
      this.loading = false
    })
  }
}
</script>

<style scoped></style>
