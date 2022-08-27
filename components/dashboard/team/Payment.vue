<template>
<!--  <div v-if="!payed" class="mt-8">-->
<!--    <v-alert icon="mdi-cash-multiple" class="mb-8">-->
<!--      <p>-->
<!--        {{ config.description }}-->
<!--      </p>-->
<!--      <div class="my-8">-->
<!--        <span>-->
<!--          مبلغ:-->
<!--        </span>-->
<!--        <span class="mr-6">-->
<!--          <strong>{{ config.amount }} تومان</strong>-->
<!--        </span>-->
<!--      </div>-->
<!--    </v-alert>-->

<!--    <div>-->
<!--      <v-btn block :href="gatewayLink">-->
<!--        پرداخت-->
<!--      </v-btn>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div v-else>-->
<!--    <v-alert icon="mdi-emoticon-excited-outline" class="mb-8">-->
<!--      <p class="text-h6">-->
<!--        پرداخت تیم شما با موفقیت انجام شد-->
<!--      </p>-->
<!--    </v-alert>-->
<!--  </div>-->

  <v-container>
    <div v-if="!payed" style="margin-top: 5rem;">
      <box class="pa-10">
        <div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-center mb-7">
              <div>هزینه حضور در مرحله دوم :</div>
              <div class="font-weight-bold">{{ config.amount }} تومان</div>
            </div>
<!--            <div class="d-flex flex-row justify-center">-->
<!--              <div>مالیات درگاه پرداخت :</div>-->
<!--              <div class="font-weight-bold">-->
<!--                {{ +config.amount * 0.09 }} تومان-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="d-flex flex-row justify-center">-->
<!--              <div>مبلغ نهایی :</div>-->
<!--              <div class="font-weight-bold">{{ +config.amount + (+config.amount * 0.09) }} تومان</div>-->
<!--            </div>-->
          </div>
          <v-checkbox @change="chekNahar" v-model="lunch" label="تمایل به دریافت نهار دارم.(مبلغ 160 هزارتومان اضافه میشود)"></v-checkbox>
          <v-btn class="v-btn--primary w-full" :loading="loading" @click="gotoGateway">پرداخت</v-btn>
        </div>
      </box>
    </div>
    <div v-else class="notice-box" style="max-width: fit-content; margin-top: 5rem;">
      پرداخت شما موفقیت آمیز بود، به امید دیدار شما در مرحله دوم ای‌آی چلنج ((:
    </div>
  </v-container>
</template>

<script>
import Box from "~/components/utilities/Box";
export default {
  components: {Box},
  data() {
    return {
      payed : false,
      lunch : false,
      loading : false,
      config: {
        amount: '',
        description: '',
      },
      gatewayLink: '',
    };
  },
  async fetch() {
    let res = await this.$axios.get('payment/config?nahar=0');
    // console.log(res)
    this.config = res.data.config;
    // res = await this.$axios.post('payment/request');
    // this.gatewayLink = res.data.url;
  },
  methods: {
    async chekNahar(){
      this.loading = true
      let res = await this.$axios.get(`payment/config?nahar=${this.lunch ? '1' : '0'}`)
      this.config = res.data.config
      this.loading = false
    },
    async gotoGateway(){
      const body ={
        nahar : this.lunch ? '1' : '0'
      }
      this.loading = true
      await this.$axios.post('payment/request',body).then(res=>{
        window.location.href = res.data.url;
        this.loading = false
      }).catch(e=>{
        this.$toast.error("مشکلی در ارتباط با درگاه پیش آمده است، لطفا دوباره تلاش کنسد")
      })
    }
  },
  mounted() {
    this.$axios.$get('/account/profile').then(res=>{
      this.payed=res.is_paid
    })
  },

};
</script>

<style></style>
