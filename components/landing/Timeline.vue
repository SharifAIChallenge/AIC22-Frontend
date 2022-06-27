<template>
  <v-responsive class="overflow-y-auto" style="margin-bottom: 120px">
    <TitleContainer :title="$t('form.scheduling')"/>

    <v-responsive class="d-flex align-center text-center">
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item v-for="(item, i) in timelineArray" :key="i" small fill-dot color="transparent"
                         class="timelineItem">
          <template v-slot:icon>
            <div class="timelineItem__icon"></div>
          </template>
          <template v-slot:opposite></template>
          <template v-slot:divider>
            <div class="timelineItem__icon"></div>
          </template>
          <div class="timelineCard__container">
            <v-card dark class="timelineCard v-card--flat">
              <div class="timelineCard__date">
                <p>
                  {{ item.month }}
                </p>
              </div>
              <div class="d-flex flex-row justify-end">
                <v-card-title class="timelineCard__title">
                  {{ item.title_fa }}
                </v-card-title>
                <v-card-text class="timelineCard__text">
                  <p>{{ item.text_fa }}</p>
                </v-card-text>
              </div>
            </v-card>
          </div>
        </v-timeline-item>
        <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%D8%AF+%D8%AF%DB%8C%D8%AA%D8%A7+%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88+%D8%AF%D8%B1+%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA+%DA%A9%D9%85%D9%BE%DB%8C%D9%86+%D9%87%D8%A7%DB%8C+%DA%AF%D9%88%DA%AF%D9%84+%D8%A7%D8%AF%D8%B2&dates=20220622T133000Z/20220622T133000Z&details=%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%D8%AF+%D8%AF%DB%8C%D8%AA%D8%A7+%D8%A7%D8%B3%D8%AA%D9%88%D8%AF%DB%8C%D9%88+%D8%AF%D8%B1+%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA+%DA%A9%D9%85%D9%BE%DB%8C%D9%86+%D9%87%D8%A7%DB%8C+%DA%AF%D9%88%DA%AF%D9%84+%D8%A7%D8%AF%D8%B2&location=%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86&sf=true"
           target="_blank">
          <v-btn color="primary" class="pl-6 pr-6 mr-2 ml-2 mt-6 v-btn--primary" style="width: 186px">
            {{ $
              t('form.addToCalendar') }}
          </v-btn>
        </a>

      </v-timeline>
    </v-responsive>
  </v-responsive>
</template>
<script>
import TitleContainer from '~/components/TitleContainer';

export default {
  components: {TitleContainer},
  data() {
    return {
      timelineArray: [],
      calendarLink: '',
    };
  },
  async fetch() {
    const timelineAr = await this.$axios.$get('/timelineevents/');
    if (timelineAr.length > 0)
      this.timelineArray = timelineAr;
  },
  props: {
    onIntersecTimeline: Function,
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins';
@import '../../assets/variables';
/*
@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
}*/
#timeline {
  background-color: #0e1224;
  position: relative;
}


//TODO : make fix animation
/*
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}*/


.timelineCard {
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: map-get($material-dark-elevation-colors, '8') !important;
  z-index: 1;
  border-radius: 16px !important;

  &__container {
    margin: auto 24px auto auto;
    border-radius: 16px !important;
    max-width: 260px;
    padding: 2px !important;
    -webkit-animation: gradient-light 5s linear infinite;
    -moz-animation: gradient-light 5s linear infinite;
    animation: gradient-light 5s linear infinite;
    z-index: 0;
    background-image: linear-gradient(0, #fc147f, #480ac2, #e08250, #3ae4f6) !important;
    opacity: 1;
    //animation: roods 5s linear infinite;
    @media screen and (max-width: 960px) {
      margin: auto -15px auto auto;

    }

  }
/*
  &__container::before{
    position: absolute;
    width: 104%;
    height: 104%;
    content: "";
    //z-index: -1;
    filter: blur(20px);

  }*/


  @keyframes gradient-light {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes gradient-light {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @-webkit-keyframes gradient-light {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gradient-light {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  /*
  @keyframes roods {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
*/
  &__date {
    flex: 1 0 100%;
    padding: 8px 12px;
    height: 28px;

    > p {
      top: -20px;
      border-radius: 8px !important;
      text-align: center;
      position: relative;
      margin: auto;
      max-width: 80px;
      max-height: 29px;
      background-color: $pink-button;
    }
  }

  &__title {
    min-width: 80px;
    padding-top: 0;
    padding-left: 0;
    padding-bottom: 12px;
  }

  &__text {
    padding-bottom: 12px;
  }
}

.timelineLogo {
  position: absolute;
  opacity: 0.3;
  left: -15%;
  top: 20%;
}

.timelineItem {
  @media screen and (min-width: 960px) {
    &:nth-of-type(odd) {
      .timelineCard__container {
        margin-right: 24px !important;
        margin: auto;
      }
    }
    &:nth-of-type(even) {
      .timelineCard__container {
        margin-left: 24px !important;
        margin: auto;
      }
    }
  }
  // TODO: vuetify and our display breakpoints don't same

  //@include md {
  //  &:nth-of-type(odd) {
  //    .timelineCard__container {
  //      margin-right: 24px;
  //    }
  //  }
  //  &:nth-of-type(even) {
  //    .timelineCard__container {
  //      margin-left: 24px;
  //    }
  //  }
  //}

  .v-timeline-item__divider {
    border: 2px dashed map-get($material-dark-elevation-colors, '8') !important;
  }

  &__icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: map-get($material-dark-elevation-colors, '8');
    border: 2px solid rgb(31, 53, 77);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
  }

  .timelineDate {
    background-color: #ef394e;
    position: relative;

    h3 {
      font-size: 9rem;
      line-height: 150px;
      text-align: left;
      @include not-xl {
        font-size: 7rem;
      }
      @include not-lg {
        font-size: 5rem;
      }
      @include not-md {
        font-size: 4rem;
        line-height: 80px;
      }
    }

    h4 {
      border-top: 3px solid white;
      font-size: 2rem;
    }
  }

  .timelineDes {
    position: relative;
    padding-right: 96px;
    @include not-md {
      padding-right: 48px !important;
      span {
        right: 24px !important;
      }
    }

    > div {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    span {
      background-color: white;
      width: 2px;
      display: block;
      position: absolute;
      height: 100%;
      right: 48px;
      top: 0;

      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 50%;
        transform: translateY(-12px);
        left: -10px;
      }
    }

    h3 {
      font-size: 2.3rem;
    }

    i {
      color: #ef394e;
    }
  }
}

.addToCal {
  height: 150px;

  .timelineDate {
    background-color: #ef394e;
  }

  .timeLineBtn {
    margin-right: 96px;
    position: relative;
    display: flex;
    align-items: center;
    @include not-md {
      margin-right: 48px;
    }

    button {
      border-radius: 0;
      padding: 0 45px;
      @include not-md {
        padding: 0;
      }
    }

    span {
      background-color: white;
      width: 2px;
      display: block;
      height: 100%;
      position: absolute;
      right: -48px;
      top: 0;
      @include not-md {
        right: -24px;
      }

      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 50%;
        transform: translateY(-12px);
        left: -10px;
      }
    }
  }
}
</style>
