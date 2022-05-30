<template>

  <v-responsive v-if="tweets" class="" style="margin-bottom: 120px">
    <TitleContainer :title="$t('landing.tweets')"/>
    <div class="container">
      <input @click="tweetCardClick(1)" type="radio" name="slider" id="item-1" checked>
      <input @click="tweetCardClick(2)" type="radio" name="slider" id="item-2">
      <input @click="tweetCardClick(3)" type="radio" name="slider" id="item-3">
      <div class="cards">
        <label class="card" for="item-1" id="song-1">
          <img
              class="card__userIcon"
              :src="selectedCardIndex % 3 === 0 ? selectedCard.image : (selectedCardIndex % 3 === 1 ? previousCard.image : nextCard.image)"
          >
          <div class="card__user">
            {{
              selectedCardIndex % 3 === 0 ? selectedCard.author : (selectedCardIndex % 3 === 1 ? previousCard.author : nextCard.author)
            }}
          </div>

          <div class="card__body">
            {{
              selectedCardIndex % 3 === 0 ? selectedCard.text : (selectedCardIndex % 3 === 1 ? previousCard.text : nextCard.text)
            }}
          </div>
        </label>
        <label class="card" for="item-2" id="song-2">
          <img
              class="card__userIcon"
              :src="selectedCardIndex % 3 === 0 ? nextCard.image : (selectedCardIndex % 3 === 1 ? selectedCard.image : previousCard.image)"

          >
          <div class="card__user">
            {{
              selectedCardIndex % 3 === 0 ? nextCard.author : (selectedCardIndex % 3 === 1 ? selectedCard.author : previousCard.author)
            }}
          </div>

          <div class="card__body">
            {{
              selectedCardIndex % 3 === 0 ? nextCard.text : (selectedCardIndex % 3 === 1 ? selectedCard.text : previousCard.text)
            }}

          </div>
        </label>
        <label class="card" for="item-3" id="song-3">
          <img
              class="card__userIcon"
              :src="selectedCardIndex % 3 === 0 ? previousCard.author : (selectedCardIndex % 3 === 1 ? nextCard.author : selectedCard.author)"
          >
          <div class="card__user">
            {{
              selectedCardIndex % 3 === 0 ? previousCard.author : (selectedCardIndex % 3 === 1 ? nextCard.author : selectedCard.author)
            }}
          </div>

          <div class="card__body">
            {{
              selectedCardIndex % 3 === 0 ? previousCard.text : (selectedCardIndex % 3 === 1 ? nextCard.text : selectedCard.text)
            }}

          </div>
        </label>
      </div>
    </div>

  </v-responsive>
</template>

<script>
import TitleContainer from '~/components/TitleContainer';

export default {
  name: "tweets",
  components: {TitleContainer},
  data() {
    return {
      selectedCardIndex: 0,
      tweets: []
    }
  },
  computed: {
    previousCard: function () {
      return this.tweets[((this.selectedCardIndex - 1) % this.tweets.length + this.tweets.length) % this.tweets.length]
    },
    nextCard: function () {
      return this.tweets[((this.selectedCardIndex + 1) % this.tweets.length + this.tweets.length) % this.tweets.length]
    },
    selectedCard: function () {
      return this.tweets[((this.selectedCardIndex) % this.tweets.length + this.tweets.length) % this.tweets.length]
    }
  },
  methods: {
    tweetCardClick(id) {
      if (id === 1) {
        if (this.selectedCardIndex % 3 === 0) {
          this.goToTweet();
        } else if (this.selectedCardIndex % 3 === 1) {
          this.selectedCardIndex -= 1;
        } else {
          this.selectedCardIndex += 1;
        }
      } else if (id === 2) {
        if (this.selectedCardIndex % 3 === 0) {
          this.selectedCardIndex += 1;
        } else if (this.selectedCardIndex % 3 === 1) {
          this.goToTweet();
        } else {
          this.selectedCardIndex -= 1;
        }
      } else {
        if (this.selectedCardIndex % 3 === 0) {
          this.selectedCardIndex -= 1;
        } else if (this.selectedCardIndex % 3 === 1) {
          this.selectedCardIndex += 1;
        } else {
          this.goToTweet();
        }
      }
      console.log('this.selecetedCard', this.selectedCardIndex)
      console.log('this.tweets.length', this.tweets.length)
    },
    goToTweet() {
      if (this.tweets[this.selectedCard].url)
        window.location.href = this.tweets[this.selectedCard].url
    },

  },

  async fetch() {
    const tweets = await this.$axios.$get('/tweets/');
    console.log('tweets', tweets.length)
    if (tweets.length > 0){
      this.tweets = tweets;
      this.selectedCardIndex = 0;
    }
  },
}
</script>

<style scoped lang="scss">

@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
  font-family: 'DM Sans', sans-serif;
  transition: background .4s ease-in;
  background-color: #c394f8;

  &.blue {
    background-color: #428aa6;
  }
}

input[type=radio] {
  display: none;
}

.card {
  display: flex;
  flex-direction: column;
  min-width: 230px;
  background-color: map-get($material-dark-elevation-colors, '32');
  position: absolute;
  width: 60%;
  height: 100%;
  left: 0;
  right: 0;
  margin: auto;
  transition: transform .4s ease;
  cursor: pointer;

  &__body {
    display: flex;
    flex-direction: column;
    margin: 12px;
    text-align: center;
  }

  &__user {
    display: flex;
    position: relative;
    margin: 50px auto 8px;
    text-align: center;
  }

  &__userIcon {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}

.container {
  width: 100%;
  max-width: 800px;
  max-height: 600px;
  height: 100%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.cards {
  height: 240px !important;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}


#item-1:checked ~ .cards #song-3, #item-2:checked ~ .cards #song-1, #item-3:checked ~ .cards #song-2 {
  transform: translatex(-40%) scale(.8);
  opacity: .4;
  z-index: 0;
}

#item-1:checked ~ .cards #song-2, #item-2:checked ~ .cards #song-3, #item-3:checked ~ .cards #song-1 {
  transform: translatex(40%) scale(.8);
  opacity: .4;
  z-index: 0;
}

#item-1:checked ~ .cards #song-1, #item-2:checked ~ .cards #song-2, #item-3:checked ~ .cards #song-3 {
  transform: translatex(0) scale(1);
  opacity: 1;
  z-index: 1;

  img {
    box-shadow: 0px 0px 5px 0px rgba(81, 81, 81, 0.47);
  }
}

.player {
  background-color: #fff;
  border-radius: 8px;
  min-width: 320px;
  padding: 16px 10px;
}

.upper-part {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  height: 36px;
  overflow: hidden;
}

.play-icon {
  margin-right: 10px;
}

.song-info {
  width: calc(100% - 32px);
  display: block;
}

.song-info .title {
  color: #403d40;
  font-size: 14px;
  line-height: 24px;
}

.sub-line {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.subtitle, .time {
  font-size: 12px;
  line-height: 16px;
  color: #c6c5c6;
}

.time {
  font-size: 12px;
  line-height: 16px;
  color: #a5a5a5;
  font-weight: 500;
  margin-left: auto;
}

.progress-bar {
  height: 3px;
  width: 100%;
  background-color: #e9efff;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  display: block;
  position: relative;
  width: 60%;
  height: 100%;
  background-color: #2992dc;
  border-radius: 6px;
}

.info-area {
  width: 100%;
  position: absolute;
  top: 0;
  left: 30px;
  transition: transform .4s ease-in;
}

#item-2:checked ~ .player #test {
  transform: translateY(0);
}

#item-2:checked ~ .player #test {
  transform: translateY(-40px);
}

#item-3:checked ~ .player #test {
  transform: translateY(-80px);
}


</style>