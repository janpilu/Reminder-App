<template>
  <q-page class="bg-grey-3 column block">
    <q-card
      v-for="(reminder,index) in reminders"
      :key="reminder.title"
      clickable
      @click="reminder.active = !reminder.active"
      :class='["reminder q-mx-sm q-mt-md"]'
    >
    <q-card-section
    horizontal
    class="row">
      <q-card-section
        :class='["col "+"bg-"+reminder.color, reminder.active ? "reminder-active":"reminder-inactive"]'
      >
        <div class="text-overline" v-if="reminder.active">Active</div>
        <div class="text-overline" v-else>Inactive</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{reminder.title}}</div>
        <div class="text-caption text-white description ">
          {{reminder.description}}
        </div>
      </q-card-section>
      <q-card-section 
        class="bg-white absolute-right q-pa-xs row">
        <q-card-actions vertical class="justify-center reminder-options">
          <q-btn 
            @click.stop="edit(reminder)"
            flat 
            round 
            color="accent" 
            icon="edit" />
          <q-btn 
          class="self-center"
            flat 
            round 
            color="red" 
            icon="delete" 
            @click.stop="confirmDelete(index)"/>
        </q-card-actions>
      </q-card-section>
      </q-card-section>
    </q-card>

    <q-dialog v-model="newReminderPopup" transition-show="scale" transition-hide="scale" @hide="refresh">
      <NewReminder :current="currentReminder"></NewReminder>
    </q-dialog>

    <q-btn 
      @click="add"
      
      round 
      color="primary" 
      icon="add" 
      size="lg" 
      class="fixed-bottom-right q-mr-lg q-mb-lg" />
  </q-page>
</template>


<script>
import { LocalStorage } from 'quasar'
import NewReminder from '../components/NewReminder'

export default {
  components: {
    NewReminder
  },
  data() {
    return{
      reminders:[],
      newReminderPopup:false,
      currentReminder:''
    }
  },
  created: function () {
    if(this.$q.localStorage.getItem("reminders")==null){
      this.$q.localStorage.set("reminders", JSON.stringify(this.reminders));
      window.console.log("empty")
    }else{
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
      window.console.log("full")
    }
  },
  methods:
  {
    confirmDelete (index) {
      this.$q.dialog({
      title: 'Delete',
      message: 'Are you sure that you want to delete this reminder?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      this.reminders.splice (index, 1)
      this.$q.localStorage.set("reminders", JSON.stringify(this.reminders));
    })
    },
    showNotif () {
      this.$q.notify({
        message: 'Reminder Deleted',
        icon: 'delete_outline'
      })
    },
    refresh(){
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
    },
    add(){

      this.newReminderPopup = true;

/** 
      let reminders = [
        {
          title:'Drink Water',
          description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          active:true,
          activeon:[
            0,1,2,3,4,5,6
          ],
          color:'light-blue-5',
          time:[
            "10:00",
            "18:00"
          ]
        },
        {
          title:'Eat Food',
          description:'Breakfeast',
          active:true,
          activeon:[
            0,1,2,3,4,5,6
          ],
          color:'light-green-5',
          time:[
            "10:00",
            "18:00"
          ]
        }
      ]

      window.console.log("add");
      
      let bo =this.$q.localStorage.get.item("reminders");
      window.console.log(JSON.parse(bo));
      this.reminders = JSON.parse(this.$q.localStorage.get.item("reminders"))
      */
    },
    edit(reminder){
      this.currentReminder = reminder;
    }
  }
}
/**
 * [
        {
          title:'Drink Water',
          active:true,
          activeon:[
            0,1,2,3,4,5,6
          ],
          color:'light-blue-5',
          time:[
            "10:00",
            "18:00"
          ]
        },
        {
          title:'Eat Food',
          active:true,
          activeon:[
            0,1,2,3,4,5,6
          ],
          color:'light-green-5',
          time:[
            "10:00",
            "18:00"
          ]
        }
      ]
 */
</script>  

 
<style lang="scss">
.reminder{

}
.reminder-inactive{
  filter: grayscale(0.71);
}
.reminder-options{
  filter: grayscale(0) !important;
}
.description{
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
}

</style>
