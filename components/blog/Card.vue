<template>
  <v-card
      class="blog-card py-4 py-sm-6"
      elevation="0"
  >
    <v-card-title
        class="py-0 my-2 px-4 px-sm-6"
    >
      {{ title }}
    </v-card-title>
    <v-card-text
        class="pt-12 px-4 px-sm-6"
    >
      {{ description }}
    </v-card-text>
    <v-flex class="d-flex px-4 px-sm-6 align-center justify-space-between pt-12">
      <v-card-text class="caption ma-0 pa-0">
        {{ date }}
      </v-card-text>
      <v-btn
          class="read-more"
          :to="href"
          plain
          text
          small
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
  background-color: var(--v-bg-base);
  .v-card__title {
    border-right: 5px solid var(--v-primary-base);
  }
  .read-more{
    border-bottom: 1px solid var(--v-bg_secondary-base);
  }
}

</style>