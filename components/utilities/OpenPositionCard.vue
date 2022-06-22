<template>
    <v-row class="d-flex position-card mb-5">
      <v-col cols="8" class="d-flex align-center">{{title}}</v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-btn class="v-btn--primary" link :href="link" target="_blank">
          مشاهده
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "OpenPositionCard",
  props:["title","link"]
}
</script>

<style lang="scss" scoped>
.position-card{
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #999999;
  border-radius: .5rem;

}
</style>