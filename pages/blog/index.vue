<template>
  <v-app>
    <v-container class="blog">
      <div class='curveTitleContainer'>
        <img class='curveTitleContainer__curveFirstImg' src='../../assets/images/curve1.svg' alt='curve-icon'>
        <img class='curveTitleContainer__curveSecondImg' src='../../assets/images/curve2.svg' alt='curve-icon'>
        <div class='curveTitleContainer__text'>
          اخبار
        </div>
      </div>
      <box classes="elevation-12 mb-16">
        <div class="pa-4 pa-sm-8 pa-md-14 "
        >
          <div class="mb-6 ">
            <CardWithThumbnail
                title="افتتاحیه"
                description="یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد "
                date="فروردین"
                href="https://google.com"/>
          </div>

          <v-row >
            <v-col sm="12" md="6" lg="4" xl="3">
              <Card
                  title="افتتاحیه"
                  description="یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد "
                  date="فروردین"
                  href="https://google.com"
              />

            </v-col>
            <v-col sm="12" md="6" lg="4" xl="3">
              <Card
                  class=""
                  title="افتتاحیه"
                  description="یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد "
                  date="فروردین"
                  href="https://google.com"
              />

            </v-col>
            <v-col sm="12" md="6" lg="4" xl="3">
              <Card
                  class=""
                  title="افتتاحیه"
                  description="یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد "
                  date="فروردین"
                  href="https://google.com"
              />

            </v-col>
          </v-row>
        </div>
      </box>

      <!-- <EmailCallToAction /> -->
      <!--      <CallToAction />-->
    </v-container>
  </v-app>
</template>

<script>
// import { getPosts } from '~/api/blog';
// import Post from '~/components/blog/Post';
// import EmailCallToAction from '~/components/EmailCallToAction.vue';
// import CallToAction from '~/components/CallToAction.vue';
import Card from "~/components/blog/Card";
import Box from "~/components/utilities/Box";
import CardWithThumbnail from "~/components/blog/CardWithThumbnail";

export default {
  components: {
    Box,
    Card,
    CardWithThumbnail
    // 'app-post': Post,
    // CallToAction,
  },
  data() {
    return {
      posts: [],
    };
  },
  async asyncData({$axios}) {
    // let posts = await getPosts($axios);
    // return { posts };
  },
};
</script>

<style scoped lang='scss'>
.w-full{
  width: 100%;
}
.blog {
  margin-top: 100px;
}

</style>
