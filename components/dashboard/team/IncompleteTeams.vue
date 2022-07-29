<template>
  <div>
    <SectionHeader class="mt-2" title="جستجوی تیم‌ها" icon="mdi-badge-account-horizontal"/>

    <div class="searchBar mt-8 mb-6 px-6 px-md-12">
      <div class="mx-10" style="width: 40%;max-width: 500px">
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
      <div>
        <v-btn height="50px" block color="primary" class="curved pa-4" @click="search(teamName)">
          <v-icon class="ml-0 ml-md-3">mdi-magnify</v-icon>
          <div class="hide-sm-and-down px-4">جست‌و‌جو</div>
        </v-btn>
      </div>
    </div>
    <v-data-table
        :headers="header"
        :items="team"
        :page.sync="page"
        :loading="tableLoading"
        :items-per-page="itemsPerPage"
        disable-sort
        hide-default-footer
        class="mx-10"
        style="background-color : transparent"
    >
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <div class="">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </template>
      <template v-slot:[`item.profile`]="{ item }">
        <v-icon class="icon" @click="showTeam(item)">mdi-account-box-outline</v-icon>
      </template>
      <template v-slot:[`item.sendRequest`]="{ item }">
        <div class="d-flex justify-center">
          <v-icon class="icon" @click="sendRequest(item.id)">mdi-plus-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <div class="mt-2">
      <v-pagination v-model="page" :length="pageCount" total-visible="6" v-on:next="page + 1"
                    @previous="page - 1"></v-pagination>
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
                v-if="dialog_item && dialog_item.image"
                :src="dialog_item.image"
                class="rounded-circle"
            />
            <img
                v-else
                class="rounded-circle"
                src="~/assets/images/avatar-sample.svg" alt="">
          </div>
          <div class="text-center" style="margin-top: -4rem;">
            <p v-if="dialog_item">
              {{ dialog_item.name }}
            </p>
          </div>
          <div v-if="dialog_item && dialog_item.members" class="members">
            <div v-for="(member,index) in dialog_item.members" :key="index">
              <!--              <UserProfileForTeam :userData="member"/>-->
              <div style="display: flex; justify-content: space-around">
                <p class="ma-0">
                  {{ member.profile.firstname_fa }} {{ member.profile.lastname_fa }}
                </p>
                <v-icon class="icon" @click="setUser(member)">mdi-account-box-outline</v-icon>
              </div>


            </div>
          </div>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogUser"
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
                v-if="dialog_item_user && dialog_item_user.profile.image_url"
                :src="dialog_item_user.profile.image_url"
                class="rounded-circle"
            />
            <img
                v-else
                class="rounded-circle"
                src="~/assets/images/avatar-sample.svg" alt="">
          </div>
          <div class="text-center" style="margin-top: -4rem;">
            <p v-if="dialog_item_user">
              {{ dialog_item_user.profile.firstname_fa }} {{ dialog_item_user.profile.lastname_fa }}
            </p>
          </div>
          <div>
            زبان های برنامه نویسی
            <ul class="pr-4"
                v-if="dialog_item_user&& dialog_item_user.profile && dialog_item_user.profile.programming_languages.length !== 0">
              <li v-for="(lang,index) in dialog_item_user.profile.programming_languages" :key="index">
                {{ lang.programming_language_title }}
              </li>
            </ul>
            <div v-else>
              -ثبت نشده است !-
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--    <v-dialog v-model="ProfileDialog" width="350">-->
    <!--      <v-btn icon class="close-btn" @click="ProfileDialog = false">-->
    <!--        <v-icon>mdi-close</v-icon>-->
    <!--      </v-btn>-->
    <!--      <UserProfileForTeam :userData="currentUser"/>-->
    <!--    </v-dialog>-->
    <!--    <v-dialog v-model="teamDetails" width="350px">-->
    <!--      <v-btn icon class="close-btn" @click="teamDetails = false">-->
    <!--        <v-icon>mdi-close</v-icon>-->
    <!--      </v-btn>-->
    <!--      <v-card>-->
    <!--        <img v-if="teamInfo.image_url" :src="teamInfo.image_url" style="max-width: 100%"/>-->
    <!--        <div class="pa-3">-->
    <!--          {{ teamInfo.name }}-->
    <!--        </div>-->

    <!--        <v-row v-for="(member, index) in teamInfo.members" :key="index" class="pa-3" style="width: 100%">-->
    <!--          <v-col cols="2">-->
    <!--            <img :src="member.profile.image_link" :alt="member.first_name" height="40px" style="max-width: 40px"/>-->
    <!--          </v-col>-->
    <!--          <v-col cols="10">-->
    <!--            <div class="d-flex align-center">-->
    <!--              <v-col cols="10">-->
    <!--                {{ member.profile.firstname_fa + ' ' + member.profile.lastname_fa }}-->
    <!--              </v-col>-->
    <!--              <v-col cols="2">-->
    <!--                <v-icon @click="setCurrentUser(member.profile, member.email, member.id, false)">-->
    <!--                  mdi-card-account-details-outline-->
    <!--                </v-icon>-->
    <!--              </v-col>-->
    <!--            </div>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--        <v-btn color="primary" block class="mt-5" @click="sendRequest(teamInfo.id)" width="100%" height="55px">ارسال-->
    <!--          درخواست عضویت-->
    <!--        </v-btn>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->

  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';

export default {
  components: {
    UserProfileForTeam,
    SectionContainer,
    SectionHeader,
  },
  data() {
    return {
      dialog: false,
      dialogUser: false,
      dialog_item: null,
      dialog_item_user: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      teamDetails: false,
      ProfileDialog: false,
      tableLoading: true,
      teamInfo: {},
      teamName: '',
      header: [
        {text: 'نام تیم', value: 'name'},
        {text: 'پروفایل', value: 'profile', align: 'center'},
        {text: 'ارسال درخواست عضویت', value: 'sendRequest', align: 'center'},
      ],
      team: [],
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
    };
  },
  watch: {
    page: function () {
      this.changePage(this.page);
    },
  },
  methods: {
    setUser(member) {
      this.dialog_item_user = member;
      this.dialog = false
      this.dialogUser = true
    },
    search(name) {
      this.team = [];
      this.tableLoading = true;
      this.page = 1;
      this.$axios.get(`/team/incomplete?name=${name}`).then(res => {
        const count = 20;
        if (res.data.count % count === 0) {
          this.pageCount = res.data.count / count;
        } else {
          this.pageCount = Math.ceil(res.data.count / count);
        }
        if (res.data.count === 0) {
          this.$toast.error('تیمی با این نام وجود ندارد.');
        }
        this.team = res.data.results;
        this.tableLoading = false;
      });
      // this.teamName = '';
    },
    changePage(page) {
      this.tableLoading = true;
      this.team = [];
      if (this.teamName === '') {
        this.$axios.get(`/team/incomplete?page=${page}`).then(res => {
          this.team = res.data.results;
          this.tableLoading = false;
        });
      } else {
        this.$axios.get(`/team/incomplete?name=${this.teamName}&page=${page}`).then(res => {
          this.team = res.data.results;
          this.tableLoading = false;
        });
      }
    },
    sendRequest(team_id) {
      this.$axios.post('team/invitations/user_sent', {team_id}).then(res => {
        // console.log(res)
        if (res.data.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.data));
        } else {
          this.$toast.error(this.translateResponseMessage(res.data));
        }
      }).catch(res => {
        this.$toast.error('شما قبلا به این تیم دعوت‌نامه ارسال کردید!');
      });
    },
    showTeam(team) {
      // this.teamDetails = true;
      this.dialog = true;
      this.teamInfo = team;
      this.dialog_item = team
    },
    setCurrentUser(profile, email, id, show) {
      this.teamDetails = false;
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.ProfileDialog = true;
    },
    translateResponseMessage(response) {
      if (response.message === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else if (response.detail.detail === 'you have a sent an invitation already') return 'شما قبلا به این تیم دعوت‌نامه ارسال کردید! ';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
  },
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('/team/incomplete').then(res => {
      this.team = res.results;
      const count = 20;
      if (res.count % count === 0) {
        this.pageCount = res.count / count;
      } else {
        this.pageCount = Math.ceil(res.count / count);
      }
    });
    this.tableLoading = false;
  },
};
</script>
<style lang="scss" scoped>


::v-deep .theme--dark.v-pagination .v-pagination__navigation {
  background-color: transparent;
  border-radius: 50%;
  border: 0.1rem solid #0e1224;
}

::v-deep .v-pagination__item {
  border-radius: 50%;
  background-color: transparent;
}


.emtyImage {
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.493);
  border-radius: 50%;
}

@import 'assets/mixins.scss';
.icon {
  &:hover {
    color: var(--v-primary-base);
  }
}

.searchBar {
  display: flex;
  justify-content: center;

  .hide-sm-and-down {
    @include v-not-sm {
      display: none;
    }
  }
}

.curved {
  border-radius: 99px;
}

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

.members {
  border-top: 1px solid #13202E;
}

.members > div {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #13202E;
}

</style>
