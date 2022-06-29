// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '647322404090-kfk97r3lbea4q92pcnu2mf35jjc224df.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'select_account',
  fetch_basic_profile: false
};
Vue.use(GAuth, gauthOption);
