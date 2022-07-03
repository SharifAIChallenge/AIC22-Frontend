<template>
  <v-app>
    <v-container class="blog">
      <TitleContainer title="اخبار"/>
      <box classes="elevation-12 mb-16">
        <div class="pa-4 pa-sm-8 pa-md-14 "
        >
          <div
            v-if="posts && posts.length > 0"
          >
<!--            <div class="mb-6 ">-->
<!--              <CardWithThumbnail-->
<!--                v-if="posts.length > 0"-->
<!--                :title="posts[0].title"-->
<!--                :description="posts[0].description"-->
<!--                :date="posts[0].post_time"-->
<!--                href="/blog/id"/>-->
<!--            </div>-->
            <v-row >

              <v-col sm="12" md="6" lg="4" xl="3" v-for="(post,index) in posts" :key="index">
                <Card
                  :title="post.title"
                  :description="post.preview"
                  :date="post.post_time"
                  :href="'/blog/' + post.id"
                />

              </v-col>

            </v-row>
          </div>
          <div v-else class="text-center">
            <p>
              خبری نیست :(
            </p>
          </div>
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
import TitleContainer from '~/components/TitleContainer';

export default {
  components: {
    TitleContainer,
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
    let posts = [];
    try{
      await $axios.$get('news').then(res => {
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
        posts = res
      })

    }catch (e) {
      // console.log(e);
    }
    return { posts };
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
