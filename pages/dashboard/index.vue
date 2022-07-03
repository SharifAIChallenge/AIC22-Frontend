<template>
  <div class="align-center h-full" style="margin-top: 15%">
    <div class="text-center mt-6">
      <v-icon size="200px" color="success">
        mdi-check
      </v-icon>
    </div>
    <div class="text-center notice-box my-7" style="max-width: fit-content;">
      <!--    <Notification class="pb-3 notif" style="margin-right: auto; min-height: 100vh" />-->
      <div>
        ثبت نام شما در مرحله اول با موفقیت به اتمام رسید.
      </div>
      <div>
        کلی اتفاقات جذاب قراره رخ بده پس اخبار رویداد رو از شبکه های اجتماعی زیر دنبال کنید.😎
      </div>
    </div>
      <div class="d-flex justify-center mt-15">
        <v-btn
            v-for="social in socials"
            :key="social.icon"
            :href="social.url"
            class="mx-5 transparent"
            target="_blank"
            icon
            large
        >
          <v-icon size="30px">
            {{ social.icon }}
          </v-icon>
        </v-btn>
    </div>
  </div>
</template>

<script>
import Notification from '~/components/dashboard/Notification';
export default {
  layout: 'dashboard',
  transition: 'fade-transition',
  components: {
    Notification,
  },
  data(){
    return{
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
        },
        {
          url: 'https://t.me/AIChallenge2022',
          icon: 'mdi-send',
        },
      ],
    }
  }
};
</script>

<style scoped lang="scss">
@import '~/assets/mixins.scss';
.father {
  display: grid;
}
.child {
  align-self: center;
  justify-self: center;
}
.notif {
  width: 33.333%;
  @include v-not-md {
    width: 100%;
  }
}
</style>
