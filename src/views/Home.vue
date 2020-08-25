<template>
  <div class="home">


    <div class="list-input-wrapper">

      <div :class="['input-field',flatInput]" @click="toggle">
        <input ref="email" :style="checkOpenList" v-model="searchCountry" type="text"

               placeholder="Search">
        <a class="icon-div">
          <i class="glyphicon glyphicon-search"></i>
        </a>
      </div>

      <ul :style="checkScroll">
        <li v-for="country in list"
            @click="pressOnCountry(country)"
        >{{ country.name }}
        </li>
      </ul>
    </div>



  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'Home',

  data() {
    return {
      openInput: false,
      ifOverFlow: false,
      searchCountry: '',
    }
  },
  created() {
    this.getCountriesNameAction();

  },
  methods: {
    ...mapActions({
      getCountriesNameAction: 'main/getCountriesNameAction',
      countrySelected: 'main/countrySelected'
    }),
    toggle() {
      this.openInput = !this.openInput;
      this.$refs.email.focus();
    },
    pressOnCountry(country) {
      this.countrySelected(country);
      this.searchCountry = ''
    }
  },
  computed: {
    ...mapState({
      countries: state => state.main.countries,
      fiveDays: state => state.main.fiveDaysForCast
    }),

    flatInput() {
        return {
          'flat-input-bottom': this.ifOverFlow
        }
    },

    checkOpenList() {
      return (this.openInput ? {'--open-input':'160px'}:{'--open-input':'0'})
    },
    checkScroll() {
      return (this.ifOverFlow ? {overflow: 'auto'} :   {overflow: 'hidden'})
    },

    list() {
      let tempCountries = null;

      tempCountries = this.countries.filter(val => {
        return val.name.toUpperCase().includes(this.searchCountry.toUpperCase())
      });
      if (this.searchCountry === '' || tempCountries.length === 0) {
        this.ifOverFlow = false;
        return []
      }  else if (tempCountries.length !== 50 ) {
        this.ifOverFlow = true;
      }
      return tempCountries;
    },
  },
}
</script>


<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background:#42b983;
}
::-webkit-scrollbar-thumb {
  background: #494b54;
  border-radius: 10px;
}
.home {

  height: 50vh;
  display: flex;
  justify-content: center;
}

.list-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  height: 250px;
  width: 200px;
}

ul {
  background: #2f3640;
  width: 100%;
  margin: 38px 0;
  padding: 0;
  color: white;
  font-size: 15px;
  list-style: none;

}

ul li {
  width: 100%;
  margin: 0;
  color: #42b983;
  font-weight: bold;
}

ul li:hover {
  background: white;
}

.input-field {
  position: absolute;
  justify-content: center;
  background: #2f3640;
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 15px;
}

.icon-div {
  position: relative;
  transition: all .7s ease-in-out;
  color: #42b983;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: var(--open-input);
  border: none;
  outline: none;
  background: transparent;
  color: white;
  transition: all .3s ease-in-out;
}

.flat-input-bottom{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

</style>
