<template>
  <div>
    <SectionContainer>

      <div class="my-team ">
        <Box class="team-card pa-8 px-4 d-flex flex-column justify-content-center">
          <v-form ref="createTeam" v-model="valid" onSubmit="return">
            <!-- <v-alert text icon="mdi-information" class="mb-6" transition="scale-transition">
            <v-chip>
              {{ $t('dashboard.submissions') }}
            </v-chip>
          </v-alert> -->

            <v-row>
              <!--        <v-chip-group style="display: flex" v-model="mode" column active-class="primary&#45;&#45;text primary">-->
              <!--          <v-chip filter outlined>اصلی</v-chip>-->
              <!--          <v-chip filter outlined>مینی‌گیم</v-chip>-->
              <!--        </v-chip-group>-->
              <v-col cols="12">
                <v-file-input
                    :disabled=" !canSubmitAnotherCode || !profile "
                    v-model="file"
                    v-bind="filedProps"
                    label="فایل"
                    :rules="fileRules"
                    :hint="fileHint"
                    accept="*"
                    show-size
                    persistent-hint
                    append-icon="mdi-paperclip"
                    prepend-icon=""
                    dir="ltr"
                    outlined
                    rounded
                />
              </v-col>
              <v-col>
                <v-select
                    v-model="language"
                    v-bind="filedProps"
                    :items="languageOptions"
                    label="زبان"
                    :rules="requiredRules"
                    required
                    dir="ltr"
                    rounded
                />
              </v-col>
            </v-row>
            <div class="mb-6">
              ارسال کد به‌منزله قبول تمامی
              <a href="https://github.com/SharifAIChallenge/AIC22-Doc/blob/main/4-rules.md" target="_blank">قوانین و شرایط مسابقه</a>
              است
            </div>
            <!--      <v-btn tile block :disabled="false" :loading="loading" type="submit" v-bind="primaryButtonProps">-->
            <!--        <v-icon left>mdi-upload</v-icon>-->
            <!--        ارسال-->
            <!--      </v-btn>-->
            <v-btn
                style="width : 100%"
                :disabled="!file  || !canSubmitAnotherCode || !profile "
                :loading="loading"
                type="submit"
                v-bind="primaryButtonProps"
                rounded
                disabled
            >
              <v-icon left>mdi-upload</v-icon>
              ارسال
            </v-btn>
          </v-form>
        </Box>
      </div>
    </SectionContainer>
  </div>
</template>

<script>
import {requiredRules} from '../../../mixins/formValidations';
import {primaryButtonProps} from '../../../mixins/buttonProps';
import {fieldProps} from '../../../mixins/fieldProps';
import {submitLargeCode} from '../../../api';
import {mapState} from 'vuex';
import SectionContainer from "~/components/SectionContainer";
import Box from "~/components/utilities/Box";
import final from "~/pages/final";

export default {
  components: {SectionContainer, Box},

  mixins: [requiredRules, primaryButtonProps, fieldProps],
  props: ['canSubmitAnotherCode'],
  data() {
    return {
      valid: false,
      file: null,
      language: 'java',
      languageOptions: [
        {text: 'Java', value: 'java'},
        {text: 'Python 3', value: 'python 3'},
        {text: 'Cpp', value: 'cpp'},
      ],
      fileHint: 'zip',
      fileRules: [v => !!v || ''],
      loading: false,
      mode: 0,
      isFinalPayed: false,
    };
  },
  async fetch() {
    let res = await this.$axios.$get('team');
    this.isFinalPayed = res.final_payed;
  },
  computed: {
    ...mapState({
      profile: state => state.auth.user,
    }),
  },
  methods: {
    async uploadCode() {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('language', this.language);
      // formData.append('is_mini_game', this.mode == 1);
      // formData.append('is_mini_game_final', false);
      // formData.append('status' , 'Uploading');
      // formData.append('is_final' , 'false');

      this.loading = true;
      try {
        let data = await submitLargeCode(this.$axios, formData);
        console.log(data)
        if (data.status) {
          if (data.status === 200) {
            this.$toast.success('فایل با موفقیت آپلود شد.');
          }
        }
      } catch (e) {
        if (e.message.includes('400'))
            this.$toast.error(this.$tc('dashboard.codeSubmissionMessage', 5));
        else if (e.message.includes('403'))
          this.$toast.error('ابتدا باید در تیمی عضو شوید');
        else
          this.$toast.error('خطایی در آپلود فایل رخ داد.');
      } finally {
        this.loading = false;
      }

    }
    ,
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';

.primary--text {
  color: white;
}

.primary {
  background-color: #0071E3;
}

</style>
