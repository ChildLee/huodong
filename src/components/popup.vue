<template>
  <main>
    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>13333333</div>
      </div>
      <div class="popup-curtain" @click="popup"><!--幕布--></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  export default {
    name: 'popup',
    data () {
      return {
        isPopup: false
      }
    },
    methods: {
      popup () {
        this.isPopup = !this.isPopup
      }
    }
  }
</script>

<style lang="stylus">
  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: absolute;
      top: 30%;
      left: 10%;
      width 80%;
      z-index: 3;
      transition: all 2s;

      .popup-msg {
        font-size 14px;
      }
    }

    .popup-curtain {
      background-color rgba(0, 0, 0, .5)
      position absolute;
      top: 0;
      left 0;
      width 100%;
      height 100%;
      z-index 2;
    }
  }
</style>
