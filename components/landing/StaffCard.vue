<template>
  <div>
    <div class="card mt-14">
      <!--      <img class="card__avatar" src="~/assets/images/avatar-sample.svg"  width="150" height="150" alt="staff avatar">-->
      <v-img :src="staff.image" class="card__avatar" lazy-src="/_nuxt/f8ea7db09a6600d23e2c20104c4d8389.svg"
             alt="staff avatar">
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
              style="background: rgba(80,80,80,0.57)">
            <v-progress-circular
                indeterminate
                color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div class="card__name text-center">{{ staff.first_name_fa }} {{ staff.last_name_fa }}</div>
      <div class="card__position">{{ staff.role }}</div>
      <div class="card__social-icons mt-4">
        <a :href="staff.url">
          <v-icon v-if="staff.linkedin_url" class="icon"> mdi-linkedin</v-icon>
        </a>
        <!--        <a :href="staff.at"><v-icon class="icon"> mdi-at</v-icon></a>-->
        <a v-if="staff.github.url" :href="staff.github_url"><v-icon class="icon"> mdi-github</v-icon></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaffCard",
  props: ['staff'],

}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 3px #2A415B;
  border-radius: 10px;
  width: 240px;
  height: 240px;

  &:hover {
    background-color: #2A3D53;
  }

  &__name {
    //width: 190px;
    //overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  &__avatar {
    transform: translateY(-70px);
    border-radius: 10px;
    object-fit: cover;
    width: 150PX;
    height: 150PX;
  }

  &__name {
    transform: translateY(-40px);
  }

  &__social-icons, &__position {
    transform: translateY(-30px);
  }

  &__social-icons {
    a {

    }

    .icon {
      &:hover {
        cursor: pointer;
        color: var(--v-primary-base);
      }
    }

  }
}
</style>
