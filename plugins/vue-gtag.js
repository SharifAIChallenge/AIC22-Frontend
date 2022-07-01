import Vue from "vue";
import VueGtag from "vue-gtag";

if (process.env.MODE!== 's'){
    Vue.use(VueGtag,{
        config : {id:'G-2DNVGX37MJ'},
        appName: 'AIChallenge'
    })
}