<template>
  <v-menu offset-y class="transparent">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark tile plain v-bind="attrs" v-on="on">
        <v-icon>mdi-menu-down</v-icon>
        <span>اسپانسر</span>
      </v-btn>
    </template>
    <v-list class="sponsor-dropdown">
      <v-list-item link target="_blank" :to="items[0].to">
        <v-list-item-title>{{ items[0].title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'ازکی', to: '/sponsors/azki' },
    ],
  }),
  methods: {
    getClass() {
      return (this.color === 'primary' ? 'hover_primary ' : 'hover_white ') + 'transparent py-8 text-h5 text-sm-subtitle-2';
    },
  },
};
</script>

<style lang="scss">
.sponsor-dropdown {
  padding: 0px;
  .v-list-item {
    //border-bottom: 1px solid var(--v-primary-base);
    &:hover {
      background-color: var(--bg-base);
      cursor: pointer;
      .v-list-item__title {
        color: var(--v-primary-base);
        transition: all 0.5s;
      }
      transition: all 0.5s;
    }
  }
  .v-list-item__title {
    font-family: Estedad,serif;
    font-weight: lighter;
    font-size: .75rem;
  }
}
// .hover_white {
//   &.v-btn--active,
//   &:hover {
//     color: var(--v-anchor-base);
//     transition: all 0.7s;
//   }
// }
// .hover_primary {
//   &.v-btn--active,
//   &:hover {
//     transition: all 0.7s;
//   }
// }
</style>
