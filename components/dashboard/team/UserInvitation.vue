<template>
  <div>
    <SectionHeader title="دعوت نامه های من" icon="mdi-script-text-outline"/>
    <SectionContainer>
      <v-alert icon="mdi-information" class="mb-8">
        ایجا لیست دعوتنامه هایی را که از تیم ها برای عضویت در آن ها دریافت کرده اید، می بینید.
      </v-alert>
      <div v-if="this.pending && this.pending.length === 0" class="mb-10">
        لیست دعوتنامه های شما خالی است
      </div>
      <div v-if="this.pending && this.pending.length !== 0 || this.reqHistory && this.reqHistory.length !== 0">
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
            <tr v-for="item in pending">
              <td>
                {{ item.team.name }}
              </td>
              <td>
                <v-icon>mdi-account-box-outline</v-icon>
              </td>
              <td class="text-center">
                <v-chip
                    color="primary"
                >
                  <v-icon class="ml-2">mdi-clock-time-four-outline</v-icon>

                  در انتظار تایید

                </v-chip>
              </td>
            </tr>
            <tr v-for="item in pending">
              <td>
                {{ item.team.name }}
              </td>
              <td>
                <v-icon>mdi-account-box-outline</v-icon>
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
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: {SectionHeader, SectionContainer},
  props: ['toggleHaveTeam'],

  async fetch() {
    let res1 = await this.$axios.$get('team/invitations/user_pending');
    let res2 = await this.$axios.$get('team/invitations/user_sent');
    this.pending = res1.data;
    this.reqHistory = res2.data;
  },
  data() {
    return {
      loading: false,
      pending: [],
      reqHistory: [],
    };
  },
  methods: {
    acceptRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=1`).then(res => {
        // console.log(res);
        if (res.status_code === 200) {
          this.$toast.success('دعوت با موفقیت پذیرفته شد.');
          this.toggleHaveTeam();
        } else {
          this.$toast.error('مشکلی در قبول درخواست رخ داد لطفا دوباره امتحان کنید.');
        }
      });
      this.loading = false;
    },
    rejectRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=0`).then(res => {
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
</style>
