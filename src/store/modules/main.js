import EventService from "../EventService";
import {calcTempAvrageFiveDaysCast} from '../../calc'

const state = {
  countries: [],
  fiveDaysForCast: []
};

const getters = {
  getAllCountries: state => {
    return (state) => state.countries;
  }
};

const actions = {
  async getCountriesNameAction({commit, dispatch}) {

    EventService.getEventsCountry()
      .then(res => {
        commit('addCountries', res.data);
        const notification = {
          type: 'success',
          message: 'success download api from server'
        };
        dispatch('notification/add', notification, {root: true})
      }).catch(err => {
      const notification = {
        type: 'error',
        message: 'Eroor with api server'
      };
      dispatch('notification/add', notification, {root: true})
    })
  },

  countrySelected({commit}, country, state) {
    EventService.getEventsCountrySelected(country)
      .then(res => {
        const arrCelcuis = calcTempAvrageFiveDaysCast(res.data.DailyForecasts)
        let obj = {
           arrCelcuis,
          country
        }
        commit('countrySelected', obj)
      })
  }
};
const mutations = {
  addCountries: (state, data) => {
    let names = data.map(country => {
      return {
        name: country.LocalizedName,
        key: country.Key
      }
    })
    state.countries = names;
  },
  countrySelected: (state, obj) => {
    state.fiveDaysForCast = obj
  }
};


export default {
  namespaced: true, // <== make sure this is defined
  actions,
  mutations,
  state
}
