<template>
  <main>
    <div class="tab panel panel-no_top panel-no_border">
      <div class="tab-box">
        <div class="tab-item" :class="currentTab===2?'tab-item-selected-diyBlue':''" @click="switchNav(2)">
          <div class="tab-title">发出的</div>
        </div>
        <div class="tab-item" :class="currentTab===1?'tab-item-selected-diyBlue':''" @click="switchNav(1)">
          <div class="tab-title">收到的</div>
        </div>
      </div>
    </div>

    <div class="tab panel panel-no_top">
      <div class="tab-box tab-box-no_border">
        <div class="tab-item" @click="switchNavChild(1)">
          <div class="tab-title" :class="currentTabChild===1?'tab-title-selected-diyBlue':''">活动邀约</div>
        </div>
        <div class="tab-item" @click="switchNavChild(2)">
          <div class="tab-title" :class="currentTabChild===2?'tab-title-selected-diyBlue':''">辅助邀约</div>
        </div>
        <div class="tab-item" @click="switchNavChild(3)">
          <div class="tab-title" :class="currentTabChild===3?'tab-title-selected-diyBlue':''">爱情邀约</div>
        </div>
      </div>
    </div>

    <div class="invite-box" v-for="(item,index) in focus" :key="index"
         v-if="item.status===0&&currentTab===2&&currentTabChild===1">
      <!--发出活动邀约-->
      <div class="my_invite" @click="nav_activity(item.activityId)">
        <div class="invite-info">已邀约
          <span class="invite-info_color">{{item.nickName}}</span>与您一起参加
          <span class="invite-info_color">{{item.time}}{{item.place}}</span>活动.
        </div>
        <!--<div class="invite-msg f f-x-e">-->
        <!--<div @click="undo(item.id)">撤销</div>-->
        <!--</div>-->
      </div>
    </div>

    <div class="invite-box" v-for="(item,index) in focus" :key="index"
         v-if="item.status===0&&currentTab===2&&currentTabChild===2">
      <!--发出辅助邀约-->
      <div class="my_invite">
        <div class="invite-info">已邀约
          <span class="invite-info_color">{{item.nickName}}</span>作为辅助人与您一起主持
          <span class="invite-info_color">{{item.time}}{{item.place}}</span>活动.
        </div>
        <div class="invite-msg f f-x-e">
          <div @click="undofu(item.id)">撤销</div>
        </div>
      </div>
    </div>

    <div class="invite-box" v-for="(item,index) in focus" :key="index"
         v-if="item.status===0&&currentTab===2&&currentTabChild===3">
      <!--发出爱情邀约-->
      <div class="my_invite">
        <div class="invite-info">已邀约
          <span class="invite-info_color">{{item.nickName}}</span>与您一起进入准备恋爱阶段
        </div>
        <div class="invite-msg f f-x-e">
          <div @click="undoL(item.id)">撤销</div>
        </div>
      </div>
    </div>

    <div>
      <!--收到活动邀约-->
      <div class="invite-help border-bottom_line" v-for="(item,index) in focus" :key="index"
           v-if="item.status===0&&currentTab===1&&currentTabChild===1" @click="nav_activity(item.activityId)">
        <div class="invite-help-info">
          <span class="invite-info_color">{{item.nickName}}</span>邀约您与TA一起参加
          <span class="invite-info_color">{{item.time}}{{item.place}}</span>活动.
        </div>
        <!--<div class="invite-help-btn">-->
        <!--<div></div>-->
        <!--<div class="btn btn_size-small btn_color-diyBlue mg10-t" @click="Participate(item.id)">好呀</div>-->
        <!--</div>-->
      </div>
    </div>

    <div>
      <!--收到辅助邀约-->
      <div class="invite-help border-bottom_line" v-for="(item,index) in focus" :key="index"
           v-if="item.status===0&&currentTab===1&&currentTabChild===2">
        <div class="invite-help-info">
          <span class="invite-info_color">{{item.nickName}}</span>邀约您与TA一起辅助
          <span class="invite-info_color">{{item.time}}{{item.place}}</span>活动.
        </div>
        <div class="invite-help-btn">
          <div class="btn btn_size-small btn_color-diyBlue mg10-t" @click.stop="Assistant(item.id)">好呀</div>
        </div>
      </div>
    </div>

    <div class="invite-love" v-for="(item,index) in focus" :key="index"
         v-if="item.status===0&&currentTab===1&&currentTabChild===3">
      <!--收到爱情邀约-->
      <div class="invite-love-info">已邀约
        <span class="invite-info_color">
          {{item.nickName}}</span>与您一起进入准备恋爱阶段。
      </div>
      <!--<div class="invite-love-time">距您有效回复还剩-->
      <!--<span class="invite-info_color">15</span>天-->
      <!--</div>-->
      <div class="invite-love-btn">
        <div class="btn btn_size-small btn_color-diyBlue mg10-t" @click="Love(item.id,0)">好呀</div>
        <div class="btn btn_size-small btn_color-diyBlue mg10-t" @click="Love(item.id,1)">不</div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPay2">
      <div class="popup-box">
        <div class="pay-box">
          <div class="pay-price">支付费用{{promiseLove}}元
          </div>
          <!--<div class="pay-balance">会费剩余100元</div>-->
          <div class="pay-btn border-top" @click="invite_love">确定</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->


  </main>
</template>

<script>
  export default {
    name: 'my_invite',
    data() {
      return {
        cancelLove: 0,//取消爱情邀约比例
        timeout: 0,//超过20天扣费比例
        invite_love_id: 0,
        isPay2: false,
        focus: [{
          'nickName': 'cs名',
          'place': '2',
          'status': 0,
          'time': '1',
          'title': '1'
        }],
        currentTab: 2,//sendStatus 1收到的  2发出的
        currentTabChild: 1,////type 1/2 参加 辅助邀请   3爱情邀请
        promiseLove: 0, // promiseLove 答应爱情价格
        love: 0 //love  邀请爱情价格
      }
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      init() {
        this.focus = []
        this.$app.api.activity.invite({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          sendStatus: this.currentTab,//sendStatus 1收到的  2发出的
          type: this.currentTabChild //type 1/2 参加 辅助邀请   3爱情邀请
        }).then(res => {
          console.log(res)
          if (res.data) {
            this.cancelLove = res.data.cancelLove
            this.timeout = res.data.timeout
            this.focus = JSON.parse(res.data.focus)
          }
        })

        this.$app.api.love.priceChecking().then(res => {
          console.log(res.data)
          if (res.data) {
            this.love = res.data.love
            this.promiseLove = res.data.promiseLove
          }
        })
      },
      closePopup() {
        this.isPay2 = false
      },
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
        this.init()
      },
      switchNavChild(tab) {
        if (this.currentTabChild === tab) return false
        this.currentTabChild = tab
        this.init()
      },
      nav_activity(id) {
        this.$app.nav.navigateTo('/pages/activity/activity_info/main', {id})
      },
      undo(id) {
        let that = this
        wx.showModal({
          title: '',
          content: '撤销邀约时，退款并扣50%手续费，对方拒绝或20天内未回复的，退款并扣15%手续费。',
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.undoInvitation({
                id: id
              }).then(res => {
                if (res.data) {
                  that.init()
                }
              })
            }
          }
        })
      },
      undofu(id) {
        let that = this
        wx.showModal({
          title: '',
          content: '确定撤销?',
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.undoInvitation({
                id: id
              }).then(res => {
                if (res.data) {
                  that.init()
                }
              })
            }
          }
        })
      },
      undoL(id) {
        let that = this
        wx.showModal({
          title: '',
          content: `撤销邀约时，退款并扣${this.cancelLove}手续费，对方拒绝或20天内未回复的，退款并扣${this.timeout}%手续费。`,
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.undoLove({
                id: id,
                userId: that.$app.storageStore.userStore.getters.getUserId
              }).then(res => {
                if (res.data) {
                  that.init()
                }
              })
            }
          }
        })
      },
      Participate(id) {
        let that = this
        wx.showModal({
          title: '提示',
          content: `确定参加该活动?`,
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.promiseParticipate({
                id: id
              }).then(res => {
                if (res.data) {
                  wx.showToast({title: '操作成功!', icon: 'none'})
                  that.init()
                }
              })
            }
          }
        })
      },
      Assistant(id) {
        let that = this
        wx.showModal({
          title: '提示',
          content: `确定辅助该活动?`,
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.promiseAssistant({
                id: id
              }).then(res => {
                console.log(res)
                if (res.data) {
                  wx.showToast({title: '操作成功!', icon: 'none'})
                  that.init()
                }
              })
            }
          }
        })
      },
      Love(id, status) {
        this.invite_love_id = id
        if (status === 0) {
          this.isPay2 = true
          return
        }
        let that = this
        this.$app.api.activity.promiseLove({
          id: id,
          status: 1
        }).then(res => {
          if (res.data) {
            wx.showToast({title: '操作成功!', icon: 'none'})
            that.init()
          }
        })
      },
      invite_love() {
        let that = this
        this.$app.api.activity.promiseLove({
          id: this.invite_love_id,
          status: 0
        }).then(res => {
          if (res.data) {
            wx.showToast({title: '恋爱成功!', icon: 'none'})
            that.init()
          }
        })
        this.closePopup()
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  .invite-info_color {
    color: #25ABDF;
  }

  .invite-box {
    padding 0 15px;

    .my_invite {
      background-color: #eee;
      padding: 10px 15px;
      font-size 14px;
      border-radius 10px;
      margin-top 10px;

      .invite-info {
        color: #333;
      }

      .invite-msg {
        font-size 14px;
        color: #555;
      }
    }
  }

  .invite-help {
    margin-top 10px;
    padding: 10px 15px;
    font-size 14px;

    .invite-help-info {

    }

    .invite-help-btn {
      text-align center;
    }
  }

  .invite-love {
    padding: 10px 15px;
    font-size 14px;

    .invite-love-info {

    }

    .invite-love-time {
      font-size 12px;
      text-align right;
      color: #999;
      margin: 10px 0;
    }

    .invite-love-btn {
      display flex
      justify-content space-around;
    }
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
      left: 15%;
      width 70%;
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

  .pay-box {

    .pay-price {
      text-align center;
      padding: 30px 0;
      font-size 16px;
    }

    .pay-balance {
      font-size 14px;
      color: #999;
      text-align right;
    }

    .pay-btn {
      text-align center
      padding-top 10px;
      color: #1388BA;
    }
  }
</style>
