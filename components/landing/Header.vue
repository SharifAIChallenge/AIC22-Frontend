<template>
  <div id="header">
    <v-dialog fullscreen v-model="showMenu" transition="fade-transition">
      <v-btn icon @click="showMenu = !showMenu" class="ma-3">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex flex-column align-center justify-center" style="height: 85%">
        <v-btn v-if="isAuthenticated" plain text tile to="/dashboard">داشبورد</v-btn>
        <v-btn v-if="!isAuthenticated" plain text tile to="/signup">ثبت‌نام</v-btn>
<!--        <v-btn v-if="!isAuthenticated" plain text tile to="/login">ورود</v-btn>-->
        <v-btn
            v-for="(item,index) in items"
            :key="index"
            plain
            text
            rounded
            :to="item.href"
        >
          {{ item.text }}
        </v-btn>
      </div>
    </v-dialog>
    <v-app-bar
        fixed
        elevation="10"
        height="auto"
    >
      <v-btn id="menu-btn" icon class="transparent hidden-md-and-up" @click="showMenu = !showMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div class="hidden-sm-only hidden-xs-only" id="menu">
        <v-container
        >
          <v-row
              class="justify-center align-center"
          >
            <v-col cols="3">
              <div v-if="!isAuthenticated">
                <v-btn
                    v-if="!isAuthenticated"
                    color="primary"
                    rounded
                    to="/signup"
                    class="ml-4 px-6 v-btn--primary"
                >
                  ثبت‌نام
                </v-btn>
<!--                <v-btn v-if="!isAuthenticated"-->
<!--                       rounded-->
<!--                       class="px-6 v-button&#45;&#45;secondary"-->
<!--                       to="/login"-->
<!--                >-->
<!--                  <span class="font-weight-bold">ورود</span>-->
<!--                </v-btn>-->
              </div>
              <div v-else>
                <v-btn v-if="isAuthenticated" plain text :ripple="false" tile to="/dashboard">
                  داشبورد
                </v-btn>
              </div>

            </v-col>
            <v-col class="text-center" cols="6">
              <v-btn
                  v-for="(item,index) in items"
                  :key="index"
                  plain
                  text
                  rounded
                  small
                  :to="item.href"
              >
                {{ item.text }}
              </v-btn>

              <sponsers-dropdown></sponsers-dropdown>
            </v-col>
            <v-col class="text-left" cols="3">
              <nuxt-link to="/" class="d-flex align-center justify-end">
                <img src="~/assets/images/logo/header-logo-01.svg" width="80px" height="80px" alt="logo"/>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>


      </div>
    </v-app-bar>
    <formManager :isPage="false"/>
  </div>
</template>
<script>
import formManager from '~/components/userForms/formManager';
import SponsersDropdown from './old/SponserDropdown';
import {mapState} from 'vuex';

export default {
  data() {
    return {
      showMenu: false,
      items: [
        {
          text: 'خانه',
          icon: 'mdi-home',
          href: '/'
        },
        // {
        //   text: 'اخبار',
        //   icon: 'mdi-newspaper',
        //   href: '/blog'
        // },
        {
          text: 'سوالات متداول',
          icon: 'mdi-help-circle',
          href: '/faq'
        },
        {
          text: 'تاریخچه',
          icon: 'mdi-history',
          href: '/history'
        },
        // {
        //   text: 'لایو',
        //   icon: 'mdi-play',
        //   href: '/live'
        // },
      ]
    };
  },
  components: {
    formManager,
    'sponsers-dropdown': SponsersDropdown,
  },
  computed: {
    ...mapState({
      show: state => state.formStatus.show,
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },
  methods: {
    toggleShow(mode) {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', mode);
    },

  },
};
</script>
<style lang="scss">
.h-full {
  height: 100%;
}

.v-toolbar__content {
  display: block;
}

#menu {

  .col {
    padding: 0;
  }
}

</style>
