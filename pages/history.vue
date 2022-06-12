<template>
  <div class='history'>
    <Header color='transparent' />
    <div class='wrapper '>
<!--      <v-img-->
<!--        lazy-src='~/assets/images/history/history_curve.png'-->
<!--        max-height='150'-->
<!--        max-width='250'-->
<!--        src='~/assets/images/history/history_curve.png'-->
<!--        alt=''-->
<!--        aspect-ratio='1'-->
<!--        style='position:absolute;'-->
<!--      />-->
      <div style=''>
      <img src='~/assets/images/history/history_curve.png'
           alt=''
           style='margin-top:auto;position:absolute;bottom: 87px !important;'/>
      </div>
      <v-container
        class='pb-10 ml-11 justify-center align-center text-center align-content-center'
        style='
      position:relative;
      opacity:0.8;
      border-radius:10px;
      top:100px'>

        <div
          class='d-flex justify-center '
          style='
          position: absolute;
          bottom: 30px;
          z-index: 10;
          width:100%;
          '
        >
<!--          <div-->
<!--            class='white d-inline-block '-->
<!--            style='width: 44%;-->
<!--                   height: 3px;-->
<!--                   position: absolute;-->
<!--                   right: 28%;-->
<!--                   margin-top: 4px;-->
<!--                   z-index: -1;'-->
<!--          ></div>-->
<!--          <div-->
<!--            class='d-inline-block px-5'-->
<!--            v-for='(year, index) in years'-->
<!--            :key='index'-->
<!--            :class="index == model ? 'font-weight-black' : ''"-->
<!--            @click='model = index'-->
<!--            style='cursor:pointer'-->
<!--          >-->
<!--            <div-->
<!--              class='white mx-auto'-->
<!--              :style="index == model ? 'height:13px;width:13px;margin-bottom:17px' : 'height:10px;width:10px;margin-bottom:20px'"-->
<!--              style='border-radius:50%'-->
<!--            ></div>-->
<!--            <span :style="index == model ? '' : 'opacity:0.6'">-->
<!--&lt;!&ndash;              {{ year }}&ndash;&gt;-->
<!--            </span>-->
<!--          </div>-->
        </div>
        <v-carousel
          hide-delimiter-background
          :cycle='false'
          :continuous='false'
          :show-arrows='false'
          v-model='model'
          height='100%'
          style='background:transparent'
          class='carousel'
        >
          <v-carousel-item v-for='(history, index) in histories' :key='index' >
            <v-sheet height='100%' tile>
              <v-row class='pb-8' style='background:#182636;border-radius:20px;border:1px' >
                <v-col cols='6' md='4'>
                  <div class='image-year'>
                    {{ history.description_en }}
                  </div>
                </v-col>
                <v-col cols='2' md='auto' class='mr-auto ml-5'>
                    <img src=history.image class='pt-5'  alt='' style='padding-top:4%;'>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>

    </div>
  </div>
</template>

<script>
import { PastAi } from '~/api/index';
import Header from '~/components/landing/Header.vue';
import TitleContainer from "~/components/TitleContainer";


let histories;
let years;
let images;
let description;
export default {
  name: 'history',
  components: { Header },
  data: () =>({
    histories,
    years,
    images,
    description
  }),
  async fetch() {
    let pastAic = await this.$axios.get('pastaics/')
        .then(resp=> this.pastAic = resp.data).catch(err=>console.log(err))
    console.log("past aic",pastAic)
    let histories = pastAic.sort((a, b) => a.event_year - b.event_year);

    let years = histories.map(el => {
      return el.event_year;
    })
    let images = histories.map(el=>{
      return el.image;
    })
    let description = histories.map(el=>{
      return el.description;
    })
    console.log("histo------>",histories)
    return {
      histories,
      years,
      images,
      description
    };
  },
  mounted() {
    console.log(this.pastAic)
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
