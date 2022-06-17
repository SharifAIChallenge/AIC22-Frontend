<template>
  <v-container class="main">
    <div>
      <img class="bg--img" style="right: -100px;top: -100px;" width="600" src="../assets/images/curve0.svg">
      <img class="bg--img" style="left: -100px;bottom: -100px;" width="400" src="../assets/images/curve0.svg">
      <div class="our-team">
        <div class="our-team__header">تیم ما</div>
        <div class="our-team__names">
          <div v-for="menu in staffMenu" :id="menu.id" v-bind:key="staffMenu.id"
               v-bind:class="{'clicked': clickedStaffMenuId == menu.id }" @click="clickMenu($event)">
            {{ menu.name }}
          </div>
        </div>
        <div class="mt-8 our-team__subNames">
          <div v-for="subMenu in staffSubTeams" :id="subMenu.id" v-bind:key="staffSubTeams.id"
               v-if="clickedStaffMenuId == subMenu.teamID">
            {{ subMenu.name }}
          </div>
        </div>
        <div class="our-team__cards">
          <StaffCard v-for="staff in staffs" :staff="staff"></StaffCard>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import StaffCard from "~/components/landing/StaffCard";

export default {
  auth: false,
  name: "staffs",
  components: {StaffCard},
  data() {
    return {
      clickedStaffMenuId: 1,
      staffMenu: [
        {
          id: 1,
          name: 'تیم برندینگ'
        }, {
          id: 2,
          name: 'تیم محتوا'
        }, {
          id: 3,
          name: 'تیم منابع انسانی'
        }, {
          id: 4,
          name: 'تیم طراحی'
        },
      ],
      staffSubTeams: [
        {
          id: 1,
          teamID: 1,
          name: 'زیرتیم 1'
        }, {
          id: 2,
          teamID: 1,
          name: 'زیرتیم 2'
        }, {
          id: 3,
          teamID: 1,
          name: 'زیرتیم 3'
        }, {
          id: 1,
          teamID: 2,
          name: 'زیرتیم 3'
        }, {
          id: 2,
          teamID: 2,
          name: 'زیرتیم3 '
        }, {
          id: 3,
          teamID: 2,
          name: 'زیرتیم 4'
        },
      ],
      staffs: [
        {
          name: 'رویداد هوش مصنوعی شریف',
          position: 'رویداد',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شریف1',
          position: 'رویداد1',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شریف2',
          position: 'رویداد2',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }, {
          name: 'رویداد هوش مصنوعی شری3',
          position: 'رویداد3',
          linkedin: '#',
          at: '#',
          github: '#'
        }
      ],
    };
  },
  methods: {
    clickMenu(event) {
      this.clickedStaffMenuId = event.target.id
    }
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

    div {
      margin: 0 10px;
      border: solid 2px #1F2F43;
      border-radius: 30px;
      padding: 10px 25px;

      &:hover {
        color: var(--v-primary-base);
        border-color: var(--v-primary-base);
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