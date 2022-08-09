<template>
  <div class="tournaments">
    <v-container class="pa-0 d-flex align-center justify-space-between ">

      <p class="headline py-5 ma-0 mr-2">
        تورنومنت ها
      </p>
    </v-container>
    <v-divider/>
    <v-container>
      <div class=" my-10">
        <div class="gradient pa-5">
          <div class="pa-5 soon-box justify-space-between">
            <div>
              <h2>
                {{ last.name }}
              </h2>
              <p class="grey--text mt-2">
                {{

                  getTimeText(last.start_time)
                }}

              </p>
            </div>
            <div class="d-flex align-center justify-center">
              <div class="countdown-item">
                <p class="value">
                  {{ last.days >= 0 ? last.days : 0 }}
                </p>
                <p class="note">
                  روز
                </p>
              </div>
              <div class="countdown-item mx-2">
                <p class="value">
                  {{ last.hours >= 0 ? last.hours : 0 }}
                </p>
                <p class="note">
                  ساعت
                </p>
              </div>
              <div class="countdown-item">
                <p class="value">
                  {{ last.minutes >= 0 ? last.minutes : 0 }}
                </p>
                <p class="note">
                  دقیقه
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="(item, index) in tournaments" :key="index">
          <TournamentCard :name="item.name" status="pending" :id="item.id" :start_time="getTimeText(item.start_time)"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import TournamentHeader from '~/components/dashboard/tournaments/TournamentHeader';
import TournamentCard from '~/components/dashboard/tournaments/TournamentCard';
import moment from "moment";

export default {
  components: {SectionHeader, SectionContainer, TournamentHeader, TournamentCard},
  layout: 'dashboard',
  transition: 'fade-transition',
  async asyncData({$axios}) {
    let res = await $axios.get('challenge/tournament');
    let data = res.data;
    let tournaments = data.filter(t => t.type !== 'final');
    let finalTournaments = data.filter(t => t.type === 'final');

    // res = await $axios.get('challenge/tournament/next');
    // let header = res.data.data;
    // console.log(res.data.data);
    let last = tournaments.reduce(function (prev, curr) {
      let timePrev = new Date(curr.start_time);
      let timeCurr = new Date(prev.start_time);
      return (timePrev > timeCurr) ? curr : prev;
    });
    return {tournaments, finalTournaments, last};
  },
  mounted() {
    if (window) {

    }
  },
  data() {
    return {
      tabs: null,
      header: {},
      last: {},
      tournaments: [],
      finalTournaments: [],
    };
  },

  watch: {

    last: {
      handler(value) {
        if (this.last.start_time) {
          setTimeout(() => {
            var now = new Date().getTime();
            var distance = Date.parse(this.last.start_time) - now;
            this.last.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.last.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.last.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          }, 1000);
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    getTimeText(time) {
      return moment(time).lang('fa').calendar();
    }
  }
};
</script>
<style lang="scss">
.gradient {
  box-shadow: inset 0 0 12px 12px #13202E, inset 0 0 3px 2px #13202E;
  background-image: linear-gradient(
          20deg, #FC147F, #480AC2, #E08250, #3AE4F6);
}

.soon-box {
  background-color: #13202E;
  border-radius: 10px;
  display: flex;
}
@media screen and (max-width: 524px) {
  .soon-box{
    display: block !important;
  text-align: center;
  }
}
.countdown-item {
  border: #2a415b solid 2px;
  height: 75px;
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  p.value {
    margin: 0;
    font-size: xx-large;
  }

  p.note {
    margin: 0;
    font-size: x-small;
  }
}
</style>
