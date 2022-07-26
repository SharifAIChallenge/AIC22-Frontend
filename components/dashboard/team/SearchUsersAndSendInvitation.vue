<template>
  <div>
    <SectionHeader class="mt-2" title="جستجوی افراد بدون تیم" icon="mdi-badge-account-horizontal"/>

    <div class="searchBar mt-8 mb-6 px-6 px-md-12">
      <div class="mx-10" style="width: 40%;max-width: 500px">
        <v-text-field
            class="curved"
            label="جست‌و‌جو نام فرد"
            outlined
            dense
            v-model="UserName"
            @keydown.enter="search(UserName)"
            height="50px"
            full-width
        ></v-text-field>
      </div>
      <div>
        <v-btn height="50px" block color="primary" class="curved pa-4" @click="search(UserName)">
          <v-icon class="ml-0 ml-md-3">mdi-magnify</v-icon>
          <div class="hide-sm-and-down px-4">جست‌و‌جو</div>
        </v-btn>
      </div>
    </div>
    <v-data-table
        :headers="header"
        :items="users"
        :page.sync="page"
        :loading="tableLoading"
        :items-per-page="itemsPerPage"
        disable-sort
        hide-default-footer
        class="mx-10"
        style="background: transparent; border-color: transparent"
    >
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <div class="">
            <span>{{ item.profile.firstname_fa + " " + item.profile.lastname_fa }}</span>
          </div>
        </div>
      </template>
      <template v-slot:[`item.profile`]="{ item }">
        <v-icon class="icon" @click="showusers(item)">mdi-account-box-outline</v-icon>
      </template>
      <template v-slot:[`item.sendRequest`]="{ item }">
        <div class="d-flex justify-center"  style="cursor : pointer;">
          <v-icon class="icon add-request__icon" @click="sendInvitation(item.email)" >mdi-plus-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>
    <div class="mt-2">
      <v-pagination  v-model="page" :length="pageCount" total-visible="20" v-on:next="page + 1"
                    @previous="page - 1" style="background-color : transparent"></v-pagination>
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
              <!--              <UserProfileForusers :userData="member"/>-->
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
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';

export default {
  name: "SearchUsersAndSendInvitation",
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
      UserName: '',
      header: [
        {text: 'نام', value: 'name'},
        {text: 'اطلاعات', value: 'profile', align: 'center'},
        {text: 'ارسال درخواست عضویت', value: 'sendRequest', align: 'center'},
      ],
      users: [],
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
    sendInvitation(email) {
      this.tableLoading = true;
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', {user_email}).then(res => {
          this.$toast.success(this.translateResponseMessage(res));
      }).catch(()=>{
          this.$toast.error(this.translateResponseMessage(res));
      });
      this.tableLoading = false;
    },

    setPageCount(count) {
      this.pageCount = Math.ceil(count / 20);
    },
    calculateAge(birthday) {
      let dob = new Date(birthday);
      let diff_ms = Date.now() - dob.getTime();
      let age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    setCurrentUser(profile, email, id, show) {
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.dialog = true;
    },
    setUser(member) {
      this.dialog_item_user = member;
      this.dialog = false
      this.dialogUser = true
    },
    search(name) {
      this.users = [];
      this.tableLoading = true;
      this.page = 1;

      this.$axios.get(`/account/without_team?name=${name}`).then(res => {
        const count = 20;
        // console.log(res)
        if (res.data.count % count === 0) {
          this.pageCount = res.data.count / count;
        } else {
          this.pageCount = Math.ceil(res.data.count / count);
        }
        if (res.data.count === 0) {
          this.$toast.error('فردی با این نام وجود ندارد.');
        }
        this.users = res.data.results.data;
        this.tableLoading = false;

      });
      // this.UserName = '';
    },
    changePage(page) {
      this.tableLoading = true;
      this.users = [];
      let url = '';
      if (this.lastApi) url = this.lastApi + '&page=' + page;
      else url = `/account/without_team?page=${page}`;
      this.$axios.get(url).then(res => {
        console.log(res)
        this.users = res.data.results.data;
        this.tableLoading = false;
        this.setPageCount(res.data.count);
      });
    },
    showusers(users) {
      // this.usersDetails = true;
      this.dialogUser = true;
      this.dialog_item_user = users
      this.usersInfo = users.profile.firstname_fa + " " + users.profile.lastname_fa;
      this.dialog_item = users.profile
      // console.log("fucl")
    },

    /*
        filterSend() {
          this.tableLoading = true;
          let lastApi = 'account/without_team';

          let index = 0;
          for (const property in this.filterData) {
            if (this.filterData[property]) {
              if (index === 0) lastApi = lastApi + '?' + property + '=' + this.filterData[property];
              else lastApi = lastApi + '&' + property + '=' + this.filterData[property];
              index++;
            }
          }

          this.lastApi = lastApi;

          this.$axios.$get(lastApi).then(res => {
            if (res.status_code === 200) {
              this.data = res.results.data;
              this.status_code = res.status_code;
              this.setPageCount(res.count);
            } else {
              this.$toast.error('خطا در برقراری ارتباط!');
            }
          });
          this.tableLoading = false;
          this.$refs.form.reset();
          this.filter = !this.filter;
        },
    */
    translateResponseMessage(response) {
      if (response.message === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else if (response.detail.detail === 'you have a sent an invitation already') return 'شما قبلا به این تیم دعوت‌نامه ارسال کردید! ';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
  },
  async fetch() {
    this.tableLoading = true;
    let res = await this.$axios.$get('account/without_team');

    if (res.count) {
      this.users = res.results.data;
      this.setPageCount(res.count);
    } else {
      this.$toast.error('خطا در برقراری ارتباط!');
    }
    this.tableLoading = false;
  }
  ,
}
;
</script>
<style lang="scss" scoped>


::v-deep .theme--dark.v-pagination .v-pagination__navigation{
  background-color: transparent;
  border-radius: 50%;
  border : 0.1rem solid #0e1224; 
}

::v-deep .v-pagination__item{
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

.add-request__icon {
  color: #20C9B2;
}

.data_table{
  background-color: transparent !important;
}
</style>
