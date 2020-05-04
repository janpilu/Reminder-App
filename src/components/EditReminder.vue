<template>
    <q-card 
      :class="'new-reminder-card'"
      ref="card">
      <q-card-section>
        <q-card-section horizontal>
            <q-card-section class="col-9">
              <div class="text-h6">Edit Reminder</div>
            </q-card-section>
            <q-card-section class="col-3 q-pb-none">
              <q-fab 
                :color="color" 
                text-color="black" 
                icon="colorize" 
                direction="down" >
                <q-fab-action color="remindergreen" @click="toggleColor('remindergreen')" />
                <q-fab-action color="reminderyellow" @click="toggleColor('reminderyellow')" />
                <q-fab-action color="reminderred" @click="toggleColor('reminderred')" />
                <q-fab-action color="reminderblue" @click="toggleColor('reminderblue')" />
                <q-fab-action color="reminderpurple" @click="toggleColor('reminderpurple')" />
              </q-fab>
            </q-card-section>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card-section class="q-px-none">
            <q-input v-model="title" label="Title" />
            <q-input v-model="description" label="Description (Optional)" />
          </q-card-section>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="row justify-center col-3">
              <q-checkbox 
                left-label
                v-model="everyday" 
                label="Daily" 
                @input="toggleEveryday"/>
            </q-card-section>
            <q-card-section class="q-pr-none col-9">
              <q-select
                class="select-frequency"
                filled
                v-model="days"
                multiple
                use-chips
                stack-label
                :disable="everyday"
                :options="dayOptions"
                label="Days"
                />
            </q-card-section>
          </q-card-section>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="row justify-center col-3">
              <q-checkbox 
                left-label
                v-model="once" 
                label="Once" 
                @input="toggleOnce"/>
            </q-card-section>
            <q-card-section class="q-pr-none col-9">
              <q-select
                class="select-frequency"
                filled
                v-model="amount"
                :disable="once"
                :options="amountOptions"
                label="Frequency"
                @input="setSpreadTime"
                />
            </q-card-section>
          </q-card-section>
          <q-separator />
          <div v-if="amount>5">
            <q-card-section class="q-px-none">
              <q-checkbox 
                  v-model="spread" 
                  label="Spread evenly across the day?"
                  @input="setSpreadTime" 
                  />
            </q-card-section>
            <q-separator />
          </div>
          <div v-if="spread">
            <q-card-section>
              <q-range
                v-model="range"
                :min="0"
                :max="24"
                :step="1"
                label-always
                color="accent"
                @change="setSpreadTime"
              />
            </q-card-section>
            <q-separator />
          </div>
          <div v-if="!spread">
            <q-card-section>
              <q-input
                v-for="n in amount" 
                :key="n"
                filled 
                v-model="time[n-1]" 
                mask="time" 
                :rules="['time']">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time 
                        v-model="time[n-1]" 
                        format24h
                        />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
          </div>


          

        </q-card-section>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" @click="createReminder" :disable="!isFilled()" v-close-popup />
      </q-card-actions>
      
    </q-card>
</template>

<script>
import { date } from 'quasar'
import { LocalStorage } from 'quasar'
export default {
  name:"EditReminder",
  props:[
    'current'
  ],
  computed:{

  },
  data(){
    return{
      colorVisible:false,
      title:current.title,
      color:current.color,
      description:current.description,
      days:current.days,
      everyday:current.everyday,
      once:current.once,
      spread:current.spread,
      amount:current.amount,
      time:current.time,
      range:current.range,

      dayOptions:[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      amountOptions:[
        1,2,3,4,5,6,7,8,9,10,11,12
      ]

    }
  },
  methods:{
    toggleEveryday(){
      if(this.everyday){
        this.days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];
      }
    },
    toggleOnce(){
      if(this.once){
        this.amount = 1;
      }
    },
    createReminder(){
      let reminders = this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
      let reminder = {
          title:this.title,
          description:this.description,
          active:true,
          activeon:[],
          color:this.color,
          time:[]
        };
        for (var day in this.days){
          reminder.activeon.push(this.days[day]);
        }
        for (var t in this.time){
          reminder.time.push(this.time[t]);
        }
        reminders.push(reminder);
        this.$q.localStorage.set("reminders", JSON.stringify(reminders));
    },
    isFilled(){
      if(this.title ===""||this.days.length==0||this.amount==0||(this.time.length!=this.amount&&this.spread==false)){
        return false
      }else{
        return true
      }
    },
    toggleColor(color){
      this.color = color;
    },
    setSpreadTime(){
      
      if(this.spread){

        if(this.range.max==this.range.min){
          if(this.range.min==0){
            this.range.max++
          }
          else this.range.min--
        }

        this.time =[]
        let timespan = this.range.max-this.range.min
        timespan *=60
        timespan /= this.amount
        
        let newDate = date.buildDate({ hours:this.range.min, minutes:0})
        for(let i = 1;i<=this.amount;i++){
          let temp = new Date(newDate.getTime())
          console.log(temp)
          temp = date.addToDate(temp,{minutes:timespan*i})
          let text = date.formatDate(temp, 'HH:mm')
          
          this.time.push(text)
        }
      }
    }

  }
}
</script>
<style lang="scss">
.new-reminder-card{
  width: 100%;
}
.select-frequency{
  width:100%;
}

</style>