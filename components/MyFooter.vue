<template>
  <v-footer dark padless class="footer" color="bg_secondary">
    <v-container>
      <v-row dir="ltr" align="center">

        <v-col class="text-center-sm-and-down col-12 col-md-6 social_box mx-auto">
          <div class="d-flex justify-center justify-md-start">
            <v-btn
                v-for="social in socials"
                :key="social.icon"
                :href="social.url"
                class="mx-1 transparent"
                target="_blank"
                icon
                large
            >
              <v-icon size="30px">
                {{ social.icon }}
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col class="col-12 caption col-md-6 text-center text-md-right">
            <v-icon right small>mdi-copyright</v-icon>
            تمامی حقوق متعلق به تیم برندینگ رویداد میباشد
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import LogoMark from '../components/LogoMark';

export default {
  components: {LogoMark},
  data() {
    return {
      socials: [
        {
          url: 'https://www.instagram.com/barnig.ir/',
          icon: 'mdi-instagram',
        },
        {
          url: 'https://www.instagram.com/barnig.ir/',
          icon: 'mdi-instagram',
        }
      ],
    };
  },
};
</script>

<style scoped lang="scss">

</style>
