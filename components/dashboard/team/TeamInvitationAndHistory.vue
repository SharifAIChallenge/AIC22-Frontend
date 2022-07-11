<template>
  <div>
    <SectionHeader title="دعوتنامه های من" icon="mdi-script-outline"/>
    <SectionContainer>
      <div v-if="pendingList && pendingList.length > 0">
        <div v-for="(list, index) in pendingList" :key="index">
          <v-col cols="3">
            <MyTeamInvitations :name="list.user.profile.firstname_fa + ' ' +list.user.profile.lastname_fa"
                               :status="list.status"
                               text="اطلاعات فرد"
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
          <div v-if="invitationsList.data && invitationsList.data.length !== 0">
            <div class="table">
              <table class="w-full">
                <thead>
                <tr class="text-right">
                  <th class="pa-6 w-50">نام کاربر</th>
                  <th>اطلاعات</th>
                  <th class="p-6 text-center">وضعیت عضویت</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in invitationsList.data" :key="index">
                  <td>
                    {{ item.user.profile.firstname_fa }} {{ item.user.profile.lastname_fa }}
                  </td>
                  <td class="pa-0">
                    <v-btn
                        class="pa-0"
                        @click.stop="()=>{dialog_item = item;dialog = true;}"
                        text plain
                    >
                      <v-icon
                      >mdi-account-box-outline
                      </v-icon>
                    </v-btn>

                  </td>
                  <td class="text-center">
                    <v-chip
                        color="success"
                        v-if="item.status === 'accepted'"
                    >
                      <v-icon class="ml-2">mdi-check</v-icon>
                      تایید شده
                    </v-chip>
                    <v-chip
                        color="primary"
                        v-else-if="item.status === 'pending'"
                    >
                      <v-icon class="ml-2">mdi-clock-time-four-outline</v-icon>
                      در انتظار تایید
                    </v-chip>
                    <v-chip
                        color="secondary"
                        v-else
                    >
                      <v-icon class="ml-2">mdi-close</v-icon>
                      رد شده
                    </v-chip>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <v-dialog
          v-model="dialog"
          max-width="290"

      >
        <v-card
            rounded
            class="modal-shadow"
            color="bg_secondary">
          <v-card-text
              class="modal modal-shadow"
          >
            <div class="profile-picture">
              <img
                  v-if="dialog_item && dialog_item.user.profile.image_url"
                  :src="dialog_item.user.profile.image_url"
                  class="rounded-circle"
              />
              <img
                  v-else
                  class="rounded-circle"
                  src="~/assets/images/avatar-sample.svg" alt="">
            </div>
            <div class="text-center">
              <p v-if="dialog_item">
                {{ dialog_item.user.profile.firstname_fa }} {{ dialog_item.user.profile.lastname_fa }}
              </p>
              <div
              v-if="dialog_item && dialog_item.user.profile.programming_languages && dialog_item.user.profile.programming_languages.length > 0"
              >
                <v-chip
                    v-for="(lang,index) in dialog_item.user.profile.programming_languages" :key="index"
                >
                  {{ lang }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
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
      dialog_item: null,
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
      this.$axios.$put(`team/invitations/team_pending/${id}`, {
        status: 'accepted',
      }).then(res => {
        this.$toast.success('با موفقیت انجام شد!');
      }).catch(() => {
        this.$toast.error('مشکلی رخ داده است!');
      });
      this.$axios.$get('team/invitations/team_pending').then(res => {
        this.pendingList = res;
      }).catch(() => {
        this.$toast.error('خطا در برقراری ارتباط!');
      });
      this.loadingBtn = false;
    },
    rejectRequest(id) {
      this.loadingBtn = true;
      this.$axios.$put(`team/invitations/team_pending/${id}`, {
        status: 'rejected',
      }).then(res => {
        this.$toast.success('با موفقیت انجام شد!');
      }).catch(() => {
        this.$toast.error('مشکلی رخ داده است!');
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

<style scoped lang="scss">
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

.profile-picture {
  position: relative !important;
  display: flex;
  top: -5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .upload-avatar {
    width: 12rem;
  }

  img {
    width: 10rem;
    height: 10rem;

    border: 0.5rem solid #13202E;
  }
}

.modal-shadow, .v-dialog.v-dialog--active, .modal {
  border-radius: 10px !important;
}
</style>
