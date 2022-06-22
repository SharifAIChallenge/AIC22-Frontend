<template>
  <div id="main">
    <Header/>
    <HeadTop/>
    <About/>
<!--    <Statics/>-->
    <TimeLine/>
    <Prize/>
    <sponsor/>
    <FAQ/>
    <Staff/>
<!--    <Tweets/>-->
<!--    <Blog/>-->
    <CallToAction/>
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/old/Intersection.vue';
import TimeLine from '~/components/landing/Timeline';
import About from '~/components/landing/About.vue';
import Sponsor from '~/components/landing/Sponsor.vue';
import HeadTop from '~/components/landing/HeadTop.vue';
import CallToAction from '~/components/CallToAction.vue';
import Staff from '~/components/landing/Staff';
import EmailCallToAction from '~/components/EmailCallToAction.vue';
import Blog from "~/components/landing/Blog";
import Statics from "~/components/landing/Statics";
import Prize from "~/components/landing/Prize";
import FAQ from "~/components/landing/FAQ"
import Tweets from "~/components/landing/tweets";

export default {
  components: {
    FAQ,
    Tweets,
    Prize,
    Blog,
    Header,
    Intersection,
    TimeLine,
    About,
    Sponsor,
    HeadTop,
    Staff,
    CallToAction,
    EmailCallToAction,
    Statics
  },
  layout: 'landing',
  EmailCallToAction: false,
  data: () => ({
    width: 0,
    height: 0,
    scrollItem: 0,
  }),
  async fetch() {
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
