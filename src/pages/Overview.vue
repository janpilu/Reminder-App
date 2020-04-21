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
        v-for="reminder in reminders"
        :key="reminder.title"
      v-ripple>
        <q-item-section avatar>
          <q-checkbox 
            val="teal" 
            v-model="reminder.active"
            :color="reminder.color" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="reminder.active ? 'reminder-active' : 'reminder-inactive'">{{reminder.title}}</q-item-label>
        </q-item-section>
        <q-item-section
        side>
        <q-btn 
        round 
        dense
        icon="delete" 
        :color="reminder.color"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>


<script>
export default {
  data() {
    return{
      reminders:[
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
      ],
      methods:{
        
      }
    }
  }
}
</script>  

 
<style lang="scss">
.reminder-active{
  color: black;
}
.reminder-inactive{
  color: gray;
}
</style>
