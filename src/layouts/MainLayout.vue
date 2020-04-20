<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Reminder</div>
        <div class="text-subtitle1">{{currentDate}}</div>
      </div>
      <q-img
        src="statics/clock.jpg" class="header-background absolute-top"/>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px;">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            
          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top" src="statics/sky.jpg" style="height: 192px">
          <div class="absolute-bottom bg-transparent">
            <div class="drawer-clock absolute-top">
              <div class="text-h3">
                {{currntTime}}
              </div>
            </div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed:{
    currentDate(){
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    },
    currntTime(){
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'HH : mm')
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss">
  .header-background{
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
  .drawer-clock{
    height: 192px;
  }
</style>