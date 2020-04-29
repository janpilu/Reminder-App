<template>
  <q-page class="flex block">
    <div class="q-py-md q-pr-md row">
      <div v-for=" (r, i) in this.alltoday" :key="i" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 ">
        <q-card 
        v-if="r.active"
        @click="activeTime = r.time[0],activeDesc = r.description,activeTitle = r.title,activeColor = r.color,more=true"
        :class='["card q-ml-md q-mb-md bg-"+r.color,isPast(r.time[0]),{active: i === activeItem}]'
        ><!--:class='["card q-ml-md q-mb-md bg-"+r.color,isPast(r.time[0]),]'-->
          <q-card-section vertical>
            <div class="text-h6 card-title">{{r.title}}</div>
            <div class="text-subtitle2 card-description">{{r.description}}</div>
          </q-card-section>
          <q-card-section class="q-mt-none q-pt-none">
           <div class="text-subtitle2">{{r.time[0]}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="more">
      <q-card :class='"cardpopup bg-"+activeColor'>
        <q-card-section class="popup-content q-pa-none" vertical>
          <q-card-section class="row justify-between">
            <div class="text-h5 col-8 popup-title">{{activeTitle}}</div>
            <div class="text-h6  col-2-xl self-center justify-right">{{activeTime}}</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll popup-description">
            <p>{{activeDesc}}</p>
          </q-card-section>

          <q-separator />

          <q-card-actions class="popup-bottom self-end" align="right">
            <q-btn flat label="Close" v-close-popup @click="active=null"/>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { date } from 'quasar';
document.addEventListener('deviceready', () => {
  // it's only now that we are sure
  // the event has triggered
}, false)
export default {

  
  data(){
    return{
      activeTime: null,
      activeDesc: null,
      activeTitle: null,
      activeItem: null,
      activeColor: null,
      todaysReminders:[],
      reminders:[],
      alltoday:[],
      split:[],
      more:false
    }
  },
  methods:{
    getTodaysReminders(){
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
      let temp = Object.assign({}, this.reminders);
    
      for(let reminder in temp){
        if(temp[reminder].activeon.includes(this.todaysDay)){
          this.alltoday.push(temp[reminder])
        }
      }
    },
    selectCard(i) {
      this.activeItem = i;
    },
    notif(){
      for(let r of this.alltoday){

        let h = r.time[0].slice(0,2)
        let m = r.time[0].slice(3)

        window.console.log(h+" "+m)

        let adjustedDate = date.adjustDate(Date.now(), { hours: h, minutes: m, seconds: 0 })
        window.console.log(adjustedDate+ r.title)
        cordova.plugins.notification.local.schedule({
          title: r.title,
          text: r.description,
          foreground: true,
          trigger: { at: adjustedDate }
        })
      }
    },
    splitReminder(){
      let alltemp = this.alltoday.slice(0)
      for(let i=0;i<this.alltoday.length;i++){
        console.log(i+this.alltoday[i].title)
        let temp=[];
        if(this.alltoday[i].time.length>1){
          
          let times = this.alltoday[i].time.slice(0);
          for(let j=0;j<times.length;j++){
            temp.push(Object.assign({}, this.alltoday[i]))
            temp[j].time=[times[j]]
          }
          console.log(alltemp)
          alltemp = alltemp.concat(temp)
        }
      }
      let filtered = alltemp.filter(rem => rem.time.length==1)
      this.alltoday= filtered;
    },
    sortReminder(){
      this.alltoday.sort(function(b,a){

        const datea = date.extractDate(a.time[0], 'HH:mm')
        const dateb = date.extractDate(b.time[0], 'HH:mm')
        window.console.log(datea)
        return dateb - datea;
      });
    },
    isPast(time){
      let temp = [time, this.currentTime]
      temp.sort(function(b,a){
        const datea = date.extractDate(a, 'HH:mm')
        const dateb = date.extractDate(b, 'HH:mm')
        return dateb - datea;
      });
      if (temp[0]===time){
        return 'past'
      }
      return ''
    },
    isPastMe(time){
      let temp = [time, this.currentTime]
      temp.sort(function(b,a){
        const datea = date.extractDate(a, 'HH:mm')
        const dateb = date.extractDate(b, 'HH:mm')
        return dateb - datea;
      });
      if (temp[0]===time){
        return true
      }
      return false
    }


  },
  computed:{
    //...mapState('store', ['reminders']),
    todaysDay(){
      return date.formatDate(Date.now(), 'dddd');
    },
    currentTime(){
      return date.formatDate(Date.now(), 'HH:mm');
    }
  },
  created(){
    console.log("hu")
    this.getTodaysReminders()
    this.splitReminder()
    this.sortReminder()
    this.notif()
  }
}
</script>
<style lang="scss">
.card{
  height: 124px;
}
.past{
  filter: grayscale(70%);
}
.card-title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-description{
  overflow: hidden;
  text-overflow: ellipsis;
}
.popup-title{
  word-wrap: break-word;
}
.cardpopup{
  min-width: 80% !important;
  min-height: 40%;
}
.popup-description{
  min-height: 9rem;
  font-size: 14pt;
}
.popup-content{
  height: auto;
}
</style>