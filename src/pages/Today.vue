<template>
  <q-page class="flex row">
    <div class="q-pa-md row col-12">
      <div v-for=" r in todaysReminders" :key="r.title">
        <q-card 
        :class='"q-ml-md bg-"+r.color'
        >
          <q-card-section>
            <div class="text-h5">{{r.title}}</div>
          </q-card-section>
          <q-card-section>
           
          </q-card-section>
        </q-card>
      </div>
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
      reminders:[]
    }
  },
  methods:{
    getTodaysReminders(){
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
      let alltoday = []
      for(let reminder in this.reminders){
        if(this.reminders[reminder].activeon.includes(this.todaysDay)){
          alltoday.push(this.reminders[reminder])
          window.console.log(alltoday)
          window.console.log(this.reminders)
        }
      }
      
      let i = 0
      for(let reminder of alltoday){
        if(reminder.time.length>1){
          window.console.log(reminder.time)
          let j = 0;
          let temp =[]
          for(let timestamp of reminder.time){
            temp.push(reminder)

            window.console.log(timestamp)
            temp[j].time = [timestamp];
            window.console.log(temp[j].time)

            j++
          }
          window.console.log(temp)
        }
        i++
      }




          /** 
        if(alltoday[reminder].time.length>1){
          window.console.log(alltoday[reminder].time)
          let times = alltoday[reminder].time; 
          let temps = [];
          let i = 0;
          for(let r of alltoday[reminder].time){
            temps.push(alltoday[reminder])
            window.console.log(temps)
            temps[i].time=[times[i]]
            window.console.log(r)
            window.console.log(temps[i])
            //temps[i].time.push(r)
            i++
          }
          window.console.log(temps)
          //alltoday.splice(reminder)
          //alltoday.concat(times)
        }
      }
      for(let reminder in alltoday){
        window.console.log(alltoday)
      }
      this.todaysReminders=alltoday;
      */
    }

  },
  computed:{
    //...mapState('store', ['reminders']),
    todaysDay(){
      return date.formatDate(Date.now(), 'dddd');
    }
  },created(){
    console.log("hu")
    this.getTodaysReminders()
  }
}
</script>
