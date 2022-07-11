<template>
  <div>
    <SectionHeader title="دعوت نامه های من" icon="mdi-script-text-outline"/>
    <SectionContainer>
      <div class="mb-10" v-if="pending && pending.length > 0">
        <v-row>
          <v-col class="col-3" v-for="(list, index) in pending" :key="index">
            <MyTeamInvitations :name="list.team.name"
                               :status="list.status"
                               text="اطلاعات تیم"
                               :textClick="()=>{dialog_item=list;dialog=true;}"
                               :accept="()=>acceptRequest(list.id)" :reject="()=>rejectRequest(list.id)"/>
          </v-col>
        </v-row>
      </div>
      <div v-else class="text-center">
        داده ای برای نمایش وجود ندارد
      </div>

      <div class="mb-8 notice-box text-center text-caption w-50">
        ایجا لیست دعوتنامه هایی را که از تیم ها برای عضویت در آن ها دریافت کرده اید، می بینید.
      </div>
      <div v-if="reqHistory && reqHistory.length === 0" class="mb-10">
        لیست دعوتنامه های شما خالی است
      </div>
      <div v-if="reqHistory && reqHistory.length !== 0">
        <div class="table">
          <table class="w-full">
            <thead>
            <tr class="text-right">
              <th class="pa-6 w-50">نام تیم</th>
              <th>اطلاعات</th>
              <th class="p-6 text-center">وضعیت عضویت</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="reqHistory && reqHistory.length > 0" v-for="(item,index) in reqHistory" :key="index">
              <td>
                {{ item.team.name }}
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
    </SectionContainer>
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
                v-if="dialog_item && dialog_item.team.image"
                :src="dialog_item.team.image"
                class="rounded-circle"
            />
            <img
                v-else
                class="rounded-circle"
                src="~/assets/images/avatar-sample.svg" alt="">
          </div>
          <div class="text-center" style="margin-top: -4rem;">
            <p v-if="dialog_item">
              {{ dialog_item.team.name }}
            </p>
          </div>
          <div v-if="dialog_item && dialog_item.team && dialog_item.team.members" class="members">
            <div v-for="(member,index) in dialog_item.team.members" :key="index">
              <p class="ma-0">
                {{ member.profile.firstname_fa }} {{ member.profile.lastname_fa }}
              </p>
            </div>
          </div>

        </v-card-text>
<!--        <v-card-actions>-->
<!--          <v-btn-->
<!--              @click-->
<!--          >-->
<!--            عضویت-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import MyTeamInvitations from "~/components/dashboard/team/MyTeamInvitations";

export default {
  components: {MyTeamInvitations, SectionHeader, SectionContainer},
  props: ['toggleHaveTeam'],

  async fetch() {
    let res1 = await this.$axios.$get('team/invitations/user_pending');
    let res2 = await this.$axios.$get('team/invitations/user_sent');
    this.pending = res1;
    this.reqHistory = res2.data;
  },
  data() {
    return {
      loading: false,
      dialog: false,
      dialog_item: null,
      pending: [],
      reqHistory: [],
    };
  },
  methods: {
    acceptRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}`, {
        status: 'accepted',
      }).then(res => {
        this.$toast.success('دعوت با موفقیت پذیرفته شد.');
        this.toggleHaveTeam();
      }).catch(() => {
        this.$toast.error('مشکلی در قبول درخواست رخ داد لطفا دوباره امتحان کنید.');
      });
      this.loading = false;
    },
    rejectRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}`, {
        status: 'rejected',
      }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('دعوت با موفقیت رد شد.');
          this.toggleHaveTeam();
        } else {
          this.$toast.error('مشکلی در رد کردن درخواست رخ داد لطفا دوباره امتحان کنید.');
        }
      });
      this.loading = false;
    },
    requestStatusIcon(status) {
      if (status === 'pending') return 'mdi-progress-question';
      else if (status === 'accepted') return 'mdi-progress-check';
      else if (status === 'rejected') return 'mdi-progress-close';
    },
    iconColor(status) {
      if (status === 'pending') return 'blue';
      else if (status === 'accepted') return 'green';
      else if (status === 'rejected') return 'orange';
    },
    statusMessage(status) {
      if (status === 'pending') return 'در انتظار پاسخ';
      else if (status === 'accepted') return 'قبول کرد';
      else if (status === 'rejected') return 'رد کرد';
    },
  },
};
</script>
<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
}

.teamImg {
  max-width: 100%;
}

.reqInfoAndButtons {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

.w-50 {
  width: 50%;
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

.members{
  border-top: 1px solid #13202E;
}

.members > div{
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #13202E;
}

</style>
