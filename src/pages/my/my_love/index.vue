<template>
  <main>
    <div class="love_top border">
      <div class="love_top-1"></div>
      <div class="love_top-2">
        <div @click.stop="love_invite" class="btn btn_size-small btn_color-DodgerBlue">爱的邀约</div>
      </div>
      <div class="love_top-3" @click="popup">恋爱规则</div>
    </div>

    <div class="love_info">
      <div>2018-08-08 08：20 您与二 丫进入准备恋爱阶段。</div>
      <div>2018-08-08 08：20 您与二 丫进入准备恋爱阶段。</div>
    </div>

    <div class="love_msg">
      <div class="love_msg-title">
        <div class=" border-white">活动</div>
        <div class=" border-white">给二丫的信</div>
        <div class=" border-white">二丫给我的信</div>
      </div>

      <div class="love_msg-box" v-for="item in 5" :key="index">
        <div class="border-white">游玩</div>
        <div class="border-white">好玩</div>
        <div class="border-white">不好玩</div>
      </div>
    </div>

    <div class="love_contact border-white">
      <div class="love_contact-msg">您与XXX在______-______期间尝试交往</div>
      <div class="love_contact-btn btn btn_size-small btn_color-DodgerBlue">备注</div>
    </div>

    <div class="love_info">
      <div>2018-08-08 08：20 您与二 丫进入准备恋爱阶段。</div>
      <div>2018-08-08 08：20 您与二 丫进入准备恋爱阶段。</div>
    </div>

    <div class="love_btn">
      <div class="btn btn_size-small btn_color-DodgerBlue">异路</div>
      <div class="btn btn_size-small btn_color-DodgerBlue">帮助</div>
      <div class="btn btn_size-small btn_color-DodgerBlue btn-disabled">执手</div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div class="popup-msg">
          <div>规则：</div>
          <div>1.没有规则</div>
          <div>2.请看第一条</div>
        </div>
      </div>
      <div class="popup-curtain" @click="popup"></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        isPopup: false
      }
    },
    methods: {
      fold() {
        this.fold_selected = !this.fold_selected
      },
      popup() {
        this.isPopup = !this.isPopup
      },
      love_invite() {
        console.log(1)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  page {
    background-color #e4d7da;
    color: #6D5B42;
    width 100%;
    height 100%;
  }

  .love_top {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 15px;

    &::after {
      border_line(white);
      border-bottom-width 2px;
    }
  }

  .love_top-1 {
    flex 1
  }

  .love_top-2 {
    flex 1
    text-align center;
  }

  .love_top-3 {
    flex 1
    font-size 14px;
    text-align right;
  }

  .love_info {
    font-size 14px;
    padding: 15px;
  }

  .love_msg-title {
    display flex;
    text-align center;
    font-size 14px;
    color: #006600;
  }

  .love_msg-title ._div,
  .love_msg-title view {
    width 0
    flex 1
    padding: 15px;
  }

  .love_msg-box {
    background-color: #d6c3c7;
    display flex;
    text-align center;
    font-size 14px;
  }

  .love_msg-box ._div,
  .love_msg-box view {
    width 0
    flex 1
    padding: 15px;
  }

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

  .love_contact {
    font-size 14px;
    padding: 15px;
  }

  .love_contact-msg {
    display inline-block;
  }

  .love_contact-btn {
    display inline-block;
    margin-left 10px;
  }

  .love_btn {
    display flex;
    justify-content space-around;
    align-items center;
  }
</style>
