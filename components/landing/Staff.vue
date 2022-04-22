<template>
  <div>
    <div class="our-team">
      <div class="our-team__header">تیم ما</div>
      <div class="our-team__names">
        <div v-for="menu in staffMenu" :id="menu.id" v-bind:key="staffMenu.id"
             v-bind:class="{'clicked': clickedStaffMenuId == menu.id }" @click="clickMenu($event)">
          {{ menu.name }}
        </div>
      </div>
      <div class="our-team__cards">
        <StaffCard v-for="staff in staffs" :staff="staff"></StaffCard>
      </div>
    </div>
  </div>
</template>

<script>
import StaffCard from "~/components/landing/StaffCard";

export default {
  name: "Staff",
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
        }
      ],
    };
  },
  methods: {
    clickMenu(event) {
      this.clickedStaffMenuId = event.target.id
      console.log(event)
    }
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
