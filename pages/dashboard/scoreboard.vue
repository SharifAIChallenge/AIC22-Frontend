<template>
  <v-app>
    <v-container>
      <div class="scoreboard">
        <div class="d-flex justify-space-between align-center pl-6 pl-md-12">
          <SectionHeader title="جدول امتیازات" icon="mdi-scoreboard-outline" />
          <!-- <div class="d-flex align-center">
            <v-select
              v-model="scoreboardSelect"
              :items="scoreboardItems"
              item-text="table"
              item-value="src"
              label="تورنومنت"
              persistent-hint
              :hint="`${scoreboardSelect.src}`"
              @change="changeTable"
              outlined
            ></v-select>
          </div> -->
        </div>
        <v-data-table
          :loading="tableLoading"
          hide-default-footer
          center
          :headers="headers"
          :items="data"
          :page.sync="page"
          :items-per-page="itemPerPage"
          :item-class="rowBackground"
          :class="'page-' + page"
        >
          <template v-slot:item.rank="{ item, index }">
            <span>{{ (page - 1) * 20 + (index + 1) }}</span>
          </template>
          <template v-slot:item.name="{ item }">
            <div class="d-flex align-center">
              <img
                v-if="item.team.image_url"
                :src="item.team.image_url"
                height="60px"
                class="my-2"
                style="max-width: 60px; width: 60px; border-radius: 50%"
              />
              <img
                  v-else
                  src="~/assets/images/avatar-sample.svg"
                  height="60px"
                  class="my-2"
                  style="max-width: 60px; width: 60px; border-radius: 50%"
              />
              <span v-else class="emtyImage ml-1 my-2 d-none d-sm-block"></span>
              <div class="mr-3">
                <span>{{ item.team.name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:item.profile="{ item }">
            <v-icon class="icon" @click="showTeam(item.team)" style="color: #0071E3">mdi-card-account-details-outline</v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-4 pb-10" style="position: relative">
          <v-pagination v-model="page" :length="pageCount" total-visible="6"></v-pagination>
        </div>
        <v-dialog
            v-model="teamDetails"
            max-width="350"
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
                    v-if="teamInfo && teamInfo.image"
                    :src="teamInfo.image"
                    class="rounded-circle"
                />
                <img
                    v-else
                    class="rounded-circle"
                    src="~/assets/images/avatar-sample.svg" alt="">
              </div>
              <div class="text-center" style="margin-top: -4rem;">
                <p v-if="teamInfo">
                  {{ teamInfo.name }}
                </p>
              </div>
              <div v-if="teamInfo && teamInfo.members" class="members">
                <div v-for="(member,index) in teamInfo.members" :key="index">
                  <!--              <UserProfileForTeam :userData="member"/>-->
                  <div style="display: flex; justify-content: space-around">
                    <p class="ma-0">
                      {{ member.profile.firstname_fa }} {{ member.profile.lastname_fa }}
                    </p>
                  </div>
                </div>
<!--                <div class="text-center mt-10">-->
<!--                  <v-btn :disabled="teamInfo.members.length>=3" rounded color="primary" @click="sendRequest(teamInfo.id)">ارسال درخواست عضویت</v-btn>-->
<!--                </div>-->
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';

export default {
  components: { SectionHeader, SectionContainer, UserProfileForTeam },
  layout: 'dashboard',
  transition: 'fade-transition',

  async asyncData({ $axios, query }) {
    let url = query.id ? `challenge/scoreboard/${query.id}` : 'challenge/friendly_scoreboard';
    const res = await $axios.$get(url);
    const data = res.results;
    data[0].place = "first"
    data[1].place = "second"
    data[2].place = "third"
    const count = 20;
    const pageCount = Math.ceil(res.count / count);
    return { data, pageCount, url };
  },
  data() {
    return {
      tableLoading: false,
      dialog: false,
      filter: false,
      page: 1,
      url: '',
      pageCount: 0,
      itemPerPage: 20,
      scoreboardSelect: { table: 'تورنومنت ۱', src: 'tour1' },
      scoreboardItems: [
        { table: 'تورنومنت ۱', src: 'tour1' },
        { table: 'تورنومنت ۲', src: 'tour2' },
      ],
      headers: [
        {
          text: 'رتبه',
          align: 'right',
          value: 'rank',
        },
        {
          text: 'نام',
          align: 'right',
          value: 'name',
        },
        { text: 'امتیاز', align: 'center', value: 'score' },
        { text: 'برد', align: 'center', value: 'wins' },
        { text: 'باخت', align: 'center', value: 'losses' },
        { text: 'پروفایل', align: 'center', value: 'profile' },
      ],
      data: [],
      ProfileDialog: false,
      teamDetails: false,
      teamInfo: {},
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
      status_code: 200,
    };
  },
  methods: {
    rowBackground(item){
      if (this.page ===1 && item.place){
          if (item.place === "first"){
            return "firstPlace font-weight-bold pa-2"
          }else if (item.place === 'second'){
            return "secondPlace font-weight-bold pa-2"
          }else return "thirdPlace font-weight-bold pa-2"
      }
    },
    changeTable(url) {
      this.$router.push({ path: '/dashboard/scoreboard?q=' + url });
      this.getData(url);
    },
    sendRequest(team_id) {
      this.$axios.post('team/invitations/user_sent', {team_id}).then(res => {
        if (res.status === 201) {
          this.$toast.success("دعوتنامه شما با موفقیت ارسال شد.");
        } else {
          this.$toast.error(this.translateResponseMessage(res.data));
        }
      }).catch(err => {
        if (err.response.data.detail === 'you have a sent an invitation already'){
          this.$toast.error('شما قبلا به این تیم دعوت‌نامه ارسال کردید!');
        }else this.$toast.error('در ارسال دعوتنامه مشکلی پیش آمده است! لطفا دوباره تلاش کنید.');
      });
    },
    getData(param) {
      this.tableLoading = true;
      this.$axios.get(`${this.url}?page=${this.page}`).then(res => {
        if (res.status === 200) {
          this.data = res.data.results;
          this.status_code = res.status;
          if (this.page === 1){
            console.log("in", this.data[0])
          }
          const count = 20;
          this.pageCount = Math.ceil(res.data.count / count);
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.tableLoading = false;
    },
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo = team;
    },
    setCurrentUser(profile, email, id, show) {
      this.teamDetails = false;
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.ProfileDialog = true;
    },
  },
  watch: {
    page: function() {
      this.getData(this.page);
    },
  },
};
</script>

<style lang="scss">
@import '/assets/variables.scss';
@import '/assets/mixins.scss';
.scoreboard {
  @include v-sm {
    .page-1 {
      table tbody tr {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          //color: var(--v-bg-base);
          //background-color: transparent;
          button {
            color: var(--v-bg-base);
          }
          //&:hover {
          //  background-color: var(--v-secondary-darken3) !important;
          //}
        }
      }
    }
  }

  .firstPlace{
    background-color: #203247 !important;
    color: white;
  }
  .secondPlace{
    background-color: #203247 !important;
    color: white;
  }
  .thirdPlace{
    background-color: #203247 !important;
    color: white;
  }
  .emtyImage {
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.493);
    border-radius: 50%;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    display: none;
  }
}
.v-data-table__empty-wrapper td {
  text-align: center !important;
}

.icon{
  color: white;
  &:hover{
    color: #1a1940;
  }
}

.modal-shadow, .v-dialog.v-dialog--active, .modal {
  border-radius: 10px !important;
}

.modal-shadow, .v-dialog.v-dialog--active, .modal {
  border-radius: 10px !important;
}

.profile-picture {
  position: relative !important;
  display: flex;
  top: -5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

  .upload-avatar {
    width: 12rem;
  }
</style>
