<template>
  <div>
    <SectionHeader title="تیم من" icon="mdi-account-group-outline" />
    <SectionContainer>
      <div class="myTeam">
        <div class="d-flex justify-center ">
          <img class="rounded-circle" :src="team.image" :alt="team.name" />
        </div>
        <div>
          <div>
            <div class="text-h4 mb-4 mt-4">
              {{ team.name }}
              <v-icon color="blue">mdi-check-decagram</v-icon>
            </div>

            <div class="pr-8 pr-md-14">
              <div class="text-h5 my-2" v-for="(member, index) in team.members" :key="index">
                {{ member.profile.firstname_fa }} {{ member.profile.lastname_fa }}
              </div>
            </div>
          </div>
        </div>
<!--        <Payment :payed="team.final_payed || isPayed" />-->
        <div class="mt-4 mt-md-12">
          <v-btn block :loading="loading" color="black" class="text-h6" @click="getOutFromTeam()">
            <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-exit-run</v-icon>
            ترک تیم
          </v-btn>
        </div>
      </div>
    </SectionContainer>
<!--    <section-container>-->
<!--      <div class="d-flex flex-column justify-content-between text-center">-->
<!--        <div>-->
<!--          <img class="rounded-circle" :src="team.image" :alt="team.name" height="120" width="120"/>-->
<!--        </div>-->
<!--        <div class="team-container">-->
<!--          <h1>{{ team.name }}</h1>-->
<!--          <div v-for="member in team.members" :key="member" class="w-full text-right">-->
<!--            {{ member.profile.firstname_fa }} {{ member.profile.lastname_fa }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section-container>-->
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import Payment from './Payment';

export default {
  props: ['toggleHaveTeam', 'isPayed'],
  components: { SectionHeader, SectionContainer, Payment },
  async fetch() {
    let res = await this.$axios.$get('team');
    res.image = "https://"+res.image_url;
    console.log(res.image)
    this.team = res;
  },
  data() {
    return {
      team: {},
      loading: false,
    };
  },
  methods: {
    getOutFromTeam() {
      this.loading = true;
      // this.$axios.$delete('team/').then(res => {
      //   console.log(res)
      //   this.loading = false;
      //   if (res.status_code === 200) {
      //     this.$toast.success('شما با موفقیت از تیم خارج شدید!');
      //     this.toggleHaveTeam();
      //   } else {
      //     this.$toast.error('خروج با مشکل مواجه شد!');
      //   }
      // });
      let res = this.$axios.$delete('team/').then( () => console.log(res))
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';
.team-container{
  background-color: var(--v-bg-base) !important;
  border-radius: 3rem;
}
.myTeam {
  img {
    max-width: 100%;
    @include v-md {
      max-width: 250px;
      margin: 0px auto 10px;
    }
  }
}
</style>
