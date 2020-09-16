import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import EventService from "./EventService";
import notification from "./modules/notification.js";
import main from "./modules/main";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification,
    main
  }
});
