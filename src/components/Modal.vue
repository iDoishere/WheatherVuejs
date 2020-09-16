<template v-if="showModal">
  <div :style="setModal" class="modal-main">
    <h2>fsdfsdfsd</h2>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["showModal"],
  components: {},
  data() {
    return {};
  },
  computed: {
    setModal() {
      return {
        transform: this.showModal ? "translateY(0) " : "translateY(-100vh)",
        opacity: this.showModal ? "1" : "0"
      };
      //   return !this.showModal
      //     ? { transform: "translateY(0)", opacity: 0 }
      //     : { transform: "translateY(-100vh)", opacity: 1 };
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main {
  text-align: center;
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 700px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 24%;
  top: 30%;
  box-sizing: border-box;
  transition: all 1.3s ease-out;
}
</style>
