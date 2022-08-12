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
                {{ this.last.name }}
              </h2>
              <p class="grey--text mt-2">
                {{

                  getTimeText(this.last.start_time)
                }}

              </p>
            </div>
            <div
                v-if="!isAfterNow(last.start_time)"
                class="d-flex align-center justify-center">
              <div class="countdown-item">
                <p class="value">
                  {{ last.seconds >= 0 ? last.seconds : 0 }}
                </p>
                <p class="note">
                  ثانیه
                </p>
              </div>
              <div class="countdown-item  mr-2">
                <p class="value">
                  {{ this.last.minutes >= 0 ? this.last.minutes : 0 }}
                </p>
                <p class="note">
                  دقیقه
                </p>
              </div>
              <div class="countdown-item mx-2">
                <p class="value">
                  {{ this.last.hours >= 0 ? this.last.hours : 0 }}
                </p>
                <p class="note">
                  ساعت
                </p>
              </div>
              <div class="countdown-item">
                <p class="value">
                  {{ last.days >= 0 ? last.days : 0 }}
                </p>
                <p class="note">
                  روز
                </p>
              </div>
            </div>
            <div v-else class="d-flex align-center justify-center">
              <div class="countdown-item">
                <p class="value">
            0
                </p>
                <p class="note">
                  ثانیه
                </p>
              </div>
              <div class="countdown-item  mr-2">
                <p class="value">
                  0
                </p>
                <p class="note">
                  دقیقه
                </p>
              </div>
              <div class="countdown-item mx-2">
                <p class="value">
                  0
                </p>
                <p class="note">
                  ساعت
                </p>
              </div>
              <div class="countdown-item">
                <p class="value">
                 0
                </p>
                <p class="note">
                  روز
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <v-simple-table v-if="tournaments && tournaments.length > 0">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-right">
                نام
              </th>
              <th class="text-right">
                تاریخ شروع
              </th>
              <th class="text-center">
                تعداد شرکت کننده
              </th>
              <th class="text-center">
                وضعیت
              </th>
              <th class="text-center">
                وضعیت عضویت
              </th>
              <th class="text-center">
               مشاهده نتایج
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(tournament, index) in tournaments"
                :key="index"
            >
              <td>{{ tournament.name }}</td>
              <td>{{ getTimeText(tournament.start_time) }}</td>
              <td class="text-center">{{ tournament.participants }}</td>
              <td class="text-center">
                <span
                    color="primary"
                    v-if="isAfterNow(tournament.start_time)"
                >
                  <v-icon class="ml-2">mdi-clock-time-four-outline</v-icon>
                  شروع نشده
                </span>

                <span
                    color="secondary"
                    v-else
                >
                  <v-icon class="ml-2">mdi-close</v-icon>
                  به اتمام رسید
                </span>
              </td>

              <td class="text-center">
                <span
                    color="success"
                    v-if="tournament.is_member"
                >
                  عضو هستید
                </span>

                <span
                    v-else
                >
                  عضو نیستید
                </span>
              </td>
              <td class="text-center">
                  <v-chip block rounded color="primary"
                         :to="`/dashboard/scoreboard?id=${tournament.id}`"
                  >مشاهده نتایج</v-chip>

              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-else class="mb-10 px-md-12">
          لیست تورنومنت ها خالی است
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import TournamentHeader from '~/components/dashboard/tournaments/TournamentHeader';
import TournamentCard from '~/components/dashboard/tournaments/TournamentCard';
import moment from "moment";
import 'moment/locale/fa'

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
      console.log(window.location.href);
      if (this.last.start_time) {
        console.log('set inter');
        this.inter = setInterval(() => {
          var current = moment().tz('Asia/Tehran');
          var end = moment(this.last.start_time).tz('Asia/Tehran');
          var duration = moment.duration(end.diff(current));
          var seconds = duration.asSeconds();
          this.last.seconds = Math.ceil(seconds);
          this.last.days = Math.ceil(Math.floor(seconds / 86400));
          this.last.hours = Math.ceil(Math.floor((seconds - this.last.days * 86400) / 3600));
          this.last.minutes = Math.ceil(Math.floor((seconds - this.last.days * 86400 - this.last.hours * 3600) / 60));
          this.last.seconds = Math.ceil(seconds - this.last.days * 86400 - this.last.hours * 3600 - this.last.minutes * 60);

          this.$forceUpdate()
        }, 1000);
      }
    }
  },
  unmounted() {
    clearInterval(this.inter);
  },
  data() {
    return {
      tabs: null,
      header: {},
      last: {},
      tournaments: [],
      finalTournaments: [],
      inter: 0,
    };
  },
  methods: {
    getTimeText(time) {
      return moment(time).locale('fa').fromNow();
    },
    getCurrentDateTime(){
      return moment().tz('Asia/Tehran')
    },
    getDateTime(tm){
      return moment(tm).tz('Asia/Tehran')
    },
    isAfterNow(tm){
      return moment(tm).tz('Asia/Tehran').isAfter(moment().tz('Asia/Tehran'))
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
  .soon-box {
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
