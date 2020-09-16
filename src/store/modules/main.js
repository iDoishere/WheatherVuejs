import EventService from "../EventService";
import { calcTempAvrageFiveDaysCast, getFiveDaysDate, calcFar } from "@/calc";

const state = {
  countries: [],
  countryData: [],

  DailyForecasts: []
};

const actions = {
  async getCountriesNameAction({ commit, dispatch }) {
    EventService.getEventsCountry()
      .then(res => {
        let names = res.data.map(country => {
          return {
            name: country.LocalizedName,
            key: country.Key
          };
        });
        commit("setProperty", { key: "countries", data: names });
        const notification = {
          type: "success",
          message: "success download api from server"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: "error",
          message: "Eroor with api server"
        };
        dispatch("notification/add", notification, { root: true });
      });
  },

  countrySelected({ commit }, country) {
    EventService.getEventsCountrySelected(country).then(res => {
      let { DailyForecasts } = res.data;

      const arrCelsius = calcTempAvrageFiveDaysCast(DailyForecasts);
      const arrDate = getFiveDaysDate(DailyForecasts);
      const newData = arrDate.map((val, index) => {
        return {
          celsius: arrCelsius[index],
          date: arrDate[index],
          ...country
        };
      });

      commit("setProperty", {
        key: "countryData",
        data: newData,
        nested: { key: "DailyForecasts", data: DailyForecasts }
      });
    });
  },
  changeDegree({ commit }, whichDegree) {
    let arrFar = [];
    let final = [];
    if (!whichDegree) {
      arrFar = calcFar(state.DailyForecasts);
      state.countryData.forEach((item, index) => {
        item.celsius = arrFar[index];
      });
    } else {
      arrFar = calcTempAvrageFiveDaysCast(state.DailyForecasts);
      state.countryData.forEach((item, index) => {
        item.celsius = arrFar[index];
      });
    }
    console.log(final);
    commit("setProperty", { key: "countryData", data: state.countryData });
  }
};
const mutations = {
  setProperty(state, data) {
    if (data.nested) {
      state[data.nested.key] = data.nested.data;
    }
    if (data.key) {
      state[data.key] = data.data;
    }
  }
};

export default {
  namespaced: true, // <== make sure this is defined
  actions,
  mutations,
  state
};
