<template>
  <div>
    <v-container class="pa-0 d-flex align-center justify-space-between">
      <p class="headline py-5 ma-0">
        تیکت
      </p>
      <div>
        <client-only>
          <div class="d-flex">
            <v-tabs v-model="tabs" icons-and-text grow color="primary">
              <div v-for="(item, key) in header" :key="key" class="d-flex flex-column">
                <v-tab>
                    <span class="text--white">
                      {{ item.title }}
                    </span>
                  <v-icon size="24" style="color: white">{{
                      tabs === key ? item.icon : `${item.icon}-outline`
                    }}
                  </v-icon>
                </v-tab>
              </div>
            </v-tabs>
          </div>
        </client-only>
      </div>
    </v-container>
    <div>
      <v-divider/>
      <div class="pa-0">
        <v-tabs-items touchless v-model="tabs">
          <v-tab-item>
            <div v-if="tabs === 0" class="main-content">
              <v-container class="mt-10 tickets mb-13" style="position: relative">
                <div style="display: flex">
                  <div class="text-h4  " style="flex: 1">تمام تیکت ها</div>
                  <div>
                    <v-chip-group style="display: flex" v-model="generalTicket" column
                                  active-class="primary primary-bg v-btn--primary text--primary">
                      <v-chip outlined>شخصی</v-chip>
                      <v-chip outlined>عمومی</v-chip>
                    </v-chip-group>
                  </div>
                  <!-- </div> -->
                  <!--      <v-col cols="12" sm="3" class="pa-0 pl-4">-->
                  <!--        <v-btn color="primary mr-2" @click="toggleNewTicket()" width="100%">-->
                  <!--          ساخت تیکت جدید-->
                  <!--          <v-icon>mdi-plus-thick</v-icon>-->
                  <!--        </v-btn>-->
                  <!--      </v-col>-->
                </div>
                <div v-if="generalTicket === 0">
                  <PrivateTickets :ticketStatus="amenities" :data="filter(privateTicketData)"
                                  :loadingTable="loadingTable"/>
                </div>
                <div v-else>
                  <PublicTikects :data="publicTicketData" :action="false"/>
                </div>
              </v-container>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div v-if="tabs === 1" class="main-content pa-0">
              <v-container class="mt-10 tickets mb-13 " style="position: relative">
                <div class="text-h4 mr-3 mb-6 ">ساخت تیکت جدید</div>
                <NewTicket class="shadow pa-6" :toggleNewTicket="toggleNewTicket"/>
              </v-container>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </div>
  <!--  <v-container class="mt-10 tickets mb-13" style="position: relative">-->
  <!--    <div style="display: flex">-->
  <!--      <div class="text-h4  " style="flex: 1">تمام تیکت ها</div>-->
  <!--      <div>-->
  <!--        <v-chip-group style="display: flex" v-model="generalTicket" column active-class="primary primary-bg v-btn&#45;&#45;primary text&#45;&#45;primary">-->
  <!--          <v-chip outlined>شخصی</v-chip>-->
  <!--          <v-chip outlined>عمومی</v-chip>-->
  <!--        </v-chip-group>-->
  <!--      </div>-->
  <!--      &lt;!&ndash; </div> &ndash;&gt;-->
  <!--      &lt;!&ndash;      <v-col cols="12" sm="3" class="pa-0 pl-4">&ndash;&gt;-->
  <!--      &lt;!&ndash;        <v-btn color="primary mr-2" @click="toggleNewTicket()" width="100%">&ndash;&gt;-->
  <!--      &lt;!&ndash;          ساخت تیکت جدید&ndash;&gt;-->
  <!--      &lt;!&ndash;          <v-icon>mdi-plus-thick</v-icon>&ndash;&gt;-->
  <!--      &lt;!&ndash;        </v-btn>&ndash;&gt;-->
  <!--      &lt;!&ndash;      </v-col>&ndash;&gt;-->
  <!--    </div>-->

  <!--    <v-dialog v-model="showNewTicket" width="600" @click:outside="toggleNewTicket()">-->
  <!--      <v-card>-->
  <!--        <div @click="toggleNewTicket()">-->
  <!--          <v-btn icon>-->
  <!--            <h2>-->
  <!--              <v-icon>mdi-close</v-icon>-->
  <!--            </h2>-->
  <!--          </v-btn>-->
  <!--        </div>-->
  <!--        <NewTicket :toggleNewTicket="toggleNewTicket"/>-->
  <!--      </v-card>-->
  <!--    </v-dialog>-->
  <!--    <div v-if="generalTicket === 0">-->
  <!--      <PrivateTickets :ticketStatus="amenities" :data="filter(privateTicketData)" :loadingTable="loadingTable"/>-->
  <!--    </div>-->
  <!--    <div v-else>-->
  <!--      <PublicTikects :data="publicTicketData" :action="false"/>-->
  <!--    </div>-->
  <!--    &lt;!&ndash; <Logo /> &ndash;&gt;-->
  <!--  </v-container>-->
</template>

<script>
import PrivateTickets from '~/components/ticket/privateTickets';
import PublicTikects from '~/components/ticket/PublicTikects';
import NewTicket from '~/components/ticket/NewTicket';
import Logo from '~/components/dashboard/Logo';
import SectionHeader from '~/components/SectionHeader';

export default {
  layout: 'dashboard',
  components: {PrivateTickets, NewTicket, PublicTikects, Logo, SectionHeader},
  async fetch() {
    this.loadingTable = true;
    let res = await this.$axios.$get('communication/');
    this.privateTicketData = res.data;
    res = await this.$axios.$get('/communication/publicTickets');
    this.publicTicketData = res.data;
    this.loadingTable = false;
  },
  data() {
    return {
      tabs: 1,
      header: [
        {
          title: "تیکت ها",
          icon: "mdi-note-text"
        },
        {
          title: "ساخت تیکت جدید",
          icon: "mdi-typewriter"
        }
      ],
      amenities: [0, 1],
      generalTicket: 0,
      showNewTicket: false,
      privateTicketData: [],
      publicTicketData: [],
      loadingTable: false,
    };
  },
  methods: {
    toggleNewTicket() {
      this.showNewTicket = !this.showNewTicket;
      this.$fetch();
    },
    filter(data) {
      if (this.amenities.length === 2 || this.amenities.length === 0) {
        return data;
      } else {
        if (this.amenities[0] === 0) {
          return data.filter(data => data.status === 'closed');
        } else if (this.amenities[0] === 1) {
          return data.filter(data => data.status === 'open');
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.primary-bg {
  background-color: #0071e3 !important;
}

.shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: #182636;
  border-radius: 30px;
}
</style>
