<template>
  <div>
    <div v-for="(tornament,index) in tournaments" :key="index" class="ma-10">
      <h1 class="font-weight-bold mb-5">{{tornament.title}}</h1>
      <div class="final">
        <iframe
            :src=tornament.iframe
            width="100%"
            height="500"
            frameborder="0"
            scrolling="auto"
            allowtransparency="true"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "results",
  layout :'dashboard',
  data(){
    return{
      tournaments: [
        {
          title:'تک حذفی مقدماتی',
          iframe:'https://challonge.com/heloxm1j/module'
        }
      ]
    }
  }
}
</script>

<style scoped>
.final {
  position: relative;
}
</style>