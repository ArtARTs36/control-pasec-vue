<template>
	<header class="gridx">
		<vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar" text-color="rgba(255,255,255,0.7)" active-text-color="rgba(255,255,255,1)">
      <!---
      Template logo
      -->
      <div slot="title" class="themelogo">
        <img width="32" height="32"
                :src="require('@/assets/images/logo/logo.png')"
                alt="Dashboard"/>
        <span class="logo-text" v-if="title">{{ title }}</span>
      </div>
      <!---
      Mobile toggle
      -->
      <div slot="title">
        <div class="hiddenDesktop cursor-pointer" @click.stop="activeSidebar"><vs-icon icon="menu"></vs-icon></div>
      </div>

      <vs-spacer></vs-spacer>

      <user-notification></user-notification>

      <user-messages></user-messages>
      <!---
      Craete new dd
      -->
      <vs-dropdown  vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3">
         <a class="text-white-dark user-image" href="#"><img :src="currentUser.avatar_url" alt="User"/></a>
        <vs-dropdown-menu class="topbar-dd">

            <router-link :to="{ name: 'Profile', params: { id: currentUser.id }}" tag="vs-dropdown-item">
                <vs-icon icon="person_outline" class="mr-1"></vs-icon> Мой профиль
            </router-link>

            <router-link :to="{ name: 'DialogsList' }" tag="vs-dropdown-item">
                <vs-icon icon="mail_outline" class="mr-1"></vs-icon>
                Диалоги
            </router-link>

            <hr class="mb-1" />

            <vs-dropdown-item @click="isSearchModalActive = true">
                <vs-icon icon="face" class="mr-1"></vs-icon>
                Найти пользователя
            </vs-dropdown-item>

            <vs-dropdown-item @click="logoutUser">
                <vs-icon icon="arrow_back"
                         class="mr-1"
                >
                </vs-icon>
                Выйти
            </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>

    </vs-navbar>

    <profile-search v-bind:is-active="isSearchModalActive"
       @closeModal="isSearchModalActive = false"
    >
    </profile-search>

	</header>

</template>

<script>
import store from '../../../store/store';
import { logout } from '@/app/auth/vuex/actions';
import {mapGetters} from "vuex";
import UserNotification from "./UserNotification";
import UserMessages from "./UserMessages";
import ProfileSearch from "./ProfileSearch";
export default {
	name : 'Navbar',
    components: {UserNotification, UserMessages, ProfileSearch},
    props: {
      topbarColor: {
          type: String,
          default: "#2962ff",
      },
      title: {
            type: String,
      },
      logo: {
          type: String
      },
  },
  data:()=>({
    indexActive: 0,
    showToggle: false,
    isSearchModalActive: false,
  }),
    computed: {
        ...mapGetters([
            'currentUser',
        ]),
    },
  methods: {
      //This is for sidebar trigger in mobile
      activeSidebar() {
          this.$store.commit('IS_SIDEBAR_ACTIVE', true);
      },

      logoutUser() {
            store.dispatch('logout');
      },
      closeSearchModal() {
          this.isOpenModalResult = false;
      },
  }
}
</script>
