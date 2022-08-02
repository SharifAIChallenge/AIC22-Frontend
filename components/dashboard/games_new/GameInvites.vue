<template>
  <div>
    <SectionHeader title="دعوت نامه ها" icon="mdi-history"/>
    <SectionContainer>
      <div class="mb-8 mt-2 notice-box text-center text-caption w-50" style="width : 50% !important;">
        اینجا لیست دعوتنامه هایی را که از تیم ها برای بازی با آن ها دریافت کرده اید، می بینید.
      </div>
      <div v-if="this.pendingRequests.length === 0" class="mb-10">
        لیست دعوتنامه های شما خالی است
      </div>
      <v-row v-else class="mb-10">
        <v-col sm="12" md="4" lg="3" class="mb-7" v-for="(request, index) in pendingRequests" :key="index">
          <MyTeamInvitations :name="request.source_team_name"
                             :status="request.status"
                             text="اطلاعات تیم"
                             :accept="()=>acceptChallenge(request.id)" :reject="()=>declineChallenge(request.id)"/>
        </v-col>
      </v-row>
      <div class="mb-8 mt-2 notice-box text-center text-caption w-50" style="width : 50% !important;">
        اینجا لیست دعوتنامه هایی را که برای بازی با سایر تیم ها ارسال کرده اید میبینید.
      </div>
      <div>
        <v-simple-table v-if="sentRequests && sentRequests.length > 0">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-right">
                نام تیم
              </th>
<!--              <th class="text-right">-->
<!--                اطلاعات-->
<!--              </th>-->
              <th class="text-right">
                وضعیت
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(request, index) in sentRequests"
                :key="index"
            >
              <td>{{ request.source_team_name }}</td>
<!--              <td>-->
<!--                <v-btn-->
<!--                    class="pa-0"-->
<!--                    @click.stop="()=>{dialog_item = request.team;dialog = true;}"-->
<!--                    text plain-->
<!--                >-->
<!--                  <v-icon-->
<!--                  >mdi-account-box-outline-->
<!--                  </v-icon>-->
<!--                </v-btn>-->
<!--              </td>-->
              <td class="text-center">
                <v-chip
                    color="success"
                    v-if="request.status === 'accepted'"
                >
                  <v-icon class="ml-2">mdi-check</v-icon>
                  تایید شده
                </v-chip>
                <v-chip
                    color="primary"
                    v-else-if="request.status === 'pending'"
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
          </template>
        </v-simple-table>
        <div v-if="sentRequests && sentRequests.length === 0" class="mb-10">
          لیست بازی های شما خالی است
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

    </SectionContainer>
  </div>
</template>
<script>
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';
import MyTeamInvitations from "~/components/dashboard/team/MyTeamInvitations";

export default {
  components: {
    SectionContainer,
    SectionHeader,
    MyTeamInvitations
  },
  data() {
    return {
      pendingRequests: [],
      sentRequests: [],
      loading: false,
      dialog_item: null,
      dialog: false,
    };
  },
  methods: {
    acceptChallenge(id) {
      this.loading = true;
      this.$axios.$put(`challenge/request/${id}?answer=1`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.pendingRequests = this.pendingRequests.filter(item => item.id !== id);
      this.loading = false;
    },
    declineChallenge(id) {
      this.loading = true;
      this.$axios.$put(`challenge/request/${id}?answer=0`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.pendingRequests = this.pendingRequests.filter(item => item.id !== id);
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
  async fetch() {
    let res1 = await this.$axios.$get('challenge/request?source=0');
    let res2 = await this.$axios.$get('challenge/request?source=1');
    if (res1.status_code === 403) {
      this.$toast.error('برای دیدن این قسمت ابتدا باید ارسال نهایی داشته باشید!');
    } else {
      this.pendingRequests = res1.data.filter(item => item.status === 'pending');
      this.sentRequests = res2.data;
    }
    //TODO: check other error status code
  },
};
</script>
<style lang="scss" scoped>
.blueFont {
  color: rgb(41, 37, 255);
}

.orangeFont {
  color: orange;
}

.greenFont {
  color: green;
}
</style>
