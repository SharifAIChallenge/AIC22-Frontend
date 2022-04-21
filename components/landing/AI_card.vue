<template>
  <div>
    <div class="logo-container">
      <img src="~/assets/images/logo/AI_box_logo_without_shadow.svg" width="150px" height="150px" alt="AI_logo"/>
    </div>
  </div>
</template>

<script></script>
<style scoped>
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}
.logo-container {
  width: 150px;
  height: 150px;
  position: relative;
  display: flex;
  cursor: pointer;
  z-index: 0
}

.logo-container::after {
  position: absolute;
  content: "";

  z-index: -1;
  height: 108%;
  width: 108%;

  transform: scale(0.85);
  filter: blur(20px);
  background-image: linear-gradient(
      var(--rotate), #FC147F, #480AC2, #E08250, #3AE4F6);
  opacity: 1;
  transition: opacity .5s;
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

</style>