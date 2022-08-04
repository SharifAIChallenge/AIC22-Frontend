<template>
  <div class="tournaments">
    <v-container class="pa-0 d-flex align-center justify-space-between">

      <p class="headline py-5 ma-0 mr-2">
        تورنومنت ها
      </p>
    </v-container>
    <v-divider/>

    <div class="px-6 px-md-12">
      <div class="gradient">
        asd
      </div>
      <div>
        <v-row>
          <v-col cols="6" md="3" v-for="(list, index) in tournaments" :key="index">
            <TournamentCard name="test" status="pending" id="1"/>

          </v-col>
        </v-row>
      </div>
      <!--      <v-card color="basil">-->
      <!--        &lt;!&ndash; <v-card-title class="text-center justify-center py-6">-->
      <!--          <h1 class="font-weight-bold display-3 basil&#45;&#45;text">-->
      <!--            BASiL-->
      <!--          </h1>-->
      <!--        </v-card-title> &ndash;&gt;-->

      <!--        <v-tabs v-model="tabs" color="primary" grow>-->
      <!--          <v-tab>-->
      <!--            دوستانه-->
      <!--          </v-tab>-->
      <!--          <v-tab>-->
      <!--            سیدبندی-->
      <!--          </v-tab>-->
      <!--        </v-tabs>-->

      <!--        <v-tabs-items v-model="tabs">-->
      <!--          <v-tab-item>-->
      <!--            <v-card color="basil" flat>-->
      <!--              <v-card-text>-->
      <!--                <v-row>-->
      <!--                  <v-col cols="12" sm="6" md="4" xl="3" class="tournament my-4" v-for="tournament in tournaments" :key="tournament.id">-->
      <!--                    <div>-->
      <!--                      <TournamentCard :tournament="tournament"></TournamentCard>-->
      <!--                    </div>-->
      <!--                  </v-col>-->
      <!--                </v-row>-->
      <!--              </v-card-text>-->
      <!--            </v-card>-->
      <!--          </v-tab-item>-->
      <!--          <v-tab-item>-->
      <!--            <v-card color="basil" flat>-->
      <!--              <v-card-text>-->
      <!--                <v-row v-if="finalTournaments.length">-->
      <!--                  <v-col cols="12" sm="6" md="4" xl="3" class="tournament my-4" v-for="tournament in finalTournaments" :key="tournament.id">-->
      <!--                    <div>-->
      <!--                      <TournamentCard :tournament="tournament"></TournamentCard>-->
      <!--                    </div>-->
      <!--                  </v-col>-->
      <!--                </v-row>-->
      <!--                <div v-else>-->
      <!--                  <div class="d-flex justify-center py-15">-->
      <!--                    <h3>-->
      <!--                      اوپس! تورنمنتی یافت نشد-->
      <!--                    </h3>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </v-card-text>-->
      <!--            </v-card>-->
      <!--          </v-tab-item>-->
      <!--        </v-tabs-items>-->
      <!--      </v-card>-->
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import TournamentHeader from '~/components/dashboard/tournaments/TournamentHeader';
import TournamentCard from '~/components/dashboard/tournaments/TournamentCard';

export default {
  components: {SectionHeader, SectionContainer, TournamentHeader, TournamentCard},
  layout: 'dashboard',
  transition: 'fade-transition',
  async asyncData({ $axios }) {
    let res = await $axios.get('challenge/tournament');
    let data = res.data;
    let tournaments = data.filter(t => t.type !== 'final');
    let finalTournaments = data.filter(t => t.type === 'final');

    // res = await $axios.get('challenge/tournament/next');
    // let header = res.data.data;
    // console.log(res.data.data);
    return { tournaments, finalTournaments };
  },
  data() {
    return {
      tabs: null,
      header: {},
      tournaments: [],
      finalTournaments: [],
    };
  },
};
</script>
<style lang="scss">
.gradient {
  position: relative;
}

.gradient::before {
  position: absolute;
  content: "";

  z-index: -1;
  height: 104%;
  width: 104%;
  border-radius: 50%;
  //position: absolute;
  margin: auto;
  -webkit-animation: logo 5s linear infinite;
  -moz-animation: logo 5s linear infinite;
  animation: logo 5s linear infinite;
  //transform: scale(0.85);
  filter: blur(20px);
  background-image: linear-gradient(
          0, #FC147F, #480AC2, #E08250, #3AE4F6);
  opacity: 1;
}
</style>
