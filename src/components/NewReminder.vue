<template>
    <q-card class="new-reminder-card">
      <q-card-section>
        <q-card-section>
          <div class="text-h6">New Reminder</div>
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
                />
            </q-card-section>
          </q-card-section>
          <q-separator />
          <div v-if="amount>5">
            <q-card-section class="q-px-none">
              <q-checkbox 
                  v-model="spread" 
                  label="Spread evenly across the day?"
                  @input="createReminder" 
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
                v-model="time[n]" 
                mask="time" 
                :rules="['time']">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time 
                        v-model="time[n]" 
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
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" @click="createReminder" v-close-popup />
      </q-card-actions>
      
    </q-card>
</template>

<script>
import { date } from 'quasar'
import { LocalStorage } from 'quasar'
export default {
  name:"NewReminder",
  props:[
    'current'
  ],
  data(){
    return{
      title:'',
      description:'',
      days:[],
      everyday:false,
      once:true,
      spread:false,
      amount:1,
      time:[],
      range:{
        "min":6,
        "max":22
      },

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
      let reminder = {
          title:this.title,
          description:this.description,
          active:true,
          activeon:[],
          color:'red',
          time:[]
        };
        for (var day in this.days){
          reminder.activeon.push(this.days[day]);
        }

        let temp = JSON.parse(this.$q.localStorage.getItem("reminders"));
        window.console.log(temp)
        temp.push(reminder);
        this.$q.localStorage.set("reminders", JSON.stringify(temp));
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