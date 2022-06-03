<template>
  <div>
    <SectionContainer>
      <v-form ref="editProfile" onSubmit="return false;" @submit="signUp">
        <div class="resume-file">
          <div>
            <v-icon size="112">mdi-file-plus-outline</v-icon>
          </div>
        </div>
        <div class="d-flex mt-8">
          <div style="flex: 0 1 93px; margin-left: 24px">
            <v-btn block color="black" style="flex-basis: 20%" @click="resetForm">لغو</v-btn>
          </div>
          <div style="flex: 1">
            <v-btn block :loading="loading" type="submit" color="primary" style="flex-basis: 75%">
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
import { emailRules, requiredRules } from '../../../mixins/formValidations';
import { fieldProps } from '../../../mixins/fieldProps';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  mixins: [requiredRules, emailRules, fieldProps],
  components: { SectionHeader, SectionContainer },
  data() {
    return {};
  },

  props: {
    information: Object,
    disable: Boolean,
    loading: Boolean,
    signUp: Function,
    deleteResume: Function,
    deleteImage: Function,
    resetForm: Function,
  },
  methods: {},
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
.resume-file{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  div{
    background-color: #13202E;
    border-radius: 9999px;
    padding: 2rem 2.3rem;
  }
}
</style>
