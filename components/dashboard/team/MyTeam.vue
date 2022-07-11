<template>
  <div>
    <SectionContainer>
      <div class="my-team pt-8">
        <Box class="team-card mt-16 px-4 d-flex flex-column justify-content-center">
          <div class="team-card__header px-4">
            <div class="team-card__picture">
              <img
                v-if="this.team.image"
                :src="this.form.imageUrl ? this.form.imageUrl : this.team.image_url"
                class="rounded-circle"
                alt="team profile image"
                width="150"
                height="150"
              />
              <img v-else class="rounded-circle" src="~/assets/images/avatar-sample.svg" alt="default team profile image" />
            </div>
            <div v-if="!isEditing" class="team-card__edit">
              <v-icon right class="team-card__edit__icon" color="rgba(255, 255, 255, 0.12)" @click="toggleIsEditing">
                mdi-pencil
              </v-icon>
            </div>
          </div>
          <div v-if="!isEditing" class="team-card__content">
            <div class="team-card__name">
              <p class="headline py-5 ma-0">
                {{ this.team.name }}
              </p>
            </div>
            <v-list class="team-card__members inherit-bg-color">
              <v-list-item class="team-card__member inherit-bg-color" v-for="(member, i) in this.team.members" :key="i">
                <div class="team-card__member__content inherit-bg-color">
                  <v-list-item-title
                    class="team-card__member__name inherit-bg-color"
                    v-text="member.profile.firstname_fa + ' ' + member.profile.lastname_fa"
                  />
<!--                  <v-list-item-icon class="team-card__member__icon inherit-bg-color">-->
<!--                    <v-icon color="rgba(255, 255, 255, 0.12)">mdi-account-box</v-icon>-->
<!--                  </v-list-item-icon>-->
                </div>
              </v-list-item>
<!--              <v-list-item class="team-card__add-member" v-if="this.team.members.length < 3" dense>-->
<!--                <div class="team-card__add-member__content inherit-bg-color">-->
<!--                  <v-list-item-title class="team-card__add-member__name inherit-bg-color">افزودن عضو جدید</v-list-item-title>-->
<!--                  <v-list-item-icon class="team-card__add-member__icon inherit-bg-color">-->
<!--                    <v-icon color="#20c9b2">mdi-plus</v-icon>-->
<!--                  </v-list-item-icon>-->
<!--                </div>-->
<!--              </v-list-item>-->
            </v-list>
            <div class="team-card__leave mt-6">
              <v-btn block color="secondary" class="my-4" @click="leaveTeam" rounded>ترک تیم</v-btn>
            </div>
          </div>
          <div v-else class="team-edit">
            <div class="team-edit__profile">
              <v-file-input
                :rules="pictureRules"
                class="team-edit__profile__input mt-4"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="تصویر جدید"
                prepend-icon="mdi-image-plus"
                label="افزودن تصویر جدید"
                v-on:change="onPictureChange"
                hide-input
              ></v-file-input>
            </div>
            <v-form ref="editTeamName" v-model="valid" onSubmit="return false;" @submit="updateTeamName">
              <v-text-field
                v-model="form.name"
                label="نام جدید تیم"
                required
                :rules="requiredRules"
                class="team-edit__name__field my-5"
                outlined
                rounded
                dense
              />
              <div>
                <v-btn block color="primary" type="submit" :disabled="!valid" rounded>
                  ویرایش نام تیم
                </v-btn>
              </div>
              <div>
                <v-btn block color="secondary" class="my-4" @click="resetTeamNameForm" rounded>بازگشت</v-btn>
              </div>
            </v-form>
          </div>
        </Box>
      </div>
    </SectionContainer>
  </div>
</template>
<script>
import SectionContainer from '~/components/SectionContainer';
import Box from '~/components/utilities/Box';
import { requiredRules } from '~/mixins/formValidations';

export default {
  components: { SectionContainer, Box },
  mixins: [requiredRules],
  props: { toggleHaveTeam: Function },
  async fetch() {
    this.team = await this.$axios.$get('team');
  },
  data() {
    return {
      form: {
        name: '',
        imageUrl: '',
        image: null,
      },
      team: {
        members: [],
      },
      imageDisplay: '',
      pictureRules: [value => !value || value.size < 2000000 || 'حجم تصویر باید کمتر از 2 مگابایت باشد'],
      loading: false,
      isEditing: false,
      valid: false,
    };
  },
  methods: {
    onPictureChange(image) {
      // TODO implement uploading the new image
      this.form.imageUrl = URL.createObjectURL(image);
      this.form.image = image;

      const formData = new FormData();
      formData.append('name', this.team.name);
      formData.append('image', this.form.image);

      this.loading = true;

      this.$axios
        .$put('team/', formData, { headers: { 'content-type': 'multipart/form-data' } })
        .then(response => {
          this.loading = false;
          this.team = response;
          this.$toast.success('عکس جدید ذخیره شد!');
          this.toggleIsEditing();
        })
        .catch(error => {
          this.loading = false;
          this.form.image = null;
          this.form.imageUrl = '';
          this.$toast.error('تغییر عکس با مشکل روبه‌رو شد!');
          this.toggleIsEditing();
        });
    },
    leaveTeam() {
      this.loading = true;
      this.$axios
        .$delete('team')
        .then(res => {
          this.loading = false;
          this.$toast.success('شما با موفقیت از تیم خارج شدید!');
          this.toggleHaveTeam();
        })
        .catch(error => {
          this.$toast.error('خروج با مشکل مواجه شد!');
        });
    },
    updateTeamName() {
      this.loading = true;
      this.$axios
        .$put('team/', {
          name: this.form.name,
        })
        .then(response => {
          this.loading = false;
          if (response.name === this.form.name) {
            this.team.name = this.form.name;
            this.form.name = '';
            this.$toast.success('نام تیم با موفقیت تغییر کرد!');
          } else this.$toast.error('تغییر نام با مشکل روبه‌رو شد!');
          this.toggleIsEditing();
        })
        .catch(error => {
          this.loading = false;
          this.$toast.error('تغییر نام با مشکل روبه‌رو شد!');
          this.toggleIsEditing();
        });
    },
    resetTeamNameForm() {
      this.isEditing = false;
      this.form.name = '';
    },
    toggleIsEditing() {
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';

.inherit-bg-color {
  background-color: inherit !important;
}

.team-card {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 50%;
  min-width: 240px;
  min-height: 240px;
  margin: auto;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    max-height: 80px;
  }

  &__picture {
    transform: translateY(-60px);
    object-fit: cover;
    width: 150px !important;
    height: 150px !important;
  }

  &__edit {
    transform: translateY(-115px);
    object-fit: cover;
    margin-left: auto;
    width: 36px;
    height: 36px;

    &__icon {
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
  }

  &__name {
  }

  &__members {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
  }

  &__member {
    width: 100%;

    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &__name {
    }

    &__icon {
    }
  }

  &__add-member {
    width: 100%;

    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &__name {
    }

    &__icon {
    }
  }

  &__leave {
    width: 100%;
  }
}

.team-edit {
  &__name {
    &__field {
      height: 36px !important;
    }
  }
}
</style>
