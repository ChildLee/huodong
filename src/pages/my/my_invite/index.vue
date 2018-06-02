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

  </main>
</template>

<script>
  export default {
    name: 'my_invite',
    data() {
      return {
        focus: [{
          'nickName': 'cs名',
          'place': '2',
          'status': 0,
          'time': '1',
          'title': '1'
        }],
        currentTab: 2,//sendStatus 1收到的  2发出的
        currentTabChild: 1////type 1/2 参加 辅助邀请   3爱情邀请
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
            this.focus = JSON.parse(res.data.focus)
          }
        })
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
          content: '撤销邀约时，退款并扣50%手续费，对方拒绝或20天内未回复的，退款并扣15%手续费。',
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
              this.$app.api.activity.promiseParticipate({
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
        let that = this
        this.$app.api.activity.promiseLove({
          id: id,
          status: status
        }).then(res => {
          if (res.data) {
            wx.showToast({title: '操作成功!', icon: 'none'})
            that.init()
          }
        })
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
</style>
