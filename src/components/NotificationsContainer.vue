<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />

  </div>
</template>

<script>
 import NotificationBar from "./NotificationBar";
  import {mapState} from 'vuex'

  export default {
    components: {
       NotificationBar
    },
                      //module name ,    state name inside the module
    computed:{
      ...mapState({
        notifications : state => state.notification.notifications
      } ),
    },
    created() {
      console.log(this.notifications)
    }

  }
</script>

<style scoped>
/*.notification-container{*/
/*  position: fixed;*/
/*  bottom:20px;*/
/*  right: 0;*/
/*  padding-right: 40px;*/
/*}*/
</style>
