<template>
    <div>
        <TitleContainer title="فرصت های شغلی"></TitleContainer>
        <v-container>
            <v-row>
                <v-col cols="12" md="6" v-for="post in posts" :key="post.link">
                    <open-position-card :title="post.title" :link="post.link" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TitleContainer from "~/components/TitleContainer";
import OpenPositionCard from "~/components/utilities/OpenPositionCard";
import Sponsor from "~/components/landing/Sponsor.vue";

export default {
name : 'AzkiOpenPosition',
components: { OpenPositionCard, TitleContainer, Sponsor },
  data(){
    return{
      posts:[
        {
          title: "Data Engineer",
          link: "https://jobs.azki.com/jobs/52d067"
        },
          {
          title: "Senior QA Software Testing Specialist",
          link: "https://jobs.azki.com/jobs/251c3c"
        },
          {
          title: "Senior UI/UX Designer",
          link: "https://jobs.azki.com/jobs/e44c08"
        },
          {
          title: "QA Team Lead",
          link: "https://jobs.azki.com/jobs/008cf5"
        },
          {
          title: "UX Researcher",
          link: "https://jobs.azki.com/jobs/e84443"
        },
          {
          title: "UX Writer",
          link: "https://jobs.azki.com/jobs/a379ee"
        },
          {
          title: "Senior Data Analyst",
          link: "https://jobs.azki.com/jobs/5d450c"
        },
        {
          title: "Product Manager",
          link: "https://jobs.azki.com/jobs/5cea4f"
        },
        {
          title: "Senior Java Developer",
          link: "https://jobs.azki.com/jobs/7ac3ca"
        },
        {
          title: "Senior PHP Developer",
          link: "https://jobs.azki.com/jobs/7ade90"
        },
      ]
    }
  }
    
}
</script>
<style lang="scss" scoped>

</style>