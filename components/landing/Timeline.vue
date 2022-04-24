<template>
  <v-responsive class='overflow-y-auto'>
    <div class='timelineTitleContainer'>
      <img class='timelineTitleContainer__curveFirstImg' src='../../assets/images/curve1.svg' alt='curve-icon'>
      <img class='timelineTitleContainer__curveSecondImg' src='../../assets/images/curve2.svg' alt='curve-icon'>
      <div class='timelineTitleContainer__text'>
        زمان بندی
      </div>
    </div>

    <v-responsive class='d-flex align-center text-center'>
      <v-timeline
        align-top
        :dense='$vuetify.breakpoint.smAndDown'
      >
        <!--        :color="item.color"-->
        <!--        :icon="item.icon"-->
        <v-timeline-item
          v-for='(item, i) in timelineArrey'
          :key='i'
          fill-dot
        >
          <!--          :color="item.color"-->
          <v-card
            dark
            class='timelineCard'
          >

            <div class='timelineCard__date'>
              {{item.month}}
            </div>
<!--            <v-card-subtitle>-->
<!--              sadlkgls'kdlfksdl'kfal-->
<!--            </v-card-subtitle>-->
            <v-card-title class='timelineCard__title text-h6'>
              {{item.title}}
            </v-card-title>
            <v-card-text class='timelineCard__text'>
              <p>{{item.des}}</p>
<!--              :color='item.color'-->
<!--              <v-btn-->
<!--                class='mx-0'-->
<!--                outlined-->
<!--              >-->
<!--                Button-->
<!--              </v-btn>-->
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-responsive>
  </v-responsive>
</template>
<script>
export default {
  data() {
    return {
      timelineArrey: [
        { title: 'عنوان ؛', des: 'توضیحات کوتاهی  در قالب یک جمله قرار بگیرد .', month: 'اردیبهشت' },
        { title: 'عنوان ؛', des: 'توضیحات کوتاهی  در قالب یک جمله قرار بگیرد .', month: 'اردیبهشت' },
        { title: 'عنوان ؛', des: 'توضیحات کوتاهی  در قالب یک جمله قرار بگیرد .', month: 'اردیبهشت' },

      ],
      calendarLink: '',
    };
  },
  props: {
    onIntersecTimeline: Function,
  },
};
</script>

<style scoped lang='scss'>
@import '../../assets/mixins';

#timeline {
  background-color: #0e1224;
  position: relative;
}

.timelineTitleContainer {
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  font-size: 37px;
  line-height: 45px;
  height: 160px;

  &__text {
    z-index: 1;
  }

  &__curveFirstImg {
    position: absolute;
    margin: auto;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }

  &__curveSecondImg {
    position: absolute;
    margin: auto;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.timelineCard{
  display: flex;
  flex-grow: 4;
  max-width: 250px;
  margin: auto;
  border: 2px solid linear-gradient(
      var(--rotate), #FC147F, #480AC2, #E08250, #3AE4F6);;
  animation: rotate 5s linear infinite;

  &__date{
    
    position: relative;
    margin:auto;
    max-width: 150px;
  }
}
@keyframes rotate {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
.timelineLogo {
  position: absolute;
  opacity: 0.3;
  left: -15%;
  top: 20%;
}

.timelineItem {
  height: 320px;

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
