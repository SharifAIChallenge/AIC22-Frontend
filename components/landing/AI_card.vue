<template>
  <div class="container_ll">
    <div class="logo-container">
      <img src="~/assets/images/logo/AI_box_logo_without_shadow.svg" width="150px" height="150px" alt="AI_logo"/>
    </div>
  </div>
</template>

<script></script>
<style lang="scss" scoped>

.logo-container {
  width: 150px;
  height: 150px ;
  position: relative;
  display: flex;
  cursor: pointer;
  z-index: 0
}

.logo-container::before {
  position: absolute;
  content: "";

  z-index: -1;
  height: 104%;
  width: 104%;
  border-radius: 50%;
  //position: absolute;
  margin: auto;
  -webkit-animation: logo 5s linear infinite;
  -moz-animation: logo 5s linear infinite;
  animation: logo 5s linear infinite;
  //transform: scale(0.85);
  filter: blur(20px);
  background-image: linear-gradient(
      0 , #FC147F, #480AC2, #E08250, #3AE4F6);
  opacity: 1;
}


@-moz-keyframes logo {
  0%{
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes logo {
  0%{
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes logo {
  0%{
    -moz-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/*

@keyframes spin {
  0% {
    //background-image: linear-gradient(
    //    0deg, #FC147F, #480AC2, #E08250, #3AE4F6);
    --rotate: 0deg;
  }
  100% {
    //background-image: linear-gradient(
    //    360deg , #FC147F, #480AC2, #E08250, #3AE4F6);
    --rotate: 360deg;
  }
}
*/

</style>