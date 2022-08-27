<template>
  <div>
    <v-container class="pa-0 d-flex align-center justify-space-between">
      <p class="headline py-5 ma-0">
        تیم
      </p>
      <div>
        <client-only>
          <div class="d-flex">
            <v-tabs v-model="tabs" icons-and-text grow color="primary">
              <div v-for="(item, key) in haveTeam ? teamHeader : userHeader" :key="key" class="d-flex flex-column">
                <v-tab>
                    <span class="text--white">
                      {{ item.title }}
                    </span>
                  <v-icon size="24" style="color: white">{{ tabs === key ? item.icon : `${item.icon}-outline` }}</v-icon>
                </v-tab>
              </div>
            </v-tabs>
          </div>
        </client-only>
      </div>
    </v-container>
    <div>
      <v-divider />
      <div class="pa-0">
        <v-tabs-items touchless v-model="tabs">
          <v-tab-item>
            <div v-if="tabs === 0" class="main-content">
              <MyTeam :toggleHaveTeam="toggleHaveTeam" v-if="haveTeam" />
              <CreateTeam :toggleHaveTeam="toggleHaveTeam" v-else />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div v-if="tabs === 1" class="main-content pa-0">
              <SearchUsersAndSendInvitation v-if="haveTeam" />
              <IncompleteTeams v-else />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div v-if="tabs === 2" class="main-content">
              <TeamInvitationAndHistory v-if="haveTeam" />
              <UserInvitation :toggleHaveTeam="toggleHaveTeam" v-else />
            </div>
          </v-tab-item>
          <v-tab-item v-if="isFinalist">
            <div v-if="tabs === 3" class="main-content">
              <Payment></Payment>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </div>

</template>

<script>
import CreateTeam from "~/components/dashboard/team/CreateTeam";
import UserInvitation from "~/components/dashboard/team/UserInvitation";
import IncompleteTeams from "~/components/dashboard/team/IncompleteTeams";
import MyTeam from "~/components/dashboard/team/MyTeam";
import TeamInvitationAndHistory from "~/components/dashboard/team/TeamInvitationAndHistory";
import SearchUsersAndSendInvitation from "~/components/dashboard/team/SearchUsersAndSendInvitation";
import Payment from "~/components/dashboard/team/Payment";

export default {
  layout: "dashboard",
  components: {
    Payment,
    CreateTeam,
    UserInvitation,
    IncompleteTeams,
    MyTeam,
    SearchUsersAndSendInvitation,
    TeamInvitationAndHistory
  },
  data() {
    return {
      haveTeam: false,
      isFinalist : false,
      tabs: null,
      teamHeader: [
        {
          title: "تیم من",
          icon: "mdi-account-multiple-plus"
        },
        {
          title: "جستجو و دعوت افراد",
          icon: "mdi-account-search"
        },
        {
          title: "دعوت‌نامه‌های تیم‌ من",
          icon: "mdi-account-plus"
        },{
          title: "پرداخت مرحله دوم",
          icon: "mdi-credit-card"
        }
      ],
      userHeader: [
        {
          title: "ساختن تیم",
          icon: "mdi-account-multiple-plus"
        },
        {
          title: "جستجو تیم‌ها",
          icon: "mdi-badge-account-horizontal"
        },
        {
          title: "دعوتنامه‌های من",
          icon: "mdi-script-text"
        }
      ]
    };
  },

  async asyncData({ $axios, redirect }) {
    // redirect('/dashboard');
    let haveTeam = false;
    let isFinalist = false;

    try{
      let res = await $axios.$get("team");
      isFinalist = res.is_finalist
      haveTeam = true
    }catch (e) {
      haveTeam = false
    }

    return { haveTeam, isFinalist };
  },
  methods: {
    toggleHaveTeam() {
      this.haveTeam = !this.haveTeam;
      this.getData();
    },
    async getData() {
      let res = await this.$axios.$get("team");
      this.haveTeam = res.status_code !== 403;
    }
  }
};
</script>

<style lang="scss">
@import 'assets/variables.scss';
@import 'assets/mixins.scss';
.v-tab.v-tab--active {
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}

.theme--dark.v-tabs-items {
  background-color: transparent !important;
}

.text--white {
  color: #ffffff;
}
.dashboard table {
  th,
  td {
    &:nth-of-type(1) {
      padding-right: 48px !important;
      @include v-not-md {
        padding-right: 24px !important;
      }
    }

    &:nth-last-of-type(1) {
      padding-left: 48px !important;
      text-align: left;
      @include v-not-md {
        padding-left: 24px !important;
      }
    }

    @include v-not-sm {
      padding-right: 24px !important;
      padding-left: 24px !important;
    }
  }

  th .v-icon {
    display: none;
  }

  td .mdi-plus-circle {
    margin-left: 0 !important;
  }
}

.team {
  @include v-not-md {
    flex-wrap: wrap;
    flex-flow: column-reverse;
    > div {
      width: 100vw;
    }
  }

  .v-tab--active {
    background-color: var(--v-secondary-base) !important;
    color: white !important;
  }

  .v-tab {
    width: 150px;
    height: 150px;
    background: map-get($material-dark-elevation-colors, '16');
    color: white !important;
  }

  hr {
    display: none;
  }

  .v-tabs-slider-wrapper {
    display: none;
  }

  .main-content {
    min-height: 100vh;
    background-color: map-get($material-dark-elevation-colors, '12');
  }

  .wrapper {
    display: flex;
    justify-content: center;
    @include v-not-md {
      display: block;
    }

    .tabsW {
      min-height: 100vh;
      position: fixed;
      // width: calc(50% - 136px);

      @include v-not-md {
        position: relative;
        width: auto;
        min-height: 150px;
      }
    }
  }

  .tabsWraper .v-item-group {
    min-height: 100vh;
    @include v-not-md {
      min-height: 150px;
    }

    .v-slide-group__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include v-not-md {
        flex-direction: row;
        > div {
          margin: 0 !important;
          width: 33.3333%;

          > div {
            width: 100% !important;
          }
        }
      }
    }
  }

  input {
    text-align: right;
  }
}

.v-slide-group__prev {
  display: none !important;
}
</style>
