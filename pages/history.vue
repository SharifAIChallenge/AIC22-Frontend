<template>
  <div class='history'>
    <TitleContainer title="تاریخچه" style="margin-top: 5rem;"/>
    <!--    <Header color='transparent'/>-->
    <!--    <div class='wrapper '>-->
    <!--      <img src='~/assets/images/history/history_curve.png'-->
    <!--           alt=''-->
    <!--           style='margin-top:auto;position:absolute;bottom: 87px !important;'/>-->
    <!--      </div>-->
    <v-container>
      <v-carousel
          hide-delimiter-background
          :cycle='false'
          :continuous='false'
          :show-arrows='false'
          height='100%'
          style='background:transparent'
          class='carousel mb-10 mt-3 '
      >
        <v-carousel-item v-for='history in histories'>
          <v-sheet height='100%' tile>
            <v-row class='pb-8' style='background:#182636;border-radius:20px;border:1px'>
              <v-col cols='6' md='4'>
                <div class='image-year'>
                  {{ history.description_fa }}
                </div>
              </v-col>
              <v-col cols='2' md='auto' class='mr-auto ml-5'>
                <img :src=history.image_url class='pt-5' alt='' style='padding-top:4%;'>
              </v-col>
            </v-row>
          </v-sheet>
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

<style lang='scss'>
@import '../assets/style.scss';

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

li {
  margin: 10px;
}
</style>
