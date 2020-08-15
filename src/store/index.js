import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventService from "./EventService";
import  notification from './modules/notification.js'
import main from "./modules/main";
Vue.use(Vuex)


const calcTempAvrageFiveDaysCast = (data) => {
  let arr = [];

  for (let val of data) {
    const maxTemp = val.Temperature.Maximum.Value;
    const minTemp = val.Temperature.Minimum.Value;
    const sum = (maxTemp + minTemp) / 2;

    const newSumFahrenheit = ((sum - 32) * 5) / 9; //convert to celsius
    const celsius = newSumFahrenheit
    arr.push(celsius)
  }
  return arr;


}

export default new Vuex.Store({
  modules:{
    notification,
    main
  },



})
