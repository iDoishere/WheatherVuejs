<template>
  <div>
    <div class="main-img">
      <h2 class="main-img-text">   Weather Real Time</h2>
    </div>

  </div>
</template>


<script>
export default {
  name:'Img',
  data(){
    return{

    }
  }
}
</script>


<style lang="scss"  >
$green : #42b983;
.main-img {
  height: 40vh;
  background-image:
    url('https://images.unsplash.com/photo-1560346983-ffa0a154e978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=984&q=80');
  background-size: cover;
  background-position: top;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  &-text {
    margin-top: -30px;
    background-image: linear-gradient(to right, rgba(255,0,0,0), $green );
    letter-spacing: 13px;
  }
}

</style>
