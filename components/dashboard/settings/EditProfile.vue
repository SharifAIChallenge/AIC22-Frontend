<template>
  <div class="edit-profile">
    <div class="profile-picture">
      <img
          v-if="information.image"
          :src="image_display ? image_display :information.image"
          class="rounded-circle"
      />
      <img
          v-else
          class="rounded-circle"
          src="~/assets/images/avatar-sample.svg" alt="">
      <div class="upload-avatar">
        <v-file-input
            :rules="avatarRules"
            class="profile-input"
            accept="image/png, image/jpeg, image/bmp"
            hide-input
            placeholder="تصویر جدید"
            prepend-icon="mdi-camera"
            label="افزودن تصویر جدید"
            v-on:change="onProfileImageChange"
        ></v-file-input>
      </div>
    </div>

    <SectionContainer>
      <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
        <v-row>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.firstname_fa"
                :label="$t('form.nameInPersian')"
                required
                :rules="requiredRules"
                outlined
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.lastname_fa"
                :label="$t('form.lastNameInPersian')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field v-model="information.email"
                          label="ایمیل"
                          readonly
                          v-bind="filedProps"
                          :rules="emailRules"
                          rounded
            ></v-text-field>
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.phone_number"
                required
                label="شماره تماس"
                v-bind="filedProps"
                :rules="phoneRules"
                rounded
            ></v-text-field>
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-select v-model="information.university_degree" :items="degreeItem" required label="مقطع تحصیلی"
                      outlined
                      rounded
            ></v-select>
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.university"
                :label="$t('form.educationPlace')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                type="int"
                v-model="information.university_term"
                v-bind="filedProps"
                :rules="requiredRules"
                label="سال ورود"
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field v-model="information.major" :rules="requiredRules" outlined required
                          label="رشته"
                          rounded></v-text-field>
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                label="سال تولد"
                v-model="information.birth_date"
                outlined
                rounded></v-text-field>
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-select
                v-model="information.province"
                v-bind="filedProps"
                :items="provinces"
                required
                :rules="requiredRules"
                label="استان"
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.linkedin"
                v-bind="filedProps"
                label="لینک اکانت لینکدین"
                rounded
            />
          </v-col>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-text-field
                v-model="information.github"
                v-bind="filedProps"
                label="آیدی گیتهاب"
                rounded
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 mb-3" cols="12" md="6">
            <v-select
                v-model="information.programming_languages"
                :rules="requiredRules"
                :items="languageSelectItem"
                multiple
                rounded
                color="bg"
                label="زبان برنامه نویسی"
                outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="px-3 text-justify">
          <v-checkbox
              v-model="information.hide_profile_info"
              required
              label="اطلاعاتم برای سایر شرکت کننده ها قابل جستجو نباشد."
          ></v-checkbox>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="12" md="6">
            <div>
              <v-btn block :loading="loading" class="py-5" type="submit" :disabled="!valid" color="primary" rounded>
                <v-icon left>mdi-content-save-outline</v-icon>
                ذخیره اطلاعات
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div style="flex: 0 1 93px; margin-left: 24px">
              <v-btn block color="secondary" class="py-5" @click="resetForm" rounded>لغو</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </SectionContainer>
  </div>
</template>

<script>
import {emailRules, requiredRules, phoneRules} from "~/mixins/formValidations";
import {primaryButtonProps} from "~/mixins/buttonProps";
import {fieldProps} from "~/mixins/fieldProps";
import SectionHeader from "~/components/SectionHeader";
import SectionContainer from "~/components/SectionContainer";

export default {
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps, phoneRules],
  components: {SectionHeader, SectionContainer, VuePersianDatetimePicker: () => import("vue-persian-datetime-picker")},
  props: {
    information: Object,
    loading: Boolean,
    signUp: Function,
    resetForm: Function
  },
  data() {
    return {
      image_display: "",
      avatarRules: [
        value => !value || value.size < 2000000 || "حجم تصویر باید کمتر از 2 مگابایت باشد"
      ],
      valid: false,
      isLoading: false,
      languageSelectItem: [
        {
          text: "Java",
          value: "Java"
        },
        {
          text: "++C",
          value: "C++"
        },
        {
          text: "Python",
          value: "Python 3"
        }
      ],
      degreeItem: [
        {
          text: "دانش آموز",
          value: "ST"
        },
        {
          text: "کارشناسی",
          value: "BA"
        },
        {
          text: "کارشناسی ارشد",
          value: "MA"
        },
        {
          text: "دکترا",
          value: "DO"
        }
      ],
      universityItems: [],
      provinces: [
        "آذربایجان شرقی",
        "آذربایجان غربی",
        "اردبیل",
        "اصفهان",
        "البرز",
        "ایلام",
        "بوشهر",
        "تهران",
        "چهارمحال و بختیاری",
        "خراسان جنوبی",
        "خراسان رضوی",
        "خراسان شمالی",
        "خوزستان",
        "زنجان",
        "سمنان",
        "سیستان و بلوچستان",
        "فارس",
        "قزوین",
        "قم",
        "كردستان",
        "كرمان",
        "كرمانشاه",
        "کهگیلویه و بویراحمد",
        "گلستان",
        "گیلان",
        "لرستان",
        "مازندران",
        "مركزی",
        "هرمزگان",
        "همدان",
        "یزد"
      ],
    };
  },
  methods: {
    onProfileImageChange(e) {
      this.image_display = URL.createObjectURL(e)
      this.information.image = e;
    }
  }
  // async fetch() {

  // },
};
</script>

<style lang="scss">
.edit-profile {
  margin-top: 8rem;
}

.profile-picture {
  position: relative;
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

.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}

.vpd-day {
  color: #13202E !important;
}

.vpd-main {
  .form-control {
    height: 3rem;
    border-radius: 999px 0 0 999px;
    border: 1px solid #4e5863;
    color: #fff;
  }

  .vpd-icon-btn {
    background-color: rgb(65, 125, 244);
    border-radius: 0 999px 999px 0;
  }
}
.upload-avatar > div{
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
}
</style>