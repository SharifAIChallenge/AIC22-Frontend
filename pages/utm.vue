<template>
</template>

<script>
export default {
  name: "utm",

  mounted() {
    console.log("in")
    let id = this.$route.query.id
    this.$axios.$post(`utm-tracker/${id}`)
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>