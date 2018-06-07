<template>
  <main>
    <div class="love_activity-box">
      <div class="love_activity-info" v-for="(item,index) in activitys" :key="index" @click="popup(item.id)">
        活动{{index+1}}：{{item.time}} {{item.title}}
      </div>
    </div>

    <div class="prompt">您与{{nick}}在{{determine?determine:''}}-{{stop?stop:'至今'}}尝试交往</div>

    <!--弹窗显示信件-->
    <div class="popup_1" v-if="isPopup">
      <div class="popup-box">
        <div class="love_msg">
          <div class="love_msg-1">我给{{nick}}的信</div>
          <div class="love_msg-2">{{issueReviews?issueReviews:'稍等'}}</div>
          <div class="love_msg-1">{{nick}}给我的信</div>
          <div class="love_msg-2">{{receivedReviews?receivedReviews:'稍等'}}</div>
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
        nick: '',
        isPopup: false,
        activitys: [{
          time: '',
          title: ''
        }],
        determine: '',
        loveUserId: 2,
        status: 1,
        stop: null,
        userInfo: {
          avatatUrl: '',
          id: 2,
          nick: '',
          sex: 1,
          status: 1
        },
        issueReviews: '',//给出
        receivedReviews: ''//收到的评价
      }
    },
    onLoad() {
      wx.showLoading({title: '加载中'})
      this.init()
      wx.hideLoading()
    },
    methods: {
      async init() {
        await this.$app.api.love.love({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          id: this.$mp.query.id
        }).then(res => {
          console.log(res.data)
          if (res.data) {
            this.activitys = JSON.parse(res.data.activitys)
            this.loveUserId = res.data.loveUserId
            this.determine = res.data.determine
            this.status = res.data.status
            this.stop = res.data.stop
            this.nick = res.data.nick
          }
          return res.data
        }).then(res => {
          return this.$app.api.user.userData({
            userId: res.loveUserId
          })
        }).then(res => {
          if (res.data) {
            this.userInfo = JSON.parse(res.data.user)
          }
        })
      },
      closePopup() {
        this.isPopup = false
        this.issueReviews = ''
        this.receivedReviews = ''
      },
      popup(id) {
        this.$app.api.love.loveReview({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          loveUserId: this.loveUserId,
          activityId: id
        }).then(res => {
          console.log(res)
          this.issueReviews = res.data.issueReviews
          this.receivedReviews = res.data.receivedReviews
        })
        this.isPopup = true
      }
    }
  }
</script>

<style lang="stylus">
  page {
    background-color #eee;
  }

  .prompt {
    font-size 14px;
    padding: 15px;
    color: #333;
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

  .love_msg {

    .love_msg-1 {
      /*font-weight bold;*/
    }

    .love_msg-2 {
      text-indent 2em;
    }
  }
</style>
