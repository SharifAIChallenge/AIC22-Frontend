<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" md="3" lg="2" xl="2" class="tree bg-color pl-0 pa-0">

        <v-navigation-drawer v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" floating app right clipped class="pt-6 bg-color">
          <v-treeview
            :items="items"
            :loading="loading"
            open-on-click
            activatable
            dense
            :transition="true"
            @update:open="open($event)"
            :open="openIds"
            @update:active="active($event)"
            :active="activeIds"
            class="mt-8 treeview"
          >
            <template v-slot:prepend="{ item, open }">
              <!-- <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                mdi-file
              </v-icon> -->
            </template>
          </v-treeview>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="12" md="6" lg="7" class="docWraper" >
        <markdown-renderer :content="content" />
      </v-col>
    </v-row>
    <loading :active.sync="loading" color="#eb3654" background-color="black" :is-full-page="true"></loading>
  </div>
</template>

<script>

import axios from "axios";

const fm = require('front-matter');
import { parseGithubData, findActiveNode, findOpenIds, findActiveIds } from './parseGithubData';
import MarkdownRenderer from './MarkdownRenderer.vue';
import Header from './Header';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      items: [],
      openIds: [],
      activeIds: [],
      loading: false,
      metaData: {},
      content: '',
      repo_name: 'AIC22-Doc',
      user_name: 'SharifAIChallenge',
      drawer: null,
    };
  },
  components: { MarkdownRenderer, Header, Loading },
  async fetch() {
    let slug = this.$route.params.slug;
    fetch('https://api.github.com/repos/SharifAIChallenge/AIC22-Doc/git/trees/main?recursive=1').then(res => res.json())
      .then(res => {
        console.log(res);
        this.items = parseGithubData(res);
        let activeNode = findActiveNode(res, slug);
        this.openIds = findOpenIds(activeNode);
        this.activeIds = findActiveIds(activeNode);
        const url = `https://raw.githubusercontent.com/${this.user_name}/${this.repo_name}/main/${activeNode.path}`;
        return fetch(url);
      })
      .then(res => res.text())
      .then(res => {
        this.metaData = fm(res);
        this.content = '${toc} \n' + this.metaData.body;
      }).catch(err => {
        console.log(err);
      });
  },
  methods: {
    active(name) {
      console.log(name);
      try {
        const splittedPath = name[0].split('/');
        const fileName = splittedPath[splittedPath.length - 1];
        const slug = fileName.substring(0, fileName.length - 3);
        this.$router.push(`${slug}`);
        this.loading = true;
        const url = `https://raw.githubusercontent.com/${this.user_name}/${this.repo_name}/main/${name[0]}`;
        fetch(url)
          .then(res => res.text())
          .then(res => {
            console.log(res);
            this.metaData = fm(res);
            this.content = '${toc} \n' + this.metaData.body;
            this.loading = false;
          });
      } catch (e) {
        console.log('error');
      }
    },
    open(items) {
      this.openIds = items;
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

<style lang="scss">
@import 'assets/mixins.scss';
@import 'assets/variables.scss';

.tree {
  position: fixed;
  z-index: 50;

  .v-navigation-drawer {
    position: relative;
  }
  @include v-not-md {
    height: 90px;
  }
  @include v-md {
    width: auto !important;
  }
}
.docWraper {
  margin-right: 16.6666% !important;
  @include v-not-lg {
    margin-right: 25% !important;
  }
  @include v-not-md {
    margin-right: 0% !important;
    margin-top: 90px;
  }
}
.bg-color {
  background: map-get($material-dark-elevation-colors, '12') !important;
}
.docWraper{
  background-color: #172434;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 2rem;
  margin-top: 1rem;
  margin-right: 2rem;
}
</style>
