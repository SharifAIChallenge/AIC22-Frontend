<template>
  <div>
    <div class="card mt-14">
      <img class="card__avatar" :src="staff.image" width="150" height="150" alt="staff avatar">
      <div class="card__name">{{staff.first_name_fa}} {{staff.last_name_fa}}</div>
      <div class="card__position">{{staff.role}}</div>
      <div class="card__social-icons mt-4">
        <a :href="staff.url"><v-icon class="icon"> mdi-linkedin</v-icon></a>
<!--        <a :href="staff.at"><v-icon class="icon"> mdi-at</v-icon></a>-->
<!--        <a :href="staff.github"><v-icon class="icon"> mdi-github</v-icon></a>-->
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

  &:hover{
    background-color: #2A3D53;
  }

  &__name {
    width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  &__avatar {
    transform: translateY(-70px);
  }

  &__name {
    transform: translateY(-40px);
  }

  &__social-icons, &__position {
    transform: translateY(-30px);
  }
  &__social-icons{
    a{

    }
    .icon{
      &:hover{
        cursor: pointer;
        color: var(--v-primary-base);
      }
    }

  }
}
</style>