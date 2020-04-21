<template>
    <q-card>
      <q-card-section>
        <q-card-section>
          <div class="text-h6">New Reminder</div>
        </q-card-section>

        <q-card-section class="q-pt-none" horizontal>
          <q-card-section >
            <q-input v-model="title" label="Title"/>
            <q-input v-model="description" label="Description (Optional)" class="col"/>
          </q-card-section>
          <q-card-section>
            <q-select
              filled
              v-model="days"
              multiple
              use-chips
              stack-label
              :disable="everyday"
              :options="dayOptions"
              label="Days"
              style="width: 250px"/>
            <q-checkbox 
              v-model="everyday" 
              label="Everyday" 
              @input="toggleEveryday"/>
          </q-card-section>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card-section>
      </q-card>
</template>

<script>
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

      dayOptions:[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]

    }
  },
  methods:{
    toggleEveryday(){
      if(this.everyday){
        this.days = [];
        this.title = this.$props.current.title;
      }
    },
  },
  created(){
      
    }
}
</script>
