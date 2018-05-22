<template>
  <main>
    <div class="tab panel panel-no_top panel-no_border">
      <div class="tab-box">
        <div class="tab-item" :class="currentTab===1?'tab-item-selected-diyBlue':''" @click="switchNav(1)">
          <div class="tab-title">发出的邀约</div>
        </div>
        <div class="tab-item" :class="currentTab===2?'tab-item-selected-diyBlue':''" @click="switchNav(2)">
          <div class="tab-title">收到的邀约</div>
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

    <div class="invite-box">
      <!--发出活动邀约-->
      <div class="my_invite">
        <div class="invite-info">已邀约
          <span class="invite-info_color">二丫</span>与您一起参加
          <span class="invite-info_color">2018-8-8 9：00 高新园 深圳活动汇</span>活动.
        </div>
        <div class="invite-msg">留言:</div>
      </div>
    </div>

    <div>
      <!--收到辅助邀约-->
      <div class="invite-help border-bottom_line">
        <div class="invite-help-info">
          <span class="invite-info_color">王五</span>邀约您与TA一起参加
          <span class="invite-info_color">2018-8-8 9：00 高新园 深圳活动汇</span>活动.
        </div>
        <div class="invite-help-btn">
          <div class="btn btn_size-small btn_color-diyBlue">好呀</div>
        </div>
      </div>
    </div>

    <div class="invite-love">
      <!--收到爱情邀约-->
      <div class="invite-love-info"><span class="invite-info_color">王五</span>邀约您与TA一起进入准备恋爱阶段。</div>
      <div class="invite-love-time">距您有效回复还剩
        <span class="invite-info_color">15</span>天
      </div>
      <div class="invite-love-btn">
        <div class="btn btn_size-small btn_color-diyBlue">好呀</div>
        <div class="btn btn_size-small btn_color-diyBlue">不</div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'my_invite',
    data() {
      return {
        currentTab: 1,
        currentTabChild: 1
      }
    },
    methods: {
      init() {
        this.$app.api.activity.invite({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          sendStatus: '',
          type: ''
        }).then(res => {

        })
      },
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
      },
      switchNavChild(tab) {
        if (this.currentTabChild === tab) return false
        this.currentTabChild = tab
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
        color: #999;
        text-indent 2em;
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
