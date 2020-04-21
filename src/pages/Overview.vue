<template>
  <q-page class="bg-grey-3 column">
    <q-list 
      class="bg-white"
      separator
      bordered>
      <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->

      <q-item 
        v-for="(reminder,index) in reminders"
        :key="reminder.title"
        clickable
        @click="reminder.active = !reminder.active"
      v-ripple>
        <q-item-section avatar>
          <q-checkbox 
            
            v-model="reminder.active"
            :color="reminder.color" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="reminder.active ? 'reminder-active' : 'reminder-inactive'">{{reminder.title}}</q-item-label>
        </q-item-section>
        <q-item-section
        side>
        <q-btn 
        @click.stop="confirmDelete(index)"
        round 
        dense
        icon="delete" 
        :color="reminder.color"/>
        </q-item-section>
      </q-item>
    </q-list>
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
export default {
  data() {
    return{
      reminders:LocalStorage.getItem("reminders")
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
    })
    },
    showNotif () {
      this.$q.notify({
        message: 'Reminder Deleted',
        icon: 'delete_outline'
      })
    },
    add(){
      window.console.log("add")
      
      this.$q.sessionStorage.set("reminders", "hello")
      let bo =this.$q.localStorage.get.item("reminders")
      window.console.log(bo)
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
.reminder-active{
  color: black;
}
.reminder-inactive{
  color: gray;
}
</style>
