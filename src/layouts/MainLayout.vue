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
            <q-item
              to="/"
              exact
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon name="assignment" />
              </q-item-section>

              <q-item-section>
                Today
              </q-item-section>
            </q-item>
            <q-item
              to="/overview"
              exact
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Overview
              </q-item-section>
            </q-item>

            
          </q-list>
        </q-scroll-area>
        <div class="text-h3 drawer-time absolute-top q-mt-xl q-pt-md q-px-lg text-white">
                  {{currentTime}}
              </div>
        <div style="height: 192px" class="absolute-top bg-secondary drawer-bg-layer">
        </div>
      </q-drawer>

    <q-page-container>
      <keep-alive>
      <router-view />
      </keep-alive>
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
    currentTime(){
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

  .drawer-background{
    height: 100%;
    opacity: 0.2;
    z-index: -1;
    filter: grayscale(100%);
  }

  .drawer-bg-layer{
    opacity: 1;
    z-index: -1;
    
  }

  .drawer-time{
    opacity: 1;
  }

  .drawer-clock{
    height: 192px;
  }
</style>