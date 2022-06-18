// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '366828355085-pdam0sqbsvrpm4bcodkbhkg51mlg56am.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
