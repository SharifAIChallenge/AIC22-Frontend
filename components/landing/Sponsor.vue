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
