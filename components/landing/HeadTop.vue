<template>
  <div>
    <div id="HeadTop">
      <div class="container">
        <div>
          <h2>CHALLENGE</h2>
          <h3>2022</h3>
        </div>
        <AI-card></AI-card>

      </div>

      <span class="scroll"></span>
    </div>

  </div>
</template>

<script>
import AI_card from './AI_card'

export default {
  components: {
    'AI-card': AI_card
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/mixins';

.object-fit-none {
  object-fit: none;
}

#HeadTop {
  height: 100vh;
  transition: 0.4s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @include not-md {
    height: 100vh;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-family: Nebula, serif;

    div {
      margin-left: 3%;

      h2 {
        margin-bottom: -3%;
        font-size: 4rem;
      }

      h3 {
        margin-top: -3%;

        font-size: 1.5rem;
      }
    }

  }

  .scroll {
    display: block;
    width: 2px;
    height: 30px;
    background-color: white;
    position: absolute;
    bottom: 200px;
    left: 50%;
    animation: ScrollAnimate 2s infinite;
  }
}

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
</style>
