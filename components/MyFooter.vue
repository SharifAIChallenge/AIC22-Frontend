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
            <v-btn
            href="https://t.me/AIChallenge2022"
            class="mx-1 transparent"
            target="_blank"
            icon
            large>
              <img src="../assets/images/telegram.png" alt="aic-telegram" height="30px" width="30px">
            </v-btn>
          </div>
        </v-col>
        <v-col class="col-12 caption col-md-6 text-center text-md-right d-flex flex-direction-row">
          <div class="footer-caption"><a href="https://aichallenge.ir">رویداد هوش مصنوعی</a>، یک رویداد دانشجویی است که اولین بار در سال ۱۳۸۷ توسط جمعی از دانشجوهای برترین دانشگاه‌های ایران برگزار شده‌است. از این رویداد به‌عنوان بزرگ‌ترین مسابقهٔ هوش مصنوعی در ایران می‌توان یاد کرد.</div>
          <img src="../assets/images/logo/header-logo-01.svg" alt="AIC2022" height="60px" width="60px">
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
          url: 'https://www.instagram.com/aichallenge/',
          icon: 'mdi-instagram',
        },
        {
          url: 'https://twitter.com/AIchallenge2022',
          icon: 'mdi-twitter',
        },
        {
          url: 'https://www.linkedin.com/company/ai-challenge2022/',
          icon: 'mdi-linkedin',
        }
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.footer-caption{
  font-size: 0.6rem !important;
  padding-top: 0.5rem;
}
</style>
