<template>
  <div class='history'>
    <TitleContainer title="تاریخچه" style="margin-top: 5rem;"/>
    <v-container style="border-radius: 2rem !important;">
      <v-carousel
          hide-delimiter-background
          :cycle='false'
          :continuous='false'
          :show-arrows='false'
          height='600px'
          style='background:transparent'
          class='carousel mb-10 mt-3 '
      >
        <v-carousel-item v-for='history in histories'>
          <v-card class="rounded" height="500px" style="background-color:#182636 ">
            <v-row class='pb-8' style='background:#182636;border-radius:20px;border:1px; height: 100%'>
              <v-col cols='12' md='7'>
                <div class="event_year">
                  {{history.event_year}}
                </div>
                <div class='image-year pa-10 text-justify'>
                  {{ history.description_fa }}
                </div>
              </v-col>
              <v-col class="d-flex justify-center align-center" cols='12' md='5'>
                <img :src=history.image_url class='mt-5 img pa-2 pl-4' :alt='history.evet_year' style='height: auto;max-width: 100%;'>
              </v-col>
            </v-row>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>

  </div>
</template>

<script>

import Header from '~/components/landing/Header.vue';
import TitleContainer from "~/components/TitleContainer";


export default {
  name: 'history',
  components: {TitleContainer, Header},
  data() {
    return {
      histories: []
    }
  },
  mounted() {
    this.$axios.$get('pastaics/').then(res => {
      this.histories = res
    })
  }
};


</script>

<style lang='scss' scoped>
@import '../assets/style.scss';
.img{
  object-fit: cover;
  //height: 400px;
}
.history {
  min-height: 100vh;

  #header {
    height: 110px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    // height: 100vh;
    .carousel {
      position: relative;
      padding-bottom: 100px;

      .v-window__prev,
      .v-window__next {
        z-index: 100;
        top: calc(100% + 57px);
        //@include not-md {
        //  margin: 0;
        //  button {
        //    padding: 0;
        //    font-size: 12px;
        //  }
        //}
      }
    }

    .v-item-group button {
      //@include not-md {
      //  margin: 2px !important;
      //}
    }
  }
}

.image-year {
  display: flex;
  max-width: 100%;
  align-items: center;
  height: 100%;
}

.history-title-fixed {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.history-team {
  margin-top: 10px;
  margin-bottom: 20px;
}

.event_year{
    position: absolute;
    font-size: 5rem;
    bottom: 24rem;
    left: 60rem;
    color: #0ac6ff;
    opacity: 0.3;
}

li {
  margin: 10px;
}
</style>
