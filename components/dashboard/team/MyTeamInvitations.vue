<template>
  <v-card :class="`invites ${status === 'pending' ? '' : 'disable'} rounded px-10 pt-10`">
    <h5 class="text-h5 text-center">
      {{ name }}
    </h5>
    <p class="text--secondary text-center"
       @click="()=>{
      if(textClick)
        textClick();
    }"
    >
      {{ text }}
    </p>
    <div class="px-3 acinvites d-flex justify-center" v-if="status === 'pending'">
      <v-btn class="ml-1" rounded color="primary" @click="accept">تایید</v-btn>
      <v-btn class="mr-1" rounded color="secondary" @click="reject">لغو</v-btn>
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
export default {
  props: ['name', 'status', 'accept', 'reject', 'text', 'textClick'],
  name: "MyTeamInvitations"
}
</script>

<style scoped>
.invites {
  background-color: #182636 !important;
}

.invites.disable {
  background-color: unset !important;
  border: 2px dashed #868686 !important;
}

.acinvites {
  position: relative;
  top: 1rem;
}
</style>