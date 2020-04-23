<template>
  <q-page class="bg-grey-3 column block">
    <q-card
      v-for="(reminder,index) in reminders"
      :key="reminder.title + index"
      clickable
      @click="toggleActive(index)"
      class="reminder q-mx-sm q-mt-md"
    >
    <q-card-section
    horizontal>
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
      <q-card-section class="row q-pa-none" >
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

    <q-dialog v-model="newReminderPopup" transition-show="scale" transition-hide="scale" @hide="pull">
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
import{mapActions} from 'vuex'
import{mapState} from 'vuex'
import { LocalStorage } from 'quasar'
import NewReminder from '../components/NewReminder'

export default {
  components: {
    NewReminder
  },
  computed:{

  },
  data() {
    return{
      newReminderPopup:false,
      currentReminder:'',
      reminders:[]
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
  methods:{
  
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
    pull(){
      this.reminders = JSON.parse(this.$q.localStorage.getItem("reminders"));
    },
    push(){
      this.$q.localStorage.set("reminders", JSON.stringify(this.reminders));
    },
    add(){
      this.newReminderPopup = true;
    },
    edit(reminder){
      this.currentReminder = reminder;
    },
    toggleActive(i){
      this.reminders[i].active = !this.reminders[i].active;
      this.push();
    }
  }
}

</script>  

 
<style lang="scss">
.reminder{
  min-height: 108px;
}
.reminder-active{
  min-height: 108px;
  height: auto;
}
.reminder-inactive{
  min-height: 108px;
  height: 100%;
  filter: grayscale(0.71);
}
.reminder-options{
  height: 100%;
  filter: grayscale(0) !important;
}
.description{
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
}

</style>
