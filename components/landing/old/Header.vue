<template>
  <div id="header">
    <v-dialog fullscreen v-model="showMenu" transition="fade-transition">
      <v-btn icon @click="showMenu = !showMenu" class="ma-3">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex flex-column align-center justify-center" style="height: 85%">
        <v-btn v-if="isAuthenticated" plain :ripple="false" text tile :class="getClass()" to="/dashboard">داشبورد</v-btn>
        <v-btn plain :ripple="false" text tile :class="getClass()" to="/">خانه</v-btn>
        <v-btn plain :ripple="false" text tile :class="getClass()" to="/faq">سوالات متداول</v-btn>
        <v-btn plain :ripple="false" text tile :class="getClass()" to="/blog">اخبار</v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/history">تاریخچه</v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/live">لایو</v-btn>
      </div>
    </v-dialog>
    <v-app-bar flat absolute :color="color">
      <v-btn icon class="transparent hidden-sm-and-up" @click="showMenu = !showMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div class="hidden-xs-only" id="menu">
        <v-btn v-if="!isAuthenticated" plain text :ripple="false" tile :class="`${getClass()}`" @click="toggleShow('login')">
          <v-icon left>mdi-shield-star</v-icon>
          <span class="font-weight-bold">ورود</span>
        </v-btn>
         <v-btn v-if="!isAuthenticated" plain text :ripple="false" tile :class="`${getClass()}`" @click="toggleShow('signUp')">
          ثبت‌نام
        </v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/">
          خانه
        </v-btn>
        <v-btn v-if="isAuthenticated" plain text :ripple="false" tile :class="getClass()" to="/dashboard">
          داشبورد
        </v-btn>
        <v-btn plain text tile :class="getClass()" to="/blog">
          اخبار
        </v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/faq">
          سوالات متداول
        </v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/history">
          تاریخچه
        </v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/live">
          لایو
        </v-btn>
        <sponsers-dropdown></sponsers-dropdown>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" plain text tile :class="`${getClass()} hidden-sm-and-up`" @click="toggleShow('login')">
        <v-icon left>mdi-shield-star</v-icon>
        <span class="font-weight-bold">ورود</span>
      </v-btn>
      <v-spacer></v-spacer>

      <nuxt-link to="/" style="width: 56px; height: 100%">
        <img src="logo__white.svg" class="logo" v-if="color === 'primary'" />
        <img src="../../../assets/images/logo/logo__primary.svg" class="logo" v-else />
      </nuxt-link>
    </v-app-bar>
    <formManager :isPage="false" />
  </div>
</template>
<script>

import SponsersDropdown from './SponserDropdown';
import { mapState } from 'vuex';

export default {
  props: ['color'],
  data() {
    return {
      showMenu: false,
    };
  },
  components: {
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
    getClass() {
      return (this.color === 'primary' ? 'hover_primary ' : 'hover_white ') + 'transparent py-8 text-h5 text-sm-subtitle-2';
    },
  },
};
</script>
<style lang="scss">
#header {
  position: relative;
  .mobile-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
      display: block;
    }
  }
  .logo {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 56px;
  }
  .navLinks {
    height: calc(100% - 200px);
  }
  #menu {
    transition: 0.4s;
  }
  .v-toolbar__content {
    padding-bottom: 0 !important;
    align-items: flex-end;
  }
  .hover_white {
    &.v-btn--active,
    &:hover {
      color: var(--v-anchor-base);
      transition: all 0.7s;
    }
  }
  .hover_primary {
    &.v-btn--active,
    &:hover {
      transition: all 0.7s;
    }
  }
  .v-btn--active #header {
    background-color: #090c18;
  }
}
</style>
