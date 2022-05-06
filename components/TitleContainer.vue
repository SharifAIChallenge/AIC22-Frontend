<template>
  <div class="titleContainer">
    <img class="titleContainer__curveFirstImg" src="../assets/images/curve1.svg" alt="curve-icon" />
    <img class="titleContainer__curveSecondImg" src="../assets/images/curve2.svg" alt="curve-icon" />
    <div class="titleContainer__text">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style lang="scss" scoped>
.titleContainer {
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  font-size: 37px;
  line-height: 45px;
  height: 160px;

  &__text {
    z-index: 1;
  }

  &__curveFirstImg {
    position: absolute;
    margin: auto;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }

  &__curveSecondImg {
    position: absolute;
    margin: auto;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }
}
</style>
