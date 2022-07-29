<template>
  <div>
    <v-container class="pa-0 d-flex align-center justify-space-between">
      <p class="headline py-5 ma-0">
        ارسال کد
      </p>
      <!--      <SectionHeader :title="`ارسال کد`" />-->
      <div>
        <client-only>
          <div class="d-flex">
            <v-tabs v-model="tabs" icons-and-text grow color="primary">
              <div v-for="(item, key) in sendCodeHeader" :key="key" class="d-flex flex-column">
                <v-tab>
                    <span class="text--white">
                      {{ item.title }}
                    </span>
                  <v-icon size="24" style="color: white">{{
                      tabs === key ? item.icon : `${item.icon}-outline`
                    }}
                  </v-icon>
                </v-tab>
              </div>
            </v-tabs>
          </div>
        </client-only>
      </div>
    </v-container>
    <!--  </div>-->
    <!--  <div>-->
    <v-divider/>
    <v-container class="pa-0 d-flex align-center justify-space-between">

      <!--    <div class="d-flex align-center justify-space-between ma-5">-->
      <!--      <SectionHeader :title="`تاریخچه ارسال ها`" :icon="`mdi-history`"/>-->
      <div class="headline py-5 ma-0">
        <v-icon color="">"mdi-history"</v-icon>
        <div v-if="tabs === 1">
          تاریخچه ارسال ها
        </div>
        <div v-else>
          ارسال کد
        </div>
      </div>
<!--      <v-chip-group style="display: flex" v-model="mode" column active-class="primary&#45;&#45;text primary">-->
<!--        <v-chip filter outlined>اصلی</v-chip>-->
<!--        <v-chip filter outlined>مینی‌گیم</v-chip>-->
<!--      </v-chip-group>-->
    </v-container>
    <div class="pa-0">
      <v-tabs-items touchless v-model="tabs">
        <v-tab-item>
          <div v-if="tabs === 0" class="main-content">
            <v-col cols="12"  class="pl-0 ">
              <v-card flat class="transparent">
                <SectionContainer>
                  <v-alert class=" px-1" type="info" outlined icon="mdi-information-outline">
                    <p v-if="canSubmitAnotherCode">
                      محدودیت زمانی بین هر ارسال:‌ ۵ دقیقه
                    </p>
                    <p v-else>
              <span>
                زمان گذشته از آخرین ارسال:
              </span>
                      <span>
                {{ Math.floor(remainTime) }}
                دقیقه
              </span>
                    </p>
                  </v-alert>
                  <code-submission class="mt-10" @codeSub="this.$fetch" :canSubmitAnotherCode="canSubmitAnotherCode"/>
                </SectionContainer>
              </v-card>
            </v-col>
            <!--            <MyTeam :toggleHaveTeam="toggleHaveTeam" v-if="haveTeam"/>-->
            <!--            <CreateTeam :toggleHaveTeam="toggleHaveTeam" v-else/>-->
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="tabs === 1" class="main-content pa-0">
            <v-container  class="pa-0 d-flex align-center justify-space-between">

              <submissions-list class="py-6 py-md-12" :submissions="submissions/*.filter(s => mode == s.is_mini_game)*/"/>
            </v-container>
            <!--            <SearchUsersAndSendInvitation v-if="haveTeam"/>-->
            <!--            <IncompleteTeams v-else/>-->
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>

    <!--  </div>-->

<!--    <v-row>-->

<!--      <v-col cols="12" md="8" class="pr-md-0 pr-6 pl-5">-->
<!--        <v-card flat class="transparent">-->
<!--          <SectionHeader :title="`تاریخچه ارسال ها`" :icon="`mdi-history`"/>-->
<!--          &lt;!&ndash; <SectionContainer> &ndash;&gt;-->
<!--          <v-chip-group style="display: flex" v-model="mode" column active-class="secondary&#45;&#45;text secondary">-->
<!--            <v-chip filter outlined>اصلی</v-chip>-->
<!--            <v-chip filter outlined>مینی‌گیم</v-chip>-->
<!--          </v-chip-group>-->
<!--          <submissions-list class="py-6 py-md-12" :submissions="submissions.filter(s => mode == s.is_mini_game)"/>-->

<!--          &lt;!&ndash; </SectionContainer> &ndash;&gt;-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>

</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import CodeSubmission from '../../components/dashboard/submission/CodeSubmission';
import SubmissionsList from '../../components/dashboard/submission/SubmissionsList';
import CreateTeam from "~/components/dashboard/team/CreateTeam";
import UserInvitation from "~/components/dashboard/team/UserInvitation";
import IncompleteTeams from "~/components/dashboard/team/IncompleteTeams";
import MyTeam from "~/components/dashboard/team/MyTeam";
import SearchUsersAndSendInvitation from "~/components/dashboard/team/SearchUsersAndSendInvitation";
import TeamInvitationAndHistory from "~/components/dashboard/team/TeamInvitationAndHistory";

export default {
  components: {
    CodeSubmission,
    SubmissionsList,
    SectionHeader,
    SectionContainer,
    CreateTeam,
    UserInvitation,
    IncompleteTeams,
    MyTeam,
    SearchUsersAndSendInvitation,
    TeamInvitationAndHistory
  },
  layout: 'dashboard',
  transition: 'fade-transition',

  // async fetch() {
  //   let data = await this.$axios.$get(`/team/submission`);
  //   this.submissions = data.submissions;
  //   this.calculateTimeInterval();
  // },
  data() {
    return {
      submissions: [],
      canSubmitAnotherCode: false,
      interval: null,
      remainTime: 0,
      mode: 0,
      tabs: null,
      haveTeam: false,
      sendCodeHeader: [
        {
          title: "ارسال کد",
          icon: "mdi-send"
        },
        {
          title: "تاریخچه ارسال‌ها",
          icon: "mdi-history"
        },
      ],
    };

  },
  methods: {
    async getData() {
      let data = await this.$axios.$get(`/challenge/submissions`);
      data.map(x =>{
        if (x.language === "python 3"){
          x.language = 'py3'
        }
      });
      this.submissions = data
    },
    calculateTimeInterval() {
      if (!this.submissions.length) this.canSubmitAnotherCode = true;
      else {
        const lastSubmitTime = new Date(this.submissions[this.submissions.length - 1].submit_time);
        const interval = new Date() - lastSubmitTime;
        this.remainTime = interval / (60 * 1000);
        this.canSubmitAnotherCode = this.remainTime > 5;
      }
    },
  },
  mounted() {
    this.interval = setInterval(this.calculateTimeInterval, 1000 * 60);
    this.tabs = this.getData()
  },
  destroyed() {
    clearInterval(this.interval);
  },
  watch: {
    'tabs': {
      handler() {
        this.getData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';

.primary--text {
  color: white;
}

.primary {
  background-color: #0071E3;
}

</style>
