<template>
  <v-container class="faq">
    <TitleContainer title="سوالات متداول" />
    <div class="faq__titles">
      <div
        v-for="title in this.titles"
        :id="title.id"
        :key="title.id"
        :class="{ clicked: clickedTitleId === title.id }"
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
    const faqData = await getFrequentlyAskedQuestions($axios, false);
    const faqs = groupBy(faqData, faq => faq.title);
    const titles = [...faqs.keys()].map((value, index) => ({ name: value, id: index }));
    const shownFaqs = faqs[titles[0].name];
    return {
      clickedTitleId: 0,
      titles,
      faqs,
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

<style lang="scss">
@import 'assets/variables.scss';
@import 'assets/mixins.scss';
.faq {
  margin-top: 100px;

  &__titles {
    display: flex;
    background-color: #1F2F43;
    border: solid 2px #2A3D53;
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

    div {
      margin: 0 5px;
      padding: 10px 30px;

      .clicked {
        background-color: var(--v-primary-base);
        border-radius: 30px;
        cursor: pointer;
      }

      &:hover {
        background-color: var(--v-primary-base);
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }

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
.faq-icon {
  transform: translateX(10px);
}
.first-slider {
  background-color: var(--v-primary-base);
  height: 100vh;
  display: flex;
  align-items: center;
}
.slider-text {
  margin-right: 50px;
  position: absolute;
}
.vl {
  display: block;
  width: 2px;
  height: 30px;
  background-color: white;
  position: absolute;
  bottom: 30px;
  left: 50%;
  animation: ScrollAnimate 2s infinite;
  @keyframes ScrollAnimate {
    0% {
      opacity: 1;
      height: 0;
      bottom: 30px;
    }
    50% {
      opacity: 1;
      height: 50px;
      bottom: 30px;
    }
    100% {
      opacity: 0;
      bottom: 80px;
      height: 0;
    }
  }
}
.faq-titles {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: map-get($map: $material-dark, $key: 'background');
  z-index: 2;
}
.title {
  margin: auto 50px;
  padding: 20px 0px;
}
.fag-title-for-show {
  font-size: 4rem;
  color: var(--v-primary-base);
  margin-bottom: 40px;
  font-weight: bold;
}

.faq-card {
  border: 3px solid var(--v-primary-base);
  padding: 20px;
  height: 100%;
}
.faq-card-title {
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
