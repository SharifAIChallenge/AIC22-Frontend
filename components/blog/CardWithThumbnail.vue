<template>
  <v-card
      class="blog-card py-4 py-sm-6 d-flex flex-column rounded-0.5"
      elevation="0"
  >
    <v-row class="w-full">

      <v-col class="col-12 col-md-8">
        <v-card-title
            class="py-0 my-2 pr-4 pr-sm-6"
        >
          {{ title }}
        </v-card-title>
        <v-card-text
            class="pt-12 pr-4 pr-sm-6"
        >
          {{ description }}
        </v-card-text>
        <div class="space-2 px-3 px-sm-5 tags">
          <v-chip v-for="(tag,index) in tags" :key="index"
                  outlined>
            {{ tag }}
          </v-chip>
        </div>
        <v-flex class="more-data d-flex pr-4 pr-sm-6 align-end justify-space-between pt-12 mt-auto">
          <v-card-text class="caption ma-0 pa-0 pb-1" >
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
      </v-col>
      <v-col class="col-12 col-md-4 p-relative img-col">
        <div class="p-absolute img px-4 px-sm-6 my-4 mx-3">
          <img src="https://via.placeholder.com/500" :alt="title" class=" rounded-0.5"/>
        </div>
      </v-col>
    </v-row>

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
.w-full{
  width: 100%;
}
.p-relative{
  position: relative;
}
.blog-card {
  height: 100%;
  background-color: var(--v-bg-base);
  .space-2 > span {
    margin: 0.2rem;
  }
  .img{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .v-card__title {
    border-right: 5px solid var(--v-primary-base);
  }
  .v-card__text{
    color: rgba(255, 255, 255, 0.7);
  }
  .read-more{
    border-bottom: 1px solid var(--v-bg_secondary-base);
  }
  .more-data{
    flex-grow: 1;
  }
  img{
    height: 100%;
    width: 100%;
  object-fit: cover;
  }
}

</style>