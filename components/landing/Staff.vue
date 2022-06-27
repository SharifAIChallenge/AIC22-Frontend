<template>
  <v-container>

    <div>
      <div class="our-team">
        <TitleContainer title="تیم های ما"/>
        <div class="our-team__names">
          <div v-for="menu in staffMenu" :id="menu.id" v-bind:key="staffMenu.id"
               v-bind:class="{'clicked': clickedStaffMenuId === menu.id }" @click="updateTeam($event)">
            {{ menu.title }}
          </div>
        </div>
        <div class="our-team__cards">
          <StaffCard v-for="staff in staffs" :staff="staff"></StaffCard>
        </div>
        <v-btn color="primary" to="staffs" class="px-6 mx-2 v-btn--primary" style="width: 186px">
          دیدن همه اعضا
        </v-btn>
      </div>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>

</template>

<script>
import StaffCard from "~/components/landing/StaffCard";
import TitleContainer from '~/components/TitleContainer';

export default {
  name: "Staff",
  components: {TitleContainer, StaffCard},
  async fetch() {
    await this.$axios.get('staffs/groups/')
        .then(resp => this.staffMenu = resp.data).catch(err => console.log(err))
    await this.$axios.get('staffs/random/4/')
        .then(resp => this.staffs = resp.data).catch(err => console.log(err))
  },
  data() {
    return {
      overlay: false,
      clickedStaffMenuId: 0,
      staffMenu: [],
      staffs: [],
    };
  },
  methods: {
    async updateTeam(event) {
      this.overlay = true;

      this.clickedStaffMenuId = parseInt(event.target.id);
      await this.$axios
          .get(`staffs/random/4/?team__group=${this.clickedStaffMenuId}`)
          .then(resp => (this.staffs = resp.data))
          .catch(err => console.log(err));
      this.overlay = false;

    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins';

.our-team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__header {
    font-weight: bold;
    font-size: 5rem;
    margin: 30px 0;
  }

  &__names {
    display: flex;
    background-color: #1F2F43;
    border: solid 2px #2A3D53;
    border-radius: 30px;
    padding: 10px 20px;
    overflow-x: auto;
    font-size: 1.2rem;
    @include not-md {
      font-size: 2vw;
    }
    @include not-sm {
      max-font-size: 1.2rem;
      font-size: 4vw;
    }
    max-width: 90vw;

    .clicked {
      background-color: var(--v-primary-base);
      border-radius: 30px;
      cursor: pointer;
    }

    div {
      margin: 0 5px;
      padding: 10px 30px;

      &:hover {
        background-color: var(--v-primary-base);
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @include not-md {
      grid-template-columns: 1fr 1fr;
    }
    @include not-sm {
      grid-template-columns: 1fr;
    }
    grid-gap: 40px;

    margin: 50px auto;
  }
}
</style>
