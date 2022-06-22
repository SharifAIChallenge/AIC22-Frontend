<template>
<div>
  <div style="margin-top:6rem;">
    <title-container title="حامی مالی"></title-container>

    <div class="d-flex flex-row flex-wrap">
      <div class="align-center justify-center text-center col-md-6 col-sm-12 col-lg-6">
        <img class="mt-10" src="../../assets/images/logo/logo-sefid-aic.png" alt="img" width="240" height="60"/>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-6">
        <div>
          ازکی یه شرکت بیمه نیست بلکه یه واسطه ست که مثل یه دوست اگاه و دانا و معتمد، به مردم کمک میکنه بهترین انتخاب
          بیمه ای خودشون رو داشته باشن و اما در اینده تبدیل میشه به یه دوست باحال و خفن که کمک میکنه مردم بهترین انتخاب
          رو در زمینه های مختلف هم داشته باشن.
          یه سری باور هم داریم که همیشه به اون‌ها پایبندیم:
          کار نشد نداره و ما به هرهدفی که بخوایم با تلاش می‌تونیم برسیم.
          در هر شرایطی از هم حمایت می‌کنیم.
          ما یک تیم پرانرژی هستیم و شادی یکی از بارزترین خصوصیت‌های ماست.
          ما با هم پیشرفت می‌کنیم و به پیشرفت همدیگه کمک می‌کنیم.
        </div>
      </div>
    </div>
  </div>
  <div class="mb-8">
    <TitleContainer title="فرصت های شغلی"></TitleContainer>
    <div v-for="post in posts">
      <OpenPositionCard :title="post.title" :link="post.link"></OpenPositionCard>
    </div>
  </div>
</div>
</template>

<script>
import TitleContainer from "~/components/TitleContainer";
import OpenPositionCard from "~/components/utilities/OpenPositionCard";
export default {
  name: "azki",
  components: {OpenPositionCard, TitleContainer},
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

<style scoped>

</style>