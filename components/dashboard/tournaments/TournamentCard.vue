<template>
  <v-card :class="`invites ${status === 'pending' ? '' : 'disable'} rounded px-10 pt-10`">
    <h5 class="text-h5 text-center">
      {{ name }}
    </h5>

    <div class="px-3 acinvites d-flex justify-center" v-if="status === 'pending'">
      <v-btn class="ml-1" rounded color="primary">تایید</v-btn>
    </div>
    <v-row v-else>
      <v-btn class="col-6" rounded color="secondary" disabled>
        <span v-if="status === 'accepted'">تایید شده</span>
        <span v-else>رد شده</span>
      </v-btn>
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

</style>
