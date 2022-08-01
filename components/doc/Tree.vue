<template>
  <div>
    <!-- <v-container> -->
      <div class="flex items align-center justify-space-between">
        <p class="headline py-5 ma-0 mr-3">
          مستندات
        </p>
        <div class="w-full mr-5 overflow-x-auto d-none d-md-block">
          <v-chip
              v-for="(item, index) in items"
              class="mr-3"
              :key="index"
              :color="item.id === current_path ? 'primary' : 'bg_secondary'"
              @click="active(item.id)"
          >
            {{ item.name }}
          </v-chip>
        </div>
        <div class="d-block d-md-none">
          <v-select
              :items="items.map(item => {return {text:item.name,value:item.id}})"
              label="بخش"
              @change="(val)=> active(val)"
              :value="current_path"
          ></v-select>
        </div>
      </div>


    <!-- </v-container> -->
    <v-divider/>
    <!--    <v-row class="ma-0">-->
    <!--      <v-col cols="12" md="3" lg="2" xl="2" class="tree bg-color pl-0 pa-0 sidenav-doc">-->

    <!--        <v-navigation-drawer v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" floating app right  class="pt-6 bg-color">-->
    <!--          <v-treeview-->
    <!--            :items="items"-->
    <!--            :loading="loading"-->
    <!--            open-on-click-->
    <!--            activatable-->
    <!--            dense-->
    <!--            :transition="true"-->
    <!--            @update:open="open($event)"-->
    <!--            :open="openIds"-->
    <!--            @update:active="active($event)"-->
    <!--            :active="activeIds"-->
    <!--            class="mt-8 treeview"-->
    <!--          >-->
    <!--            <template v-slot:prepend="{ item, open }">-->
    <!--              &lt;!&ndash; <v-icon v-if="!item.file">-->
    <!--                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}-->
    <!--              </v-icon>-->
    <!--              <v-icon v-else>-->
    <!--                mdi-file-->
    <!--              </v-icon> &ndash;&gt;-->
    <!--            </template>-->
    <!--          </v-treeview>-->
    <!--        </v-navigation-drawer>-->
    <!--      </v-col>-->
    <div class="d-flex justify-content-center" style="max-width:80%">
       <div class="notice-box mt-5" style="max-width:fit-content;">
    بنا بر مشکلات فیلترینگ برای مشاهده داک بازی لطفا از فیلترشکن استفاده کنید و یا به این<span><a href="https://github.com/SharifAIChallenge/AIC22-Doc" target="__blank"> لینک </a></span>مراجعه کنید.
      </div>
    </div>
   
    <v-row class="mb-10">
      <v-col cols="12" md="7" lg="8" class="docWraper">
        <markdown-renderer :content="content"/>
      </v-col>
    </v-row>

    <!--    </v-row>-->
    <loading :active.sync="loading" color="#eb3654" background-color="black" :is-full-page="true"></loading>
  </div>
</template>

<script>
const fm = require('front-matter');
import {parseGithubData, findActiveNode, findOpenIds, findActiveIds} from './parseGithubData';
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
      current_path: '',
      repo_name: 'AIC22-Doc',
      user_name: 'SharifAIChallenge',
      drawer: null,
    };
  },
  components: {MarkdownRenderer, Header, Loading},
  async fetch() {
    let slug = this.$route.params.slug;

    await fetch('https://api.github.com/repos/SharifAIChallenge/AIC22-Doc/git/trees/main?recursive=1').then(res => res.json())
        .then(res => {
          this.items = parseGithubData(res);
          let activeNode = findActiveNode(res, slug);
          this.openIds = findOpenIds(activeNode);
          this.activeIds = findActiveIds(activeNode);
          const url = `https://raw.githubusercontent.com/${this.user_name}/${this.repo_name}/main/${activeNode.path}`;
          this.current_path = activeNode.path;
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
    active(item) {

      try {
        this.$router.push(`${item}`);
        this.loading = true;
        const url = `https://raw.githubusercontent.com/${this.user_name}/${this.repo_name}/main/${item}`;
        fetch(url)
            .then(res => res.text())
            .then(res => {
              // console.log(res);
              this.metaData = fm(res);
              this.content = '${toc} \n' + this.metaData.body;
              this.loading = false;
              this.current_path = item;
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

.bg-color {
  background: #13202e;
}

.docWraper {
  background-color: #172434;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 2rem;
  margin-top: 2rem;
  margin-right: 4.5%;
}

@media screen and (max-width: 1263px) {
  .docWraper {
    margin-right: 8%;
  }


}

@media screen and (max-width: 960px) {
  .docWraper {
    margin-right: 0%;;
  }


}

.theme--dark.v-navigation-drawer {
  background: #13202e;
}

.markdown img {
  width: 100% !important;
}

.items {
  display: flex;
}

</style>
