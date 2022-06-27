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
    <TitleContainer title="درباره رویداد هوش مصنوعی"/>
    <p class="description mt-16 pt-8">
      {{
        post && post.motto
          ? post.motto
          : 'هوش مصنوعی، یک رویداد دانشجویی است که توسط جمعی از دانشجوهای برترین دانشگاه‌های کشور، به‌خصوص دانشگاه صنعتی شریف برگزار می‌شود. از این رویداد می‌توان به‌عنوان بزرگ‌ترین مسابقهٔ هوش مصنوعی کشور یاد کرد. رویداد هوش مصنوعی، چهاردهمین دورهٔ خود را تجربه می‌کند و اولین دورهٔ خود را در سال ۱۳۸۷ برگزار کرده‌است. رویداد هوش مصنوعی، به‌صورت گروهی برگزار می‌شود که مهارت و توانایی شرکت‌کنندگان را در استفاده از مفاهیم هوش مصنوعی، می‌سنجد و به چالش می‌کشد.'
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
