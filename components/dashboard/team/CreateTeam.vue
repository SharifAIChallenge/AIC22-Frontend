<template>
  <div>
    <!-- <SectionHeader title="ساختن تیم" icon="mdi-account-multiple-plus-outline" /> -->
    <Section-container>
      <div class="d-flex flex-column justify-content-between">
        <div class="text-center create-team-notice">
          پس از آنکه همه اعضا ثبت نام کردند کافی است یک نفر تیم بسازد و باقی اعضا را به تیم دعوت کند.
        </div>


        <Box class="create-team-form mt-10 py-2 px-4 d-flex flex-column justify-content-center">
          <div class="fileInput rounded-circle mb-4">
            <v-file-input
                ref="file"
                hide-input
                :label="$t('form.file')"
                show-size
                prepend-icon="mdi-image-plus"
                v-model="image"
            >
            </v-file-input>
          </div>
          <v-text-field class="create-team-form-input" v-model="name" outlined rounded label="نام تیم"></v-text-field>
          <v-btn :loading="loading" class="v-btn--primary" @click="submitTeam()">ساخت تیم</v-btn>
        </Box>

      </div>
    </Section-container>
  </div>
</template>
<script>
import SectionContainer from '~/components/SectionContainer.vue';
import SectionHeader from '~/components/SectionHeader';
import Box from '~/components/utilities/Box.vue';

export default {
  props: ['toggleHaveTeam'],
  components: {SectionHeader, SectionContainer, Box},

  data() {
    return {
      name: '',
      image: null,
      loading: false,
    };
  },
  methods: {
    submitTeam() {
      if (!this.name) {
        this.$toast.error('اسم تیم نمی‌تواند خالی باشد');
        return;
      }
      const formData = new FormData();
      formData.append('name', this.name);
      if (this.image != null) {
        formData.append('image', this.image);
      }
      this.loading = true;
      this.$axios.$post('team/', formData, {headers: {'content-type': 'multipart/form-data'}}).then(res => {
        this.loading = false;
        console.log(res);
        if (res.status_code === 200 || 201) {
          this.$toast.success('تیم شما با موفقیت ساخته‌شد');
          this.toggleHaveTeam();
        } else if (res.status_code === 400) {
          this.$toast.error('تیمی با این نام وجود دارد.');
          this.forfiet();
        } else {
          //TODO: check other errors and status code
          this.$toast.error('ساخت تیم با خطا مواجه شد');
          this.forfiet();
        }
      });
    },
    forfiet() {
      this.name = '';
      this.image = null;
    },
    getImage() {
      // console.log(this.$refs.file);
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss">
.team {
  margin: 0 !important;
}

.create-team-notice {
  max-width: 50%;
  margin: auto;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.25rem dashed;
}

.create-team-form {
  width: 50%;
  margin: auto;
}

.v-input {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .v-input__prepend-outer {
    margin: 0;
    width: 100%;
    height: 100%;

    .v-input__icon {
      width: 100%;
      height: 100%;

      button {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.fileInput {
  margin: auto;
  width: 16rem;
  height: 16rem;
  border: .2rem dashed #1f2f42;
  background-color: var(--v-bg-base);
}

</style>
