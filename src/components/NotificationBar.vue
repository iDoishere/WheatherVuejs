<template>
  <div>
    <h6  :class="funcClass"> {{notification.message}}</h6>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: {
      notification: {
        type: Object,
      }
    },
    data() {
      return {
        timeout: null
      }
    },
    mounted() {
      this.timeout = setTimeout(() => this.remove(this.notification), 3000)
    },
    computed:{
      funcClass(){
        return `-text-${this.notification.type}`
      }
    },
    methods:{
      ...mapActions({
        remove: 'notification/remove'
      })
    }
  }
</script>

<style scoped>
.-text-error{
  color: red;
  font-weight: 800;
}
  .-text-success {
    color: green;
    font-weight: 800;
  }
</style>
