<template>
  <main>
    <div class="love_top" v-if="status===0">
      <div class="love_top-1"></div>
      <div class="love_top-2">
        <div @click.stop="love_invite" class="btn btn_size-small btn_color-DodgerBlue br5 of" @click="love_invite">
          爱的邀约
        </div>
      </div>
      <div class="love_top-3 c666" @click="popup">恋爱规则</div>
    </div>

    <div class="love_info">
      <div class="border-bottom-white c666" v-for="item in loves" @click="love_info(item.id)" :key="item.id">
        {{item.determine}}起您与{{item.nick}}的爱情信息。
      </div>
    </div>

    <div class="love_btn" v-if="status!==0">
      <div class="btn btn_size-small btn_color-DodgerBlue br5 of" @click="breakUp">异路</div>
      <!--<div class="btn btn_size-small btn_color-DodgerBlue">帮助</div>-->
      <!--<div class="btn btn_size-small btn_color-DodgerBlue btn-disabled br5 of">执手</div>-->
    </div>

    <div></div>
    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div class="popup-msg c666">
          <div>规则：</div>
          <div>感情是郑重严谨的，请双方缴费确定</div>
          <div>在交往中如需帮助，加客服微信可获得专业辅助</div>
          <div>无论邀约了多少人，一个答应后，其他邀约都会消失。注意！！！邀约费用不退，慎重恋爱邀约</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  export default {
    name: 'my_love',
    data() {
      return {
        res: {
          data: {
            loves: [],
            status: 0
          }
        },
        isPopup: false,
        loves: [{
          id: 1,
          nick: ''
        }],
        status: 0
      }
    },
    async onLoad() {
      wx.showLoading({title: '加载中'})
      await this.init()
      wx.hideLoading()
    },
    methods: {
      async init() {
        this.loves = []
        this.$app.api.love.myLoves({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          console.log(res.data)
          if (res.data) {
            this.status = res.data.status
            this.loves = JSON.parse(res.data.loves)
          }
        })
      },
      love_info(id) {
        this.$app.nav.navigateTo('/pages/my/my_love/love_activity/main', {id})
      },
      fold() {
        this.fold_selected = !this.fold_selected
      },
      closePopup() {
        this.isPopup = false
      },
      popup() {
        this.isPopup = true
      },
      love_invite() {
        this.$app.nav.navigateTo('/pages/my/my_love/invite/main')
      },
      breakUp() {
        let that = this
        wx.showModal({
          title: '提示',
          content: `确定异路?`,
          success: function (res) {
            if (res.confirm) {
              that.$app.api.love.breakUp({
                id: that.loves[0].id
              }).then(res => {
                console.log(res.data)
                if (res.data) {
                  wx.showToast({title: '异路成功!', icon: 'none'})
                  that.init()
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  page {
    background-color white;
    color: #6D5B42;
    width 100%;
    height 100%;
  }

  .love_top {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 15px;
    border-bottom 1px solid #d8d8d8;

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

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: fixed;
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
      position fixed;
      top: 0;
      left 0;
      width 100%;
      height 100%;
      z-index 2;
    }
  }
</style>
