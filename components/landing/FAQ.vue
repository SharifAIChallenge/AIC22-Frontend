<template>
  <v-container id="faq" class="my-15">
    <TitleContainer title="سوالات متداول" />
    <v-expansion-panels class="faq__wrapper" accordion multiple>
      <v-expansion-panel class="faq__item" v-for="faq in this.faqs" :key="faq.question_fa">
        <v-expansion-panel-header class="faq__item__header">
          {{ faq.question_fa }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="faq__item__content text-justify">
          {{ faq.answer_fa }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn color="primary" class="pl-6 pr-6 mr-2 ml-2 mt-6 v-btn--primary goto-faq-button" style="width: 186px" to="/faq">
      {{ $t('form.goToFAQ') }}
    </v-btn>
  </v-container>
</template>

<script>
import TitleContainer from '~/components/TitleContainer';
import { getFrequentlyAskedQuestions } from '~/api';

export default {
  name: 'FAQ',
  components: { TitleContainer },
  data: () => ({
    faqs: [],
  }),
  async fetch() {
    this.faqs = await getFrequentlyAskedQuestions(this.$axios, true);
  }
};
</script>

<style scoped lang="scss">
@import 'assets/mixins.scss';

.faq {
  &__wrapper {
    background-color: var(--v-bg_secondary-base) !important;
    opacity: 0.5;
    border-radius: 1.5em;
  }

  &__item {
    padding: 0 1em;
    background-color: inherit !important;
    opacity: 0.75;

    &__header {
      text-align: right;
    }

    &__content {
      text-align: right;
    }
  }
}

.goto-faq-button {
  align-self: center;
}

#faq {
  text-align: center;
  max-width: 45%;
  @include not-md {
    max-width: 90%;
  }
}
</style>
