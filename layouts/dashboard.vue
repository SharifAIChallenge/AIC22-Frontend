<template>
  <v-app class="dashboardMenu">
    <v-app-bar app clipped-right :hide-on-scroll="mobile" style="left: unset; overflow: hidden" height="90"
               class="dashbordNav"
               elevation="0"
    >
      <v-app-bar-nav-icon class="ms-1 hidden-md-and-up pa-0" @click.stop="drawer = !drawer"/>
      <div class="text-center w-full">
        <nuxt-link to="/" class="white--text text-center py-5" style="width: 100%; height: 100%">
          <img src="../assets/images/logo/dashboard-icon.svg" alt="" height="70px" width="70px" class=" mt-2"/>
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" floating app right clipped
                         class="pt-6" color="bg">
      <v-list class="py-5 menu" style="background-color: transparent !important; ">
        <template v-for="item in routes">
          <v-list-item
              :key="item.title"
              class="py-md-4 py-lg-5 py-xl-6 pr-9 menu-item"
              active-class="font-weight-bold"
              @click="activeLink = item.title"
              style="min-height:36px;height:36px;font-weight:bold"
              :disabled="!profile"
              :to="item.link"
              exact
              nuxt
          >
            <span class="primary right-span" style="width: 6px; height: 100%; position: absolute; right: 0"
                  v-show="activeLink == item.title"></span>
            <v-list-item-icon class="py-1 my-0" style="transform: translateY(-17px)"
            >
              <v-icon v-if="activeLink != item.title">{{ item.icon }}</v-icon>
              <v-icon v-else color="primary">{{ item.hover }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="mr-6">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`"/>
        </template>
        <v-divider class="mt-2"></v-divider>
        <template v-for="item in middleRoute ">
          <v-list-item
              :key="item.title"
              class="py-md-4 py-lg-5 py-xl-6 pr-9 menu-item"
              active-class="font-weight-bold"
              @click="activeLink = item.title"
              style="min-height:36px;height:36px;font-weight:bold"
              :disabled="!profile"
              :to="item.link"
              exact
              nuxt
          >
            <span class="primary right-span" style="width: 6px; height: 100%; position: absolute; right: 0"
                  v-show="activeLink == item.title"></span>
            <v-list-item-icon class="py-1 my-0" style="transform: translateY(-17px)"
            >
              <v-icon v-if="activeLink != item.title">{{ item.icon }}</v-icon>
              <v-icon v-else color="primary">{{ item.hover }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div style="display: flex;justify-content: space-around; align-items: center">
                <v-list-item-title class="mr-6">{{ item.title }}</v-list-item-title>
                <div v-if="item.numberShow" class="pa-1 primary" style="border-radius: 5px; font-weight: normal; font-size: 0.8rem  ">{{ updateDataWithApi(item.api) }}</div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`"/>
        </template>
        <div class="mt-auto" style="position: absolute; left: 0; width: 100%; bottom: 0">
          <v-list class="pa-2" style="background-color: transparent !important;">
            <v-list-item @click="logout" style="cursor: pointer" class="ma-2">
              <v-icon>{{ bottomRoute.logout.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title class="mr-6">خروج</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding: 0px">
      <v-container class="dashboard pl-0 pt-md-0 pb-0" fluid>
        <nuxt/>
      </v-container>
    </v-main>
    <PaymentDialog :dialog="payDialog" @close="payDialog = false"/>
  </v-app>
</template>

<script>
import PaymentDialog from "~/components/dashboard/PaymentDialog";
import {mapState} from "vuex";

export default {
  components: {PaymentDialog},
  data() {
    return {
      drawer: null,
      activeLink: "خانه",
      payDialog: false,
      routes: {
        home: {
          title: "خانه",
          icon: "mdi-home-variant-outline",
          hover: "mdi-home-variant",
          link: "/dashboard",
          disabled: false,
          gard: false
        },
        // terms: {
        //   title: "مستندات",
        //   icon: "mdi-file-document-outline",
        //   hover: "mdi-file-document",
        //   link: "/dashboard/doc/Game-Doc",
        //   disabled: true,
        //   gard: true
        // },
        // doc: {
        //   title: "منابع",
        //   icon: "mdi-source-fork",
        //   hover: "mdi-source-repository",
        //   link: "/dashboard/terms",
        //   disabled: true,
        //   gard: true
        // },
        // tournaments: {
        //   title: "تورنومنت ها",
        //   icon: "mdi-tournament",
        //   hover: "mdi-tournament",
        //   link: "/dashboard/tournaments",
        //   disabled: true,
        //   gard: true
        // },
        // scoreboard: {
        //   title: "جدول امتیازات",
        //   icon: "mdi-scoreboard-outline",
        //   hover: "mdi-scoreboard",
        //   link: "/dashboard/scoreboard",
        //   disabled: true,
        //   gard: true
        // },
        team: {
          title: "تیم",
          icon: "mdi-account-group-outline",
          hover: "mdi-account-group",
          link: "/dashboard/team",
          disabled: true,
          gard: true
        },
        // submissions: {
        //   title: "ارسال کد",
        //   icon: "mdi-code-braces",
        //   hover: "mdi-code-braces-box",
        //   link: "/dashboard/submissions",
        //   disabled: true,
        //   gard: true
        // },
        // games: {
        //   title: "بازی ها",
        //   icon: "mdi-sword",
        //   hover: "mdi-sword-cross",
        //   link: "/dashboard/games",
        //   disabled: true,
        //   gard: true
        // },
        // final: {
        //   title: "فینال",
        //   icon: "mdi-trophy-award",
        //   hover: "mdi-trophy-award",
        //   link: "/final",
        //   disabled: true,
        //   gard: false
        // },
        // live: {
        //   title: "لایو",
        //   icon: "mdi-presentation-play",
        //   hover: "mdi-presentation-play",
        //   link: "/live",
        //   disabled: true,
        //   gard: false
        // }
      },
      middleRoute: {
        // ticket: {
        //   title: "تیکت",
        //   icon: "mdi-filmstrip-box-multiple",
        //   hover: "mdi-filmstrip-box-multiple",
        //   link: "/dashboard/ticket",
        //   api: '#',
        //   numberShow: true,
        //   disabled: true,
        //   gard: true
        // },
        // notification: {
        //   title: "اعلان",
        //   icon: "mdi-bell",
        //   hover: "mdi-bell",
        //   link: "/dashboard/notification",
        //   api: '#',
        //   numberShow: true,
        //   disabled: true,
        //   gard: true
        // },
        settings: {
          title: "تنظیمات",
          icon: "mdi-cog-outline",
          hover: "mdi-cog-outline",
          link: "/dashboard/settings",
          api: '#',
          numberShow: false,
          disabled: true,
          gard: true
        },
      },

      bottomRoute: {
        settings: {
          title: "تنظیمات",
          icon: "mdi-cog-outline",
          hover: "mdi-cog",
          link: "/dashboard/settings",
          disabled: false
        },
        logout: {
          icon: "mdi-logout-variant",
          link: "/"
        }
      }
    };
  },
  mounted() {
    Object.keys(this.routes).forEach(key => {
      if (this.$route.path.startsWith(this.routes[key].link))
        this.activeLink = this.routes[key].title;
    });
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    ...mapState({
      token: state => state.auth.token,
      profile: state => state.auth.user,
    }),
  },
  watch: {
    profile(now, old) {
      console.log(this.profile)
      if (now) {
        this.routes.team.disabled = !this.profile.is_complete;
        if (!this.profile.is_complete && this.$route.path !== "/dashboard/settings") {
          this.$router.push("/dashboard/settings");
          this.$toast.error("لطفا ابتدا اطلاعات شخصی را کامل کنید");
        }
        if (this.profile.has_team) {
          this.openDialog();
        }
        // else {
        //   this.routes.games.disabled = true;
        //   // this.routes.tournaments.disabled = true;
        //   this.routes.submissions.disabled = true;
        // }
        // if (this.profile.is_finalist) {
        //   this.routes.team.disabled = false;
        //   this.routes.games.disabled = false;
        // }
        // if (this.$route.path === "/dashboard/team" && !this.profile.is_finalist) {
        //   this.$router.push("/dashboard");
        // }
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    updateDataWithApi(api) {
      if (api === '#') {
        return Math.floor(Math.random() * 10);
      }

      let number

      this.$axios.get(api)
          .then(resp => number = resp.data).catch(err => console.log(err))

      if (!!number) {
        return number;
      } else {
        Math.floor(Math.random() * 10);
      }
    },
    openDialog() {
      if (!localStorage.getItem("isSawDialog")) {
        this.payDialog = true;
      }
    }
  },
  beforeMount() {
    // let data = this.routes.find(item => item.link === this.$route.path);
    // this.$axios.setToken(this.token, 'token');
    this.$store.dispatch('auth/getUser');
  }
};
</script>

<style lang="scss">
@import '~/assets/mixins.scss';

#__nuxt {
  overflow: hidden;
}

.menu {
  background-color: transparent !important;;
}

.menu-item:hover {
  background-color: rgba(148, 144, 144, 0.4);

}

.dashboardMenu {
  .v-navigation-drawer {
    width: 265px !important;
    border-left: 2px solid #1f2f42 !important;

  }
}

.v-list-item--link::before {
  background-color: transparent !important;
}

.v-list-item--active {
  .right-span {
    -webkit-box-shadow: -1px 0px 25px 5px #0071e3;
    box-shadow: -1px 0px 25px 5px #0071e3;
  }
}

.dashbordNav {
  width: 265px;
  border-left: 2px solid #1f2f42 !important;
  @include v-not-md {
    width: 100%;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-40%) scale(4);
    }
  }
}

.dashboard {
  padding-top: 90px !important;
  padding-right: 0;
  @include v-md {
    padding-right: 265px !important;
  }
}

.v-app-bar__nav-icon {
  position: relative;
  z-index: 2000;
}

.head {
  border-bottom: 2px solid #1f2f42 !important;

}

@media screen and (max-width: 960px) {
  .dashbordNav .v-toolbar__content {
    display: flex;
  }
}
</style>
