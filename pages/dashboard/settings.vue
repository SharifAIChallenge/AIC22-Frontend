<template>
  <div>
    <v-container class="pa-0 d-flex align-center justify-space-between">
      <p class="headline py-5 ma-0 mr-5">
        حساب کاربری
      </p>
      <div>
        <client-only>
          <div class="d-flex">
            <v-tabs v-model="tabs" icons-and-text grow color="primary">
              <div v-for="(item, key) in tabLabels" :key="key" class="d-flex flex-column">
                <v-tab>
                    <span class="text--white">
                      {{ item.title }}
                    </span>
                  <v-icon size="24" color="white">{{ tabs === key ? item.icon : item.iconOutline }}</v-icon>
                </v-tab>
              </div>
            </v-tabs>
          </div>
        </client-only>
      </div>
    </v-container>
    <div>
      <v-divider />
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card-text>
            <Box classes="ma-10 elevation-20">
              <EditProfile :loading="loading" :signUp="signUp" :information="this.information" :resetForm="resetForm" />
            </Box>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text class="settingWraper">
            <div class="small-box mx-auto">
              <div class="notice-box my-10">
                درصورت تمایل میتوانید رزومه خود را در این بخش بارگذاری نمایید تا برای کارفرمایان قابل رویت باشد
              </div>
              <Box classes="elevation-20 ">
                <Resume
                  :deleteResume="deleteResume"
                  :signUp="signUp"
                  :information="this.information"
                  :loading="loading"
                  :deleteImage="deleteImage"
                  :resetForm="resetForm"
                />
              </Box>
            </div>


          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text class="settingWraper">
            <Box classes="ma-10 elevation-20 small-box mx-auto">
              <ChangePassword />
            </Box>

          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </div>

  </div>
</template>

<script>
import EditProfile from "../../components/dashboard/settings/EditProfile";
import Resume from "../../components/dashboard/settings/resume";
import ChangePassword from "../../components/dashboard/settings/ChangePassword";
import DashboardPage from "../../components/dashboard/DashboardPage";
import { editProfile } from "~/api";
import { mapState } from "vuex";
import Box from "~/components/utilities/Box";

export default {
  components: { Box, DashboardPage, ChangePassword, EditProfile, Resume },
  layout: "dashboard",
  transition: "fade-transition",
  data() {
    return {
      tabs: null,
      information: {
        firstname_fa: "",
        lastname_fa: "",
        birth_date: "",
        university: "",
        hide_profile_info: "",
        can_sponsors_see: "",
        email: "",
        github: "",
        linkedin: "",
        phone_number: "",
        major: "",
        programming_languages: [],
        province: "",
        degree: "",
        term: "",
        resume: null,
        image: null,
        skills: [],
        jobs: []
      },
      tabLabels: [
        {
          title: "اطلاعات شخصی",
          icon: "mdi-account-circle",
          iconOutline: "mdi-account-circle-outline"
        },
        {
          title: "رزومه",
          icon: "mdi-badge-account-horizontal",
          iconOutline: "mdi-badge-account-horizontal-outline"
        },
        {
          title: "تغییر رمز عبور",
          icon: "mdi-form-textbox-password",
          iconOutline: "mdi-form-textbox-password"
        }
      ],
      loading: false
    };
  },
  methods: {
    signUp() {
      const formData = new FormData();
      let isFormValid = false;
      for (const key in this.information) {
        if (this.information[key] !== this.profile[key]) {
          if (key === "jobs" || key === "skills" || key === 'programming_languages') {
            if (this.information[key]) {
              formData.append(`${key}_list`,this.information[key].join(','));
            }
          } else {
            formData.append(key, this.information[key]);
          }
          isFormValid = true;
        }
      }

      if (!isFormValid) {
        return;
      }
      this.loading = true;
      editProfile(this.$axios, formData)
        .then(res => {
          this.loading = false;
          this.$store.commit("auth/setUser", res);
          this.resetForm();
          this.$toast.success("تغییرات با موفقیت دخیره شد.");
        })
        .catch(e => {
          this.loading = false;
          this.$toast.error("در روند ثبت اطلاعات مشکل بوجود آمده است");
        });
    },
    resetForm() {
      this.information = { ...this.profile };
    },
    deleteResume() {
      this.information.resume = null;
      this.$axios.delete("/accounts/profile?file=resume");
    },
    deleteImage() {
      this.information.image = null;
      this.$axios.delete("/accounts/profile?file=image");
    }
  },
  watch: {
    profile(newProfile, oldProfile) {
      if (newProfile) {
        const skills = newProfile.skills.map(item => item.skill.split(","))[0];
        const jobs = newProfile.jobs.map(item => item.position.split(","))[0];
        this.information = { ...newProfile };
      }
    }
  },
  computed: {
    ...mapState({
      profile: state => state.auth.user
    })
  },
  mounted() {
    if (this.profile) {
      const skills = this.profile.skills.map(item => item.skills.split(","))[0];
      const jobs = this.profile.jobs.map(item => item.position.split(","))[0];
      this.information = { ...this.profile, skills, jobs };
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/variables.scss';
@import '../../assets/mixins.scss';

.theme--dark.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}

.theme--dark.v-tabs-items {
  background-color: transparent !important;
}

.text--white {
  color: #ffffff;
}

.v-tab.v-tab--active {
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}

.small-box {
  width: 25rem;
}
</style>
