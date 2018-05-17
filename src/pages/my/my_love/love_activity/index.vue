<template>
  <main>
    <div class="love_activity-box">
      <div class="love_activity-info" @click="popup">活动1：2018-08-08 10：00 深圳活动汇</div>
      <div class="love_activity-info" @click="popup">活动1：2018-08-08 10：00 深圳活动汇</div>
    </div>


    <!--弹窗显示信件-->
    <div class="popup_1" v-if="isPopup">
      <div class="popup-box">
        <div class="love_msg">
          <div class="love_msg-1">我给二丫的信</div>
          <div class="love_msg-2">不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩不好玩</div>
          <div class="love_msg-1">二丫给我的信</div>
          <div class="love_msg-2">还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊还行啊</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"></div>
    </div>
    <!--弹窗显示信件-->
  </main>
</template>

<script>
  export default {
    name: 'love_activity',
    data() {
      return {
        isPopup: false
      }
    },
    methods: {
      closePopup() {
        this.isPopup = false
      },
      popup() {
        this.isPopup = true
      }
    }
  }
</script>

<style lang="stylus">
  page {
    background-color #eee;
  }

  .love_activity-box {
    padding: 0 15px;

    .love_activity-info {
      border-radius 10px;
      padding: 0 10px;
      margin-top 10px;
      background #fff;
      line-height 40px;
      font-size 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 弹窗 */
  .popup_1 {
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

  .love_msg {

    .love_msg-1 {
      font-weight bold;
    }
    .love_msg-2 {
      text-indent 2em;
    }
  }
</style>
