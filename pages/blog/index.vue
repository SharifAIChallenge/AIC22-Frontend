<template>
  <v-app>
    <v-container class="blog">
      <div class='blogTitleContainer'>
        <img class='blogTitleContainer__curveFirstImg' src='../../assets/images/curve1.svg' alt='curve-icon'>
        <img class='blogTitleContainer__curveSecondImg' src='../../assets/images/curve2.svg' alt='curve-icon'>
        <div class='blogTitleContainer__text'>
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
.blogTitleContainer {
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  font-size: 37px;
  line-height: 45px;
  height: 160px;

&__text {
   z-index: 1;
 }

&__curveFirstImg {
   position: absolute;
   margin: auto;
   -webkit-animation: spin 4s linear infinite;
   -moz-animation: spin 4s linear infinite;
   animation: spin 4s linear infinite;
 }

&__curveSecondImg {
   position: absolute;
   margin: auto;
   -webkit-animation: spin 4s linear infinite;
   -moz-animation: spin 4s linear infinite;
   animation: spin 4s linear infinite;
 }
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
