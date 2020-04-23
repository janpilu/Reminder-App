<template>
  <q-page class="flex block">
    <div class="q-pa-md row col-12">
        <q-card 
        v-for=" r in this.alltoday" :key="r.title + r.time"
        :class='["card q-ml-md q-mb-md bg-"+r.color]'
        ><!-- ,this.isPast(r.time[0]) ? "past": "past"-->
          <q-card-section>
            <div class="text-h5">{{r.title}}</div>
          </q-card-section>
          <q-card-section>
           <div class="text-subtitle2">{{r.time[0]}}</div>
          </q-card-section>
        </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { date } from 'quasar';
export default {

  
  data(){
    return{
      todaysReminders:[],
      reminders:[],
      alltoday:[],
      split:[]
    }
  },
  methods:{
    getTodaysReminders(){
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
      window.console.log(this.reminders)
      let temp = Object.assign({}, this.reminders);
    
      for(let reminder in temp){
        if(temp[reminder].activeon.includes(this.todaysDay)){
          this.alltoday.push(temp[reminder])
        }
      }
    },
    splitReminder(){
      let alltemp = this.alltoday.slice(0)
      for(let i=0;i<this.alltoday.length;i++){
        console.log(i+this.alltoday[i].title)
        let temp=[];
        if(this.alltoday[i].time.length>1){
          
          let times = this.alltoday[i].time.slice(0);//works
          //console.log(times)
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
      let temp = [time, currentTime]
      this.temp.sort(function(b,a){
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
  },created(){
    console.log("hu")
    this.getTodaysReminders()
    this.splitReminder()
    this.sortReminder()
  }
}
</script>
<style lang="scss">
.card{
  height: auto;
}
.past{
  filter: grayscale(100%);
}
</style>