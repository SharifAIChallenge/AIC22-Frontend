<template>
  <v-container class="faq">
    <TitleContainer title="سوالات متداول" />
    <div class="faq__titles">
      <div
        v-for="title in this.titles"
        :id="title.id"
        :key="title.name"
        :class="{ clicked: clickedTitleId == title.id }"
        @click="clickTitle($event)"
      >
        {{ title.name }}
      </div>
    </div>
    <v-expansion-panels class="faq__wrapper" accordion multiple>
      <v-expansion-panel class="faq__item" v-for="faq in this.shownFaqs" :key="faq.question_fa">
        <v-expansion-panel-header class="faq__item__header">
          {{ faq.question_fa }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="faq__item__content">
          {{ faq.answer_fa }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { getFrequentlyAskedQuestions } from '~/api';
import { groupBy } from '~/mixins/utils';
import TitleContainer from '~/components/TitleContainer';

export default {
  auth: false,
  layout: 'landing',
  components: { TitleContainer },
  async asyncData({ $axios }) {
    const clickedTitleId = 0;
    const faqData = await getFrequentlyAskedQuestions($axios, false);
    const faqs = groupBy(faqData, faq => faq.title);
    const titles = [...faqs.keys()].map((value, index) => ({ name: value, id: index }));
    const shownFaqs = faqs.get(titles[0].name);
    return {
      clickedTitleId,
      faqs,
      titles,
      shownFaqs,
    };
  },
  methods: {
    clickTitle(event) {
      this.clickedTitleId = event.target.id;
      this.shownFaqs = this.faqs.get(this.titles[this.clickedTitleId].name);
    },
  },
};

</script>

<style lang="scss" >
@import '../../assets/variables';
@import '../../assets/mixins';
.faq {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__titles {
    display: flex;
    margin: 15px 0;
    background-color: #1f2f43;
    border: solid 2px #2a3d53;
    border-radius: 30px;
    padding: 10px 20px;
    overflow-x: auto;
    font-size: 1.2rem;
    @include not-md {
      font-size: 2vw;
    }
    @include not-sm {
      max-font-size: 1.2rem;
      font-size: 4vw;
    }
    max-width: 90vw;

    .clicked {
      background-color: var(--v-primary-base);
      border-radius: 30px;
      cursor: pointer;
    }

    div {
      margin: 0 5px;
      padding: 10px 30px;

      &:hover {
        background-color: var(--v-primary-base);
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }

  &__wrapper {
    margin: 15px 0;
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
</style>
