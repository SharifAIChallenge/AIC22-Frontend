<template>
  <v-card
      class="blog-card py-2"
      elevation="0"
  >
    <v-card-title
        class="py-0 my-2"
    >
      {{ title }}
    </v-card-title>
    <v-card-text
        class="pt-8"
    >
      {{ description }}
    </v-card-text>
    <v-flex class="d-flex px-4 align-center justify-space-between">
      <v-card-text class="caption ma-0 pa-0">
        {{ date }}
      </v-card-text>
      <v-btn
          class="read-more"
          :to="href"
          plain
          text
      >
        مطالعه
        <v-icon>
          mdi-chevron-left
        </v-icon>
      </v-btn>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    href: String,
    date: String,
  },
  name: "Card"
}
</script>

<style scoped lang="scss">
.blog-card {
  background-color: #13202e;

  .v-card__title {
    border-right: 4px solid #0071e3;
  }
  .v-card__text{
    color: rgba(255, 255, 255, 0.7);
  }
  .read-more{
    border-bottom: 1px solid #182636;
  }
}

</style>