<template>
  <v-container
    id="faq"
    class="my-15"
    v-intersect="{
      handler: onIntersect,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <TitleContainer title="سوالات متداول" />
    <box>
      <v-expansion-panels class="faq__wrapper" accordion>
        <v-expansion-panel class="faq__item" v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header class="faq__item__header">
            چطور می‌تونم توی مسابقه شرکت کنم؟
          </v-expansion-panel-header>
          <v-expansion-panel-content class="faq__item__content">
            شرکت تو مسابقه این‌شکلیه که اول وارد سایت می‌شی و بعد یه‌سری اطلاعات لازم رو پر می‌کنی. در ادامه هم متخصصین ما با بررسی رزومه
            حرفه‌ای شما، برای مصاحبه باهاتون تماس می‌گیرن.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </box>
    <v-btn color="primary" class="pl-6 pr-6 mr-2 ml-2 mt-6 v-btn--primary" style="width: 186px">
      {{ $t('form.goToFAQ') }}
    </v-btn>
  </v-container>
</template>

<script>
import Box from '~/components/utilities/Box';
import TitleContainer from '~/components/TitleContainer';

export default {
  name: 'FAQ',
  components: { Box, TitleContainer },
  data() {
    return {};
  },
  props: {
    onIntersect: Function,
  },
  methods: {
    clickMenu(event) {},
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins';

.faq {

  &__wrapper {
    padding: 0 5em;
  }

  &__item {

    &__header {
    }

    &__content {
    }
  }
}

#faq {
  text-align: center;
  max-width: 45%;
  @include not-md {
    max-width: 90%;
  }
}
</style>
