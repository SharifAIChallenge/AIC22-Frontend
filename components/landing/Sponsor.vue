<template>
  <div
    class="mt-2 h-screen d-flex flex-column align-center justify-center"
    id="sponser"
    v-intersect="{
      handler: onIntersecSponser,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <div class="w-full">
      <TitleContainer title="حامی مالی" />
      <v-row class="mt-16 pt-16 justify-space-around ma-4">
        <v-col class="align-center justify-center text-center col-3 col-md-2" v-for="n in 4" :key="n">
          <img src="~assets/images/logo/azki.com.png" alt="img" width="60" height="60"/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TitleContainer from '~/components/TitleContainer';

export default {
  components: { TitleContainer },
  props: {
    onIntersecSponser: Function,
  },
};
</script>

<style lang="scss" scoped>
$image-width: 30vmin;
.padding-y {
  padding: 20vmin 0px;
}
.w-full {
  width: 100%;
}
.sscLogo {
  transition: all 0.6s;
  &:hover {
    background-color: var(--v-secondary-base);
  }
}

.digikalaLogoCol {
  background-color: var(--v-primary-base);

  div {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    img {
      width: $image-width;
    }
  }
  transition: all 0.6s;
  &:hover {
    background-color: var(--v-secondary-base);
    transition: all 0.6s;
  }
}

.digikala {
  text-align: center;

  // h2 {
  //   padding: 5px;
  //   color: var(--v-primary-base);
  // }
}

.sscIntro {
  text-align: center;

  h4 {
    color: var(--v-primary-base);
  }

  h3 {
    opacity: 0.8;
  }
}

.ssc {
  padding: 0px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    img {
      width: $image-width;
      filter: invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(0%) contrast(104%);
    }
  }
}
.h-screen {
  height: 100vh;
}
</style>
