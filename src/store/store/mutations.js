export function deleteReminder (state,index) {
    state.reminders.splice (index, 1)
    console.log("Delete")
}
