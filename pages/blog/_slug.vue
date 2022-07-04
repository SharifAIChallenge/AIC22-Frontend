<template>
  <v-container class="post-page">
    <v-card class="news-card pt-4 text-justify" style="background-color: rgba(24, 38, 54, 0.6)">
      <v-card-title class="font-weight-bold" style="border-right: 0.5rem solid rgb(0, 113, 227);border-radius: 0;margin-bottom: 1rem;">
        <div class="pr-3">{{ post.title }}</div>
      </v-card-title>
      <div class="px-10 pt-2">{{post.post_time}}</div>
<!--      <v-card-text class="px-10 py-5">{{post.body}}</v-card-text>-->
      <v-card-text>
        <markdown-renderer class=" py-5" :content="post.body"></markdown-renderer>
      </v-card-text>
      <div class="px-10 py-10 d-flex justify-end">
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
      </div>
    </v-card>
    <Blog :posts="posts" title="دیگر اخبار" number="6"/>
  </v-container>
</template>

<script>
import Buttons from '~/components/blog/Buttons';
import Post from '~/components/blog/Post';
import { getPost, getPosts } from '~/api/blog';
import Blog from '~/components/utilities/Blog'
import CallToAction from '~/components/CallToAction.vue';
import { mapState } from 'vuex';
import MarkdownRenderer from "~/components/doc/MarkdownRenderer";

export default {
  components: {
    MarkdownRenderer,
    'app-post-button': Buttons,
    'app-post': Post,
    Blog,
    CallToAction,
  },
  data() {
    return {
      posts: [],
      post: {},
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
    };
  },
  async asyncData({ $axios, params }) {
    const id = params.slug;
    let post = {}
    await getPost($axios, id).then( res =>{
      let date = res.post_time.split('T')[0]
      let today = new Date()
      let post_date = new Date(date).toLocaleDateString()
      let timeDifference = Math.abs(new Date(today.toLocaleDateString()) - new Date(post_date))
      let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
      if (daysDifference === 0){
        res.post_time = 'امروز'
      }else if (daysDifference === 1){
        res.post_time = 'دیروز'
      }else {
        res.post_time = `${daysDifference} روز قبل `
      }
      res.body.replace('&gt;','>')
      res.body.replace('&lt;','<')
      post = res
    })
    // });
    let posts =[]
    await getPosts($axios).then(res => {
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
      res.sort((a,b) => (a.importance > b.importance) ? 1 : -1)
      posts = res
    })
    posts = posts.filter(value => {
      return value.id !== id;
    });
    return { posts, post };
  },
  methods: {
    copyLink() {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$toast.success('لینک پست در کلیپ‌بورد کپی شد');
    },
    goToLogin() {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', 'login');
    },
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },
};
</script>

<style scoped>
.post-page {
  margin-top: 150px;
}
.news-card{
  border-radius: 1rem;
}
</style>
