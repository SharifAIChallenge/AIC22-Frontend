<template>
  <div :class="'box '+classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: ['classes']
}
</script>

<style scoped>
.box {
  background-color: rgba(24, 38, 54, 0.6);
  border-radius: 1.5em;
}
</style>