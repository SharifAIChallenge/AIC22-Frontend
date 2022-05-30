<template>
  <v-container
    id="about"
    class="mt-10"
    v-intersect="{
      handler: onIntersecAbout,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <TitleContainer title="درباره رویداد هوش مصنوعی شریف"/>
    <p class="description mt-16 pt-8">
      {{
        post && post.motto
          ? post.motto
          : 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
      }}
    </p>
  </v-container>
</template>

<script>
import TitleContainer from '~/components/TitleContainer';

export default {
  components: {TitleContainer},
  data() {
    return {
      post: {},
    };
  },
  props: {
    onIntersecAbout: Function,
  },
  async fetch() {
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins';
div {
  text-align: center;
}
.fight {
  color: var(--v-primary-base);
  font-size: 4.2rem;
  @include not-md {
    font-size: 3rem;
  }
}
.description {
  text-align: center;
  font-size: 1.2rem;
  padding-top: 8px;
  color: #b2b2b6;
}
#about {
  max-width: 45%;
  @include not-md {
    max-width: 90%;
  }
}
</style>
