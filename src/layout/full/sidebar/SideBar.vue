<template lang="html">

   <div id="parentx">
    <vs-sidebar default-index="1" :parent="parent" :hiddenBackground="doNotClose" color="primary" class="sidebarx" spacer v-model="isSidebarActive" :click-not-close="doNotClose" >
        <div class="header-sidebar text-center" slot="header">
            <vs-avatar size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>
            <h4>{{ `${currentUser.name} ${currentUser.family}` }}<br/>
              <small>{{ `${currentUser.position}` }}</small>
            </h4>
        </div>

        <template v-for="(sidebarLink, groupIndex) in sidebarLinks" >
            <vs-sidebar-group
                    v-if="sidebarLink.children"
                    :icon="sidebarLink.icon"
                    :to="sidebarLink.url"
                    :key="`sidebarLinkGroup-${groupIndex}`"
                    :index="index"
                    :title="sidebarLink.name">

                    <template v-for="(children, index) in sidebarLink.children">
                        <vs-sidebar-item
                                :icon="children.icon"
                                :to="children.url"
                                :key="`sidebarLinkInterGroup-${groupIndex}-${index}`"
                                :index="index">
                            <span class="hide-in-minisidebar">{{ children.name }}</span>
                        </vs-sidebar-item>
                    </template>
            </vs-sidebar-group>

            <vs-sidebar-item v-else :icon="sidebarLink.icon" :to="sidebarLink.url"
                             :key="`sidebarLink-${index}`" :index="index">
                <span class="hide-in-minisidebar">{{ sidebarLink.name }}</span>
            </vs-sidebar-item>
        </template>

<!--        <div class="footer-sidebar" slot="footer">-->
<!--            <vs-button icon="reply" color="danger" type="flat" href="">Вернуться на сайт</vs-button>-->
<!--        </div>-->

    </vs-sidebar>
  </div>


</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line no-unused-vars
import {currentUser} from "../../../app/auth/vuex/getters";
export default {
  name: "SideBar",
  props: {
    parent: {
        type: String
    },
    sidebarLinks: {
      type: Array,
      required: true,
    },
    index: {
        default: null,
        type: [String, Number]
    }
  },
  data:()=>({
    doNotClose: false,
    windowWidth: window.innerWidth,
  }),
  computed: {
      ...mapGetters([
          'currentUser',
          'isLogged',
          'appSettings'
      ]),

      isSidebarActive: {
        get() {
          return this.$store.state.isSidebarActive
        },
        set(val) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', val)
        }
      }
   },
   methods : {
      handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth;
            this.setSidebar();
        },
      setSidebar() {
        if (this.windowWidth < 1170) {
          this.$store.commit('IS_SIDEBAR_ACTIVE', false);
          this.doNotClose= false
        }
        else {
          this.$store.commit('IS_SIDEBAR_ACTIVE', true);
          this.doNotClose= true
        }
      }
  },
  mounted() {
      this.$nextTick(() => {
            window.addEventListener('resize', this.handleWindowResize);
        });
      this.setSidebar();
    },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.setSidebar();
  }
}
</script>
