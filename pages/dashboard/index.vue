<template>
  <div class="align-center h-full">
  <News :news='news' />
  </div>
</template>

<script>
import News from "../../components/dashboard/news";


export default {
  layout: 'dashboard',
  transition: 'fade-transition',
  components: {
    News
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
      news:[]
    }
  },
 mounted(){
  this.$axios.get('communication/notifications').then(res =>{
            this.news = res.data.data;
        })
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
