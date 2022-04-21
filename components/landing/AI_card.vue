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
}

.logo-container::after {
  content: "";
  width: 104%;
  height: 104%;
  border-radius: 8px;
  background-image: linear-gradient(
      var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
  position: absolute;
  z-index: -1;
  top: -1%;
  left: -2%;
  animation: spin 2.5s linear infinite;
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