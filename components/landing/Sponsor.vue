<template>
  <div
    class="mt-2"
    id="sponser"
    v-intersect="{
      handler: onIntersecSponser,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <v-row align-center class=' justify-center mt-auto'>
      <div style='text-align: center;'>
        <div class="font-weight-bold text-sm-h4 text-h6 my-5">حامیان</div>
      </div>
    </v-row>
    <br/>
    <v-row class='mt-16 justify-space-around ma-4'>
      <v-col class='align-center justify-center text-center col-3 col-md-2' v-for='n in 4' :key='n'>
        <img src="~assets/images/logo/digikala-logo.svg"  alt='img'/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
</style>
