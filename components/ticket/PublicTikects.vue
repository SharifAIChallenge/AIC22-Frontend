<template>
  <div class="main">
    <v-data-table
        center
        :headers="headers"
        :loading="loadingTable"
        :items="data"
        class="table-cursor"
        @click:row="handleClick($event)"
        style="background-color : transparent"
        disable-sort
    >
      <template v-slot:[`item.status`]="{ item }" class="ma-2">
        <div :style="item.status === 'open'? 'background-color: #0071e3;': 'background-color: #42b36f;'"
             class="status-label">
          <v-icon color="white" class="px-2">
            {{ item.status === 'open' ? 'mdi-clock-outline' : 'mdi-check' }}
          </v-icon>
          <div style="justify-self: flex-start;">
            {{ item.status === 'open' ? 'در انتظار پاسخ' : 'بسته شده' }}
          </div>
        </div>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:[`item.num_replies`]="{ item }">
        {{ item.num_replies }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  // async fetch() {
  //   this.loadingTable = true;
  //   await this.$axios.$get('/ticket/publicTickets').then(res => {
  //     if (res.status_code === 200) {
  //       this.data = res.data;
  //     } else {
  //       this.$toast.error('مشکلی در لود دیتا به وجود آمده است!');
  //     }
  //   });
  //   this.loadingTable = false;
  // },
  props: ['data'],

  data() {
    return {
      loadingTable: false,
      headers: [
        {text: 'موضوع', align: 'right', value: 'title', width: '70%'},
        {text: 'تعداد پیام ها', align: 'center', value: 'num_replies', width: '10%'},
        {
          text: 'وضعیت',
          align: 'center',
          value: 'status',
          width: '20%%',
        },
      ],
      // data: [],
      status_code: 200,
    };
  },
  methods: {
    getColor(status) {
      if (status === 'answered') return 'green';
      else if (status === 'pending') return 'orange';
      else if (status === 'closed') return 'green';
      else if (status === 'open') return 'orange';
      else return 'orange';
    },
    ticketStatusIcon(status) {
      if (status === 'open') return 'mdi-alert-circle-outline';
      else if (status === 'closed') return 'mdi-alert-circle-check-outline';
    },
    handleClick(row) {
      this.$router.push(`/dashboard/ticket/${row.id}`);
    },
  },
};
</script>

<style>
.main {
  text-align: center;
}

.table-cursor tbody tr:hover {
  cursor: pointer;
  background-color: rgba(11, 122, 234, 0.35) !important;
}

.status-label {
  border-radius: 999px;
  width: 140px;
  display: flex;
  align-items: center;
  padding: 2px 0;
  margin: auto;
}
</style>
