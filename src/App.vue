<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/favorite">Favorite</router-link>
      <!--  <NotificationsContainer></NotificationsContainer>-->

      <!--      <div v-show="imgDisplay" class="wrapper-loading">-->
      <!--        <img src="./assets/loader.gif" alt="">-->
      <!--      </div>-->
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgDisplay: true
    };
  },
  created() {
    //
    // let element = document.getElementsByClassName("wrapper-loading");
    // setTimeout(()=> {
    //   element[0].classList.remove("wrapper-loading");
    //   this.imgDisplay = false
    // },3000)
  }
};
</script>
<style>
.wrapper-loading {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #494b54;
  z-index: 100;
}

#nav {
  display: flex;
  justify-content: center;
  height: 80px;
  align-items: center;
  background: #494b54;
  list-style: none;
}

#nav a {
  color: #42b983;
  font-size: 25px;
  margin: 0 15px;
  text-decoration: none;
}
#nav a::before {
  content: "";
  display: block;
  height: 2px;
  background: #42b983;
  width: 0;
  transition: all 0.3s ease-in-out;
  transform-origin: left;
}

#nav a:hover::before {
  content: "";
  width: 100%;
}
</style>
