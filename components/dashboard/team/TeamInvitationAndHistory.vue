<template>
  <div>
    <SectionHeader title="دعوتنامه های من" icon="mdi-script-outline"/>
    <SectionContainer>
      <div v-if="pendingList.data && pendingList.data.length > 0">
        <div v-for="(list, index) in pendingList.data" :key="index">
          <v-col cols="3">
            <MyTeamInvitations :name="list.user.first_name + ' ' +list.user.last_name"
                               :status="list.status"
                               :accept="()=>acceptRequest(list.id)" :reject="()=>rejectRequest(list.id)"/>
          </v-col>
        </div>
      </div>
      <div v-else class="text-center">
        داده ای برای نمایش وجود ندارد
      </div>
      <div>
        <div class="pt-14">
          <h1 class="pb-4">
            <v-icon color="primary" size="40px" class="pl-4 pr-2">mdi-script-text-outline</v-icon>
            تاریخچه دعوت ها
          </h1>
          <v-alert dark icon="mdi-information" dense class="pt-4 pb-4">
            در این قسمت وضعیت دعوتنامه‌هایی را که از طرف تیمتان به افراد فرستاده‌اید مشاهده می کنید!
          </v-alert>
        </div>
        <div class="pr-10 history-List">
          <div v-for="(list, index) in invitationsList.data" :key="index" class="pb-4">
            <h3>
              <div class="history">
                <div>{{ list.user.profile.firstname_fa }} {{ list.user.profile.lastname_fa }}</div>
                <div
                    :class="{
                    blueFont: list.status === 'pending',
                    orangeFont: list.status === 'rejected',
                    greenFont: list.status === 'accepted',
                  }"
                >
                  <v-icon
                      v-bind:class="{
                      blueFont: list.status === 'pending',
                      orangeFont: list.status === 'rejected',
                      greenFont: list.status === 'accepted',
                    }"
                  >
                    {{ statusIcon(list.status) }}
                  </v-icon>
                  {{ statusMessage(list.status) }}
                </div>
              </div>
            </h3>
          </div>
        </div>
      </div>

      <v-dialog v-model="dialog" width="350">
        <v-btn
            class='ma-3'
            icon
            large
            @click="dialog = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <UserProfileForTeam :userData="currentUser"/>
      </v-dialog>
    </SectionContainer>
  </div>
</template>

<script>
import UserProfileForTeam from './UserProfileForTeam';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import MyTeamInvitations from "~/components/dashboard/team/MyTeamInvitations";

export default {
  components: {MyTeamInvitations, UserProfileForTeam, SectionHeader, SectionContainer},
  async fetch() {
    await this.$axios.$get('team/invitations/team_sent').then(res => {
      this.invitationsList = res;
    }).catch(() => {
      this.$toast.error('خطا در برقراری ارتباط!');
    });
    await this.$axios.$get('team/invitations/team_pending').then(res => {
      this.pendingList = res;
    }).catch(() => {
      this.$toast.error('خطا در برقراری ارتباط!');
    });
    ;
  },
  data() {
    return {
      dialog: false,
      loadingBtn: false,
      invitationsList: {},
      pendingList: {},
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
    };
  },
  methods: {
    statusIcon(status) {
      if (status === 'pending') return 'mdi-progress-question';
      else if (status === 'accepted') return 'mdi-progress-check';
      else if (status === 'rejected') return 'mdi-progress-close';
    },
    statusColor(status) {
      if (status === 'pending') return 'blue';
      else if (status === 'accepted') return 'green';
      else if (status === 'rejected') return 'orange';
    },
    statusMessage(status) {
      if (status === 'pending') return 'در انتظار پاسخ';
      else if (status === 'accepted') return 'قبول کرد';
      else if (status === 'rejected') return 'رد کرد';
    },
    translateResponseMessage(response) {
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
    setCurrentUser(profile, email, id, show) {
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.dialog = true;
    },
    acceptRequest(id) {
      this.loadingBtn = true;
      this.$axios.$put(`team/invitations/team_pending/${id}?answer=1`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      // this.$axios.$get('team/invitations/team_sent').then(res => {
      //   if (res.status_code === 200) {
      //     this.invitationsList = res;
      //   } else {
      //     this.$toast.error('خطا در برقراری ارتباط!');
      //   }
      // });
      this.$axios.$get('team/invitations/team_pending').then(res => {
        if (res.status_code === 200) {
          this.pendingList = res;
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.loadingBtn = false;
    },
    rejectRequest(id) {
      this.loadingBtn = true;
      this.$axios.$put(`team/invitations/team_pending/${id}?answer=0`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      // this.$axios.$get('team/invitations/team_sent').then(res => {
      //   if (res.status_code === 200) {
      //     this.invitationsList = res;
      //   } else {
      //     this.$toast.error('خطا در برقراری ارتباط!');
      //   }
      // });
      this.$axios.$get('team/invitations/team_pending').then(res => {
        if (res.status_code === 200) {
          this.pendingList = res;
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.loadingBtn = false;
    },
  },
};
</script>

<style scoped>
.email-field {
  width: 50%;
}

.profile {
  display: flex;
  align-items: center;
}

.blueFont {
  color: rgb(41, 37, 255);
}

.orangeFont {
  color: orange;
}

.greenFont {
  color: green;
}

.history {
  display: flex;
  justify-content: space-between;
}
</style>
