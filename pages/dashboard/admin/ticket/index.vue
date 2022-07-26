<template>
  <div>
    <v-container>
      <AdminTickets :data="tickets" :loading="loading" />
    </v-container>
  </div>
</template>

<script>
import AdminTickets from '~/components/ticket/AdminTickets';
export default {
  layout: 'admin',
  components: { AdminTickets },
  data() {
    return {
      loading: false,
      tickets: [],
    };
  },
  async fetch() {
    console.log("in")
    this.loading = true;
    let res = await this.$axios.$get('communication/admin_tickets');
    console.log(res)
    this.tickets = res.data;
    // this.tickets = res.data.sort((a, b) => new Date(a.created) - new Date(b.created)).reverse();
    this.loading = false;
  },
};
</script>

<style></style>
