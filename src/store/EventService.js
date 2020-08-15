import axios from 'axios';


const apiClient = axios.create({
  baseURL:`https://dataservice.accuweather.com`,
  withCredentials:false,
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json'
  }
});


export  default {
  getEventsCountry(){
    return apiClient.get(`locations/v1/topcities/${50}?apikey=bjj1SQe80U7Zb8D1pqP17POYLWDbRMB8
        &language=en-us`)
      .catch(err => {
        return err;
    })
  },

  getEventsCountrySelected(country){
    console.log(country)
    return apiClient.get(`forecasts/v1/daily/5day/${country.key}?apikey=bjj1SQe80U7Zb8D1pqP17POYLWDbRMB8
    &language=en-us`)
      .catch(err => {
        alert('error getEventsCountrySelected')
      })
  }

}
