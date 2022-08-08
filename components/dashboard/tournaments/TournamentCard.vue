<template>
  <v-card :class="`invites ${status === 'pending' ? '' : 'disable'} rounded px-10 pt-10`" elevation="0">
    <h5 class="text-h5 text-center">
      {{ name }}
    </h5>
    <p class="text-center grey--text ">
    {{start_time}}
    </p>
    <div class="px-3 d-flex justify-center" v-if="status === 'pending'">
      <v-btn class="btn-results ml-1" rounded color="primary">مشاهده نتایج</v-btn>
    </div>
    <v-row v-else>
    </v-row>
  </v-card>
</template>

<script>
import DateTimeFormatter from '../../DateTimeFormatter';

export default {
  components: {DateTimeFormatter},
  props: ['id', 'name', 'start_time', 'status'],
};
</script>
<style lang="scss">
.invites {
  background-color: #182636 !important;
}

.invites.disable {
  background-color: unset !important;
  border: 2px dashed #868686 !important;
}
.btn-results{
  margin-bottom: -1rem;
}

</style>
