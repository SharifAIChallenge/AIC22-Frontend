<template>
</template>

<script>
export default {
  name: "utm",

  mounted() {
    let id = this.$route.query.id
    let redir = this.$route.query.redir
    this.$store.commit('utm/setSource',id)
    this.$axios.$get(`utm-tracker/${id}`)
    this.$router.push(`/${redir}`)
  }
}
</script>

<style scoped>

</style>
