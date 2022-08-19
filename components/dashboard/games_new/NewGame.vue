<template>
  <div class="">
    <SectionHeader title="جستجو تیم‌" icon="mdi-magnify"/>
    <div style="display: flex; justify-content: space-between; align-items: center" class="mx-12">
      <h4 style="flex: 1">درخواست بازی با بات</h4>
      <div style="width: 200px">
      <v-menu offset-y class="transparent" style="">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" block  max-height="100%" class="curved" v-bind="attrs" v-on="on">
            بازی با بات
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in bots" :key="item.number" @click="playWithBot(item.number, item.name)">
            <v-list-item-title style="text-align: center" class="d-flex align-end justify-center">
              <v-icon class="ml-3" size="30">{{ bot_icon[index] }}</v-icon>
              <span>{{ item.name }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      </div>
    </div>

    <div class="searchBar mt-8 mb-6 ">
      <div class="mx-10 input" style="flex: 1">
        <v-text-field
            class="curved"
            label="جست‌و‌جو نام تیم"
            outlined
            dense
            v-model="teamName"
            @keydown.enter="search(teamName)"
            height="50px"
            full-width
        ></v-text-field>
      </div>
      <div style="">
        <v-btn height="50px"   color="primary" class="curved pa-4 btn"
               @click="search(teamName)">
          <div class=" px-4">جست‌و‌جو</div>
        </v-btn>
      </div>
      <div>
        <v-btn height="50px" outlined class="curved outlined-btn pa-4 btn mx-4"
               :disabled="!this.randomData || this.randomData.length === 1"
               @click="randomMatch()">
          <div class=" px-4">انتخاب رندوم</div>
        </v-btn>
      </div>
    </div>

      <div class="notice-box mb-4 mx-6 mx-md-12 text-center " v-if="msg">
        <p>{{ msg }}</p>
      </div>
    <!--    <div>-->
    <!--      <v-row class="mx-0">-->
    <!--        <v-col cols="6" class="px-0">-->

    <!--        </v-col>-->
    <!--        <v-col class="px-0" cols="6">-->
    <!--          <v-btn color="primary" block width="100%" :disabled="!this.randomData || this.randomData.length === 1"-->
    <!--                 @click="randomMatch()">-->
    <!--            <v-icon large class="pl-5">mdi-shuffle-variant</v-icon>-->
    <!--            انتخاب تیم رندوم-->
    <!--          </v-btn>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--    </div>-->
    <div>
      <v-data-table
          :headers="headers"
          :items="teams"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :loading="tableLoading"
          disable-sort
          hide-default-footer
          class="mx-10"
          style="background-color : transparent"
      >
        <template v-slot:item.profile="{ item }">
          <v-icon @click="showTeam(item)" class="ProfileIcon">mdi-card-account-details-outline</v-icon>
        </template>
        <template v-slot:item.play="{ item }">
          <div style="max-width: 10px">
            <v-btn rounded color="primary" @click="sendGameRequest(item.id)" block>درخواست بازی</v-btn>
          </div>
        </template>
      </v-data-table>
      <div class="pt-4 pb-10" style="position: relative">
        <v-pagination v-model="page" total-visible="6" :length="pageCount"></v-pagination>
        <!-- <Logo /> -->
      </div>
      <v-dialog
          v-model="teamDetails"
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
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';
import Logo from '~/components/dashboard/Logo';

export default {
  components: {UserProfileForTeam, SectionHeader, SectionContainer, Logo},
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      tableLoading: false,
      teamName: '',
      teamInfo: {},
      ProfileDialog: false,
      teamDetails: false,
      randomData: [],
      teams: [],
      msg: '',
      headers: [
        {text: 'نام تیم', value: 'name'},
        {text: 'پروفایل', value: 'profile'},
        {text: 'بازی دوستانه', value: 'play'},
      ],
      currentUser: {},
      bots: [],
      bot_icon: ['mdi-baby-face', 'mdi-robot', 'mdi-robber', 'mdi-emoticon-devil', 'mdi-virus'],
    };
  },
  async fetch() {
    this.tableLoading = true;
    let res = await this.$axios.$get('/team/all-teams');
    this.teams = res.results.data;
    const count = 20;
    if (res.count % count === 0) {
      this.pageCount = res.count / count;
    } else {
      this.pageCount = Math.ceil(res.count / count);
    }
    await this.$axios.get('/challenge/lobby').then(dt =>{
      this.randomData = dt.data;
    }).catch(e =>{
      if (e.response.data.detail === 'your team doesn\'t have a final submission'){
        this.msg = 'برای انجام بازی ابتدا باید در قسمت ارسال کد, کد خود را ارسال کنید';
      }
    });
    this.tableLoading = false;
    await this.$axios.$get('/challenge/bot').then(response =>{
      this.bots = response.data
    });
    // this.bots = res.data;
  },
  watch: {
    page: function () {
      this.changePage(this.page);
    },
  },
  methods: {
    search(name) {
      this.teams = [];
      this.tableLoading = true;
      this.page = 1;
      this.$axios.get(`/team/all-teams?name=${name}`).then(res => {
        const count = 20;
        if (res.data.count % count === 0) {
          this.pageCount = res.data.count / count;
        } else {
          this.pageCount = Math.ceil(res.data.count / count);
        }
        if (res.data.count === 0) {
          this.$toast.error('تیمی با این نام وجود ندارد.');
        }
        this.teams = res.data.results.data;
        this.tableLoading = false;
      });
      // this.teamName = '';
    },
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo = team;
    },
    playWithBot(level, name) {
      this.$axios
          .post(`challenge/bot/${level}`, {})
          .then(res => {
            this.$toast.success(`بازی با بات ${name} ساخته شد.`);
            this.$toast.success('برای مشاهده نتیجه و جزییات به تب تاریخچه رجوع کنید');
          })
          .catch(err => {
            if (err.response.data.message === "You have to wait at least 5 minutes between each bot game!"){
              this.$toast.error("برای هر بار بازی با بات نیاز است که 5 دقیقه با بازی قبلی فاصله زمانی وجود داشته باشد.")
            }else this.$toast.error('در روند ساخت بازی مشکل ایجاد شده است!');

          });
    },
    changePage(page) {
      this.tableLoading = true;
      this.teams = [];
      if (this.teamName === '') {
        this.$axios.get(`/team/all-teams?page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      } else {
        this.$axios.get(`/team/all-teams?name=${this.teamName}&page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      }
    },
    setCurrentUser(user) {
      this.teamDetails = false;
      this.currentUser = user;
      this.ProfileDialog = true;
    },
    sendGameRequest(teamId) {
      this.$axios.post('/challenge/request', {type: 'friendly_match', target_team: `${teamId}`}).then(res => {
        if (res.status === 200) {
          this.$toast.success('درخواست با موفقیت ارسال شد');
        }
      }).catch(e=>{
        if (e.response.data.detail === 'your team doesn\'t have a final submission'){
          this.$toast.error('برای انجام بازی ابتدا باید در قسمت ارسال کد, کد خود را ارسال کنید')
        } else if (e.response.data.detail === 'you have a sent an request already') {
          this.$toast.error('قبلا به این تیم دعوت داده‌اید. منتظر پاسخ بمانید');
        }
      })
    },
    randomMatch() {
      this.$axios.post('/challenge/lobby', {game_type: 'friendly_match'}).then(res => {
        if (res.status) {
          this.$toast.success('به لابی بازی‌های دوستانه اضافه شدید');
          this.randomData = [1];
        }
      }).catch(e=>{
        if (e.response.data.detail === 'your team doesn\'t have a final submission'){
          this.$toast.error('برای انجام بازی ابتدا باید در قسمت ارسال کد, کد خود را ارسال کنید')
        }
      })
    },
  },
};
</script>
<style scoped lang="scss">
@import 'assets/mixins.scss';
@import 'assets/variables.scss';

.v-list-item:hover {
  background-color: var(--v-shades-lighten4);
}

.searchBar {
  display: flex;
  justify-content: space-between;

  .hide-sm-and-down {
    @include v-not-sm {
      display: none;
    }
  }
}

.ProfileIcon {
  &:hover {
    color: var(--v-primary-base);
  }
}

.curved {
  border-radius: 99px;
}

.outlined-btn {
  border: var(--v-primary-base) 3px solid;
}
@media (max-width: 600px) {
.searchBar{
  flex-direction: column;
align-items: center;
  .btn{
    width: 200px;
    margin-bottom: 10px;
  }
  .input{
    width: 80%;
  }
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

  .upload-avatar {
    width: 12rem;
  }

  img {
    width: 10rem;
    height: 10rem;

    border: 0.5rem solid #13202E;
  }
}
</style>
