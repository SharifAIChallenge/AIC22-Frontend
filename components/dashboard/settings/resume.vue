<template>
  <div>
    <SectionContainer>
      <div v-if="hasResume" class="notice-box text-center" style="color: #00c853">رزومه‌ی شما ذخیره شده‌است. برای تغییر فایل رزومه روی تیک سبز رنگ کلیک کنید.</div>
      <v-form ref="editProfile" onSubmit="return false;" @submit="signUp">
        <input class="fileInput" type="file" ref="fileRef" @change="fileInputChanged" >
        <div class="resume-file" @click="fileInputClicked">
          <div>
            <v-icon size="112" :color=" icon ==='mdi-check' ? 'success' : ''  ">{{icon}}</v-icon>
          </div>
        </div>
        <div class="d-flex mt-8">
          <div style="flex: 0 1 93px; margin-left: 24px">
            <v-btn block color="black" style="flex-basis: 20%" @click="resetForm" rounded class="py-5">لغو</v-btn>
          </div>
          <div style="flex: 1">
            <v-btn block :loading="loading" type="submit" class="py-5" color="primary" style="flex-basis: 75%" rounded
            :disabled="!onChangeCalled"
            >
              <v-icon left>mdi-content-save-v-bind="filedProps"</v-icon>
              ذخیره اطلاعات
            </v-btn>
          </div>
        </div>
      </v-form>
    </SectionContainer>
  </div>
</template>

<script>
import { emailRules, requiredRules } from "~/mixins/formValidations";
import { fieldProps } from "~/mixins/fieldProps";
import SectionHeader from "~/components/SectionHeader";
import SectionContainer from "~/components/SectionContainer";

export default {
  mixins: [requiredRules, emailRules, fieldProps],
  components: { SectionHeader, SectionContainer },
  data() {
    return {
      onChangeCalled:false,
      hasResume : !!this.information.resume_url,
      icon: !!this.information.resume_url ? 'mdi-check' : 'mdi-file-plus-outline'
    };
  },

  props: {
    information: Object,
    disable: Boolean,
    loading: Boolean,
    signUp: Function,
    deleteResume: Function,
    deleteImage: Function,
    resetForm: Function
  },
  methods: {
    fileInputClicked() {
      this.$refs.fileRef.click();
    },
    fileInputChanged(e) {
      const file = e.target.files[0];
      if (file) {
        this.onChangeCalled = true
        this.information.resume = file;
        this.$toast.success("رزومه شما به روز رسانی شد برای ادامه بر روی دکمه ذخیره اطلاعات کلیک کنید.")
      }
    }
  }
};
</script>
<style lang="scss">
.resume {
  .v-text-field--outlined .v-input__prepend-outer {
    margin-top: 10px !important;
  }

  .v-input__prepend-outer {
    position: absolute;
    left: 3px;
    top: 3px;
  }

  .v-input__append-inner {
    display: none;
  }
}

.marginTop {
  margin-top: 100px !important;
}

.skill,
.job {
  position: relative;

  .v-text-field__details {
    display: none;
  }

  .mdi-check {
    position: absolute !important;
    left: 19px;
    cursor: pointer;
    top: 7px;
  }
}

.resume-file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  div {
    background-color: #13202E;
    border-radius: 9999px;
    padding: 2rem 2.3rem;
  }
}

.fileInput {
  visibility: hidden;
}
</style>
