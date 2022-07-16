<template>
  <div>
    <v-container >
      <p class="headline py-5 ma-0">
        مستندات
      </p>

    </v-container>
    <v-divider />
    <Tree/>
  </div>


</template>

<script>
import Tree from '~/components/doc/Tree.vue';

export default {
  layout: 'dashboard',
  components:{ Tree },
};
</script>

<style></style>
