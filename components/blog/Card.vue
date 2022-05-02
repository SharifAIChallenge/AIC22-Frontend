<template>
  <v-card
      class="blog-card py-4 py-sm-6 d-flex flex-column v-card theme--dark"
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
    <div class="space-2 px-3 px-sm-5 tags">
      <v-chip v-for="(tag,index) in tags" :key="index"
              outlined>
        {{ tag }}
      </v-chip>
    </div>
    <v-flex class="more-data d-flex px-4 px-sm-6 align-end justify-space-between pt-8 mt-auto">
      <v-card-text class="caption ma-0 pa-0 pb-1">
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
    tags: []
  },
  name: "Card"
}
</script>

<style scoped lang="scss">
.blog-card {
  height: 100%;
  background-color: var(--v-bg-base) !important;
  .space-2 > span {
    margin: 0.2rem;
  }

  .v-card__title {
    border-right: 5px solid var(--v-primary-base);
  }

  .read-more {
    border-bottom: 1px solid var(--v-bg_secondary-base);
  }

  .more-data {
    flex-grow: 1;
  }
}

</style>