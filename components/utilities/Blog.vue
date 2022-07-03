<template>
  <div class="my-14 py-14">
    <TitleContainer :title="title"/>
    <v-container class="my-16">
      <box>
        <div class="pa-4 pa-sm-8 pa-md-14">
          <v-row>
            <v-col class="col-12 col-md-4" v-for="(post,index) in posts.slice(0,number) " :key="index">
              <Card
                  :title="post.title"
                  :description="post.preview"
                  :date="post.post_time"
                  :href="'/blog/' + post.id"
              />
            </v-col>
          </v-row>
          <div class="text-center mt-14">
            <v-btn
                color="primary"
                class="px-8"
                rounded
                to="/blog"
            >
              بیشتر...
            </v-btn>
          </div>

        </div>
      </box>
    </v-container>
  </div>
</template>

<script>
import Box from "~/components/utilities/Box";
import Card from "~/components/blog/Card";
import TitleContainer from '~/components/TitleContainer';

export default {
  name: "Blog",
  components: {TitleContainer, Card, Box},
  props:['posts','title','number'],

}
</script>

<style scoped>

</style>