<template>
  <v-container class="main">
    <div>
      <img class="bg--img" style="right: -100px;top: -100px;" width="600" src="../assets/images/curve0.svg" alt="bg">
      <img class="bg--img" style="left: -100px;bottom: -100px;" width="400" src="../assets/images/curve0.svg" alt="bg">
      <div class="our-team">
        <div class="our-team__header">تیم ما</div>
        <div class="our-team__names">
          <div v-for="menu in staffMenu" :id="menu.id" v-bind:key="staffMenu.id"
               v-bind:class="{'clicked': clickedStaffMenuId === menu.id }" @click="clickMenu($event)">
            {{ menu.title }}
          </div>
        </div>
        <div class="mt-8 our-team__subNames">
<!--          <div v-for="subMenu in staffSubTeams" :id="subMenu.id" v-bind:key="staffSubTeams.id"-->
<!--               v-if="clickedStaffMenuId === subMenu.group"-->
<!--               class="clicked-sub"-->
<!--              >-->
<!--            {{ subMenu.title }}-->
<!--          </div>-->
        </div>
        <div class="our-team__cards">
          <StaffCard v-for="staff in staffs" :staff="staff" v-if="checkStaffPermission(staff.team)"></StaffCard>
        </div>
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
import {StaffGroups, Staffs, StaffTeam} from "~/api";

export default {
  auth: false,
  name: "staffs",
  components: {StaffCard},
  async asyncData({$axios}) {
    let staffMenu = await StaffGroups($axios);
    let staffSubTeams = await StaffTeam($axios, 1);
    let staffs = await Staffs($axios, 1);
    return {
      staffMenu,
      staffSubTeams,
      staffs,
    };
  },
  data() {
    return {
      clickedStaffMenuId: 1,
      sub: [],
      overlay: false,
      selectSubs:[],
    };
  },
  methods: {
    async clickMenu(event) {
      this.overlay = true;
      this.clickedStaffMenuId = parseInt(event.target.id);
      this.staffs = await Staffs(this.$axios, this.clickedStaffMenuId);
      this.staffSubTeams = await StaffTeam(this.$axios, this.clickedStaffMenuId);
      this.overlay = false;
    },
    checkStaffPermission(No) {
      return this.staffSubTeams.filter((x) => {
        return x.id === No;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins';

.main {
  margin-top: 100px;
}

.bg--img {
  position: absolute;
  //filter: blur(2px);

}

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


    .clicked-sub {
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

  &__subNames {
    display: flex;
    overflow-x: auto;
    font-size: 1rem;
    @include not-md {
      font-size: 1.8vw;
    }
    @include not-sm {
      max-font-size: 1rem;
      font-size: 3vw;
    }
    max-width: 90vw;


    .clicked-sub {
      color: var(--v-primary-base);
      border-color: var(--v-primary-base);
      border-radius: 30px;
      cursor: pointer;
    }

    div {
      margin: 0 10px;
      border: solid 2px #1F2F43;
      border-radius: 30px;
      padding: 10px 25px;

      //&:hover {
      //  color: var(--v-primary-base);
      //  border-color: var(--v-primary-base);
      //  cursor: pointer;
      //}
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
