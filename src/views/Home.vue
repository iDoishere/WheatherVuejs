<template>
  <div class="home">
    <Modal :showModal="showModal"></Modal>
    <ImgComponent></ImgComponent>

    <div class="wrapper-list">
      <div class="list-input">
        <div
          :class="['input-field', flatInputAndUl.input]"
          @click="toggle"
          :style="inputFiledSlide"
        >
          <input
            ref="email"
            :style="inputSlide"
            v-model="searchCountry"
            type="text"
            :placeholder="placeHolder"
          />
          <i class="glyphicon glyphicon-search"></i>
        </div>

        <ul
          :class="flatInputAndUl.ul"
          v-if="openList && list.length !== 0"
          :style="[checkScroll, inputSlide]"
        >
          <li
            v-for="country in list"
            :key="country.id"
            @click="pressOnCountry(country)"
          >
            <a> {{ country.name }}</a>
          </li>
        </ul>
        <div
          v-show="list.length >= 0 && openList"
          :style="list.length === 0 ? { bottom: '-15px' } : {}"
          class="list-fotter"
        >
          {{ list.length + " Found" }}
        </div>
      </div>
    </div>

    <div class="main-content">
      <div v-if="countryData.length" class="wrapper-card">
        <div class="wrapper-card-header">
          <div class="wrapper-card-header-content">
            <p>{{ countryData[0].date }}</p>
            <p>{{ countryData[0].name }}</p>

            <p>{{ countryData[0].celsius + " `C" }}</p>
            <button @click="changeDeg" class="btn1 btn-1">
              Change Degree
            </button>
          </div>
          <div class="wrapper-card-header-btn">
            <button class="btn1 btn-1">Add To Favorite</button>
          </div>
        </div>
        <div class="wrapper-card-list">
          <b-card
            v-for="item in countryData"
            :key="item.id"
            :title="item.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <p>{{ item.celsius + " `C" }}</p>
              <p>{{ item.date }}</p>
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ImgComponent from "@/components/Img";
import Modal from "@/components/Modal";
export default {
  name: "Home",
  components: { ImgComponent, Modal },

  data() {
    return {
      openInput: false,
      openList: false,
      ifOverFlow: false,
      searchCountry: "",
      holder: "Search",
      selectedCountry: "",
      showModal: false,
      whichDegree: false
    };
  },
  created() {
    this.getCountriesNameAction();
  },

  methods: {
    ...mapActions({
      getCountriesNameAction: "main/getCountriesNameAction",
      countrySelected: "main/countrySelected",
      changeDegree: "main/changeDegree"
    }),

    toggle() {
      this.openInput = !this.openInput;
      if (this.openInput) {
        this.openList = !this.openList;
      } else {
        this.openList = false;
      }
      this.searchCountry = "";
      this.$refs.email.focus();
    },
    pressOnCountry(country) {
      this.selectedCountry = country.name;
      console.log(country);
      this.countrySelected(country);
      this.openList = false;
      // this.showModal = true;
    },
    changeDeg() {
      this.changeDegree(this.whichDegree);
      this.whichDegree = !this.whichDegree;
    }
  },
  computed: {
    ...mapState({
      countries: state => state.main.countries,
      countryData: state => state.main.countryData
    }),

    flatInputAndUl() {
      let input,
        ul = null;
      input = {
        "flat-input-bottom": this.openInput && this.openList
      };
      ul = {
        "flat-ul-top": this.ifOverFlow && this.openList
      };
      return { input, ul };
    },
    placeHolder() {
      if (this.selectedCountry !== "") {
        return this.selectedCountry;
      } else {
        return this.holder;
      }
    },
    inputFiledSlide() {
      return this.openInput
        ? { "--open-input": "100%" }
        : { "--open-input": "50px" };
    },
    inputSlide() {
      return this.openInput
        ? { "--open-input": "100%" }
        : { "--open-input": "0" };
    },
    checkScroll() {
      return this.ifOverFlow ? { overflow: "auto" } : { overflow: "hidden" };
    },
    list() {
      this.ifOverFlow = true;
      return this.countries.filter(val => {
        return val.name
          .toUpperCase()
          .includes(this.searchCountry.toUpperCase());
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$green: #42b983;
$grey: #2f3640;
$greyLight: #494b54;

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: $green;
  border-radius: 10px;
}

article.card.mb-2 {
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.wrapper-list {
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  .list-input {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 20%;
    padding: 0;
    position: relative;
  }
  .input-field {
    width: var(--open-input);
    justify-content: center;
    background: $grey;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    transition: width 0.3s ease-in-out;

    input {
      width: var(--open-input);
      border: none;
      outline: none;
      background: transparent;
      color: white;
      transition: all 0.3s ease-in-out;
      padding-left: 15px;

      &::placeholder {
        font-size: 15px;
      }
    }
  }

  .glyphicon {
    color: $green;
    width: 30px;
    left: 2px;
  }

  ul {
    width: 100%;
    margin-top: 3%;
    padding: 15px 0;
    font-size: 15px;
    list-style: none;
    z-index: 100;
    background: $grey;
    max-height: 240px;
    overflow: auto;
    border-radius: 10px;
    animation-name: list-slide;
    animation-duration: 0.3s;
    &.flat-ul-top {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  ul li {
    width: 100%;
    padding: 10px 0;
    color: $green;
    font-weight: bold;
    cursor: pointer;

    a {
      padding: 0 15px;
    }
  }
  ul li:hover {
    background: #2c3e50;
  }
  .list-fotter {
    background: #0c5460;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    border-radius: 5px;
    animation-name: list-slide;
    animation-duration: 0.3s;
    z-index: 100;
  }
}

.input-field.flat-input-bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.main-content {
  position: relative;
  width: 100%;
  top: 190px;
}

.wrapper-card {
  width: 100%;
  height: 400px;
  color: #42b983;
  &-header {
    height: fit-content;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    align-items: center;
    &-content {
      width: 20%;
      height: 150px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 20px;
      color: #42b983;

      .btn1 {
        padding: 5px;
      }
    }
  }
}

.wrapper-card-list {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  .single-card {
    width: 30%;
    background: $grey;
    height: 250px;
    margin: 0 10px;
    color: #42b983;
    font-size: 20px;
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 100%;
      height: 150px;
    }
  }
}

.btn1 {
  font-size: 15px;
  background-color: $grey;
  border: none;
  outline: none;
  position: relative;
  font-weight: bold;
  z-index: 100;
  color: #42b983;
  padding: 1rem 3rem;
}

.btn1.btn-1::before {
  content: "";
  width: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: width 1.1s ease-in-out;
  z-index: -1;
}

.btn1.btn-1 {
  z-index: 1;
}
.btn-1:hover {
  color: white;
}
.btn1.btn-1:hover::before {
  width: 100%;
  position: absolute;
  background: #42b983;
  color: white;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@keyframes list-slide {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
<style lang="scss">
body {
  background: #f2f2f2;
}
</style>
