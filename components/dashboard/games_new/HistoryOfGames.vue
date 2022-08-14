<template>
  <div>
    <SectionHeader title="تاریخچه بازی ها" icon="mdi-history"/>
    <v-data-table
        :headers="headers"
        :items="data"
        :page.sync="page"
        :loading="tableLoading"
        disable-sort
        hide-default-footer
        class="mx-10"
        style="background-color : transparent"
    >
      <template v-slot:item.log="{ item }">
        <v-btn :disabled="!item.log" icon :href="item.log">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
            color="primary"
            v-if="item.status === 'pending'"
        >
          <v-icon class="ml-2">mdi-clock-time-four-outline</v-icon>
          در انتظار داوری
        </v-chip>
        <v-chip
            color="primary"
            v-else-if="item.status === 'running'"
        >
          <v-icon class="ml-2">mdi-clock-time-four-outline</v-icon>
          درحال اجرا
        </v-chip>
        <v-chip
            color="secondary"
            v-else-if="item.status === 'failed'"
        >
          <v-icon class="ml-2">mdi-close</v-icon>
          خطا
        </v-chip>
        <v-chip
            color="success"
            v-else-if="item.status === 'successful'"
        >
          <v-icon class="ml-2">mdi-check</v-icon>
          به اتمام رسیده
        </v-chip>
      </template>
      <template v-slot:item.winner="{ item }">
        {{ !item.winner ? '-' : item.winner.name }}
      </template>
    </v-data-table>
    <div v-if="data && data.length === 0" class="mb-10 px-md-12">
      لیست بازی های شما خالی است
    </div>
    <div class="py-10">
      <v-pagination v-model="page" total-visible="6" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import Logo from '~/components/dashboard/Logo';

export default {
  components: {SectionHeader, SectionContainer, Logo},
  async fetch() {
    let tournomentId = this.$route.query.id;
    this.url = tournomentId ? `challenge/match?tournament_id=${tournomentId}&` : 'challenge/match?';
    this.tableLoading = true;
    let filter = this.filterChip === 0 ? '&status=successful' : '';
    try {
      let res = await this.$axios.$get(`${this.url}page=${this.page}${filter}`);
      this.data = res.results;
      const count = 10;
      this.pageCount = Math.ceil(res.count / count);
      this.status_code = 200;

    } catch (e) {
      if (e.response) {
        if (e.response.status === 403) {
          this.$toast.error('برای مشاهده این صفحه باید تیم داشته باشید');
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      }
    }

    let team = await this.$axios.$get('team');
    this.myteam = team.name;
    this.tableLoading = false;
  },
  data() {
    return {
      filterSelect: 'همه',
      filterStatus: 'همه',
      filteIitems: ['همه', 'دوستانه', 'رقابتی', 'آزمایشی'],
      filterChip: null,
      tableLoading: false,
      btnLoading: false,
      dialog: false,
      page: 1,
      pageCount: 0,
      itemPerPage: 10,
      url: '',
      headers: [
        {text: 'نام تیم', align: 'center', value: 'team2.name'},
        {text: 'تورنومنت', align: 'center', value: 'tournament.name'},
        {text: 'لاگ', align: 'center', value: 'log'},
        {text:'وضعیت',align: 'center',value: 'status'},
        {text: 'برنده', align: 'center', value: 'winner'},
      ],
      data: [],
      currentGame: {
        serverLog: '',
        graphicLog: '',
      },
      status_code: 200,
      item: null,
      myteam: {},
    };
  },
  watch: {
    page() {
      this.$fetch();
    },
  },
  methods: {
    gameStatus(status) {
      switch (status) {
        case 'freeze':
          return 'ثبت شده';
        case 'pending':
          return 'در صف اجرا';
        case 'running':
          return 'در حال اجرا';
        case 'failed':
          return 'اجرا با خطا';
        case 'successful':
          return 'تمام ‌شده';
      }
    },
    filter(data) {
      this.tableLoading = true;
      this.btnLoading = true;

      var lastApi = '********************';

      if (data === 'دوستانه') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === 'رقابتی') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === 'آزمایشی') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      }

      this.$axios.$get(lastApi).then(res => {
        if (res.status_code === 200) {
          this.data = res.data;
          this.status_code = res.status_code;
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.btnLoading = false;
      this.tableLoading = false;
    },
    handleFilterChip() {
      this.$fetch();
    },
    resultTrasnlate(res) {
      if (res === '') return 'برد';
      else if (res === '') return 'باخت';
      else if (res === '') return 'مساوی';
      else if (res === '') return 'در حال اجرا';
    },
    resultIcon(res) {
      if (res === '') return 'mdi-emoticon-cool-outline';
      else if (res === '') return 'mdi-emoticon-cry-outline';
      else if (res === '') return 'mdi-emoticon-happy-outline';
      else if (res === '') return 'mdi-progress-clock';
    },
  },
};
</script>

<style scoped lang="scss">
.myteam {
  color: var(--v-success-lighten1);
}

.header {
  display: flex;
  justify-content: space-between;
}

.select-filter {
  display: flex;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.profile {
  display: flex;
  align-items: center;
}

.icon-hover {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>
