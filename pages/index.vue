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
<!--    <Tweets/>-->
    <Blog :posts="posts" title="آخرین اخبار" number="3"/>
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
import Blog from "~/components/utilities/Blog";
import Statics from "~/components/landing/Statics";
import Prize from "~/components/landing/Prize";
import FAQ from "~/components/landing/FAQ"
import Tweets from "~/components/landing/tweets";
// import {getPosts} from "~/api/blog";

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
    // width: 0,
    // height: 0,
    // scrollItem: 0,
    posts :[]
  }),
  async fetch() {
    await this.$axios.$get('/news').then(res => {
      res.map(post => {
        let date = post.post_time.split('T')[0]
        let today = new Date()
        let post_date = new Date(date).toLocaleDateString()
        let timeDifference = Math.abs(new Date(today.toLocaleDateString()) - new Date(post_date))
        let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        if (daysDifference === 0){
          post.post_time = 'امروز'
        }else if (daysDifference === 1){
          post.post_time = 'دیروز'
        }else {
          post.post_time = `${daysDifference} روز قبل `
        }
      })
      this.posts = res
    })
  },

  mounted() {
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
