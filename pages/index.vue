<template>
  <div id="main">
    <Header/>
    <HeadTop/>
    <About/>
    <Statics/>
    <TimeLine/>
    <Prize/>
    <sponsor/>
    <FAQ/>
    <Staff/>
    <CallToAction/>
    <Blog/>
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/old/Intersection.vue';
import TimeLine from '~/components/landing/Timeline';
import Video from '~/components/landing/old/video.vue';
import Statistics from '~/components/landing/old/Statistics';
import TrophyDesktop from '~/components/landing/old/TrophyDesktop';
import TrophyMobile from '~/components/landing/old/TrophyMobile';
import Social from '~/components/landing/old/Social.vue';
import About from '~/components/landing/About.vue';
import Sponsor from '~/components/landing/Sponsor.vue';
import HeadTop from '~/components/landing/HeadTop.vue';
import CallToAction from '~/components/CallToAction.vue';
import Staff from '~/components/landing/Staff';
import EmaliCallToAction from '~/components/EmailCallToAction.vue';
import Blog from "~/components/landing/Blog";
import Statics from "~/components/landing/Statics";
import axios from "~/plugins/axios";
import Prize from "~/components/landing/Prize";
import FAQ from "~/components/landing/FAQ"

export default {
  components: {
    FAQ,
    Prize,
    Blog,
    Header,
    Video,
    Statistics,
    Intersection,
    TimeLine,
    TrophyDesktop,
    TrophyMobile,
    Social,
    About,
    Sponsor,
    HeadTop,
    Staff,
    CallToAction,
    EmaliCallToAction,
    Statics
  },
  layout: 'landing',
  EmaliCallToActionh: false,
  data: () => ({
    isIntersec: {
      About: false,
      Timeline: false,
      Sponser: false,
      Video: false,
      Staff: false,
      Trophy: false,
    },
    width: 0,
    height: 0,
    scrollItem: 0,
    trophies: [],
  }),
  async fetch() {
    const trophies = await this.$axios.$get('homepage/prizes');
    this.trophies = trophies.data;
  },

  methods: {
    reSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  mounted() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    for (let item = 0; item < 6; item++) {
    }
    //todo delete this part as it is for testing backend
    // this.$axios.get('faqs/').then(resp=>console.log(resp)).catch(err=>console.log(err))
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}

.v-dialog--fullscreen {
  background: #0e1224;
}
</style>
