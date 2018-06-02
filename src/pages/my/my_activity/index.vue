<template>
  <main>
    <div class="tab">
      <div class="tab-box tab-fixed">
        <div class="tab-item" :class="currentTab==1?'tab-item-selected':''" @click="switchNav(1)">
          <div class="tab-title">将参加</div>
        </div>
        <div class="tab-item" :class="currentTab==2?'tab-item-selected':''" @click="switchNav(2)">
          <div class="tab-title">已参加</div>
        </div>
      </div>
    </div>

    <div class="activity border_line" v-for="(item,index) in list" :key="item.id">
      <div class="activity_box" @click="go_activity_info(item.id)">
        <div class="activity_info border_line">
          <div class="activity_info_time">{{item.time}}</div>
          <div class="activity_info_location">{{item.place}}</div>
          <div class="c" @click.stop="cancelActivity(item.id)">
            取消
          </div>
        </div>
        <div class="activity_text">{{item.title}}</div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'my_activity',
    data() {
      return {
        cancelA: 0,//取消活动扣取比例
        list: [{'id': 46, 'place': '1', 'status': 1, 'time': '1', 'title': '1'}],
        currentTab: 1 // tab当下标
      }
    },
    async onLoad() {
      this.init(1)
    },
    methods: {
      init(tab) {
        this.$app.api.activity.myActivities({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          status: tab
        }).then(res => {
          console.log(res)
          this.list = []
          if (res.data) {
            this.list = JSON.parse(res.data.activitys)
            this.cancelA = JSON.parse(res.data.cancelActivity)
          }
        })
      },
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
        this.init(tab)
      },
      go_activity_info(id) {
        console.log(id)
        if (this.currentTab === 1) {
          this.$app.nav.navigateTo('/pages/activity/activity_info/main', {id})
        } else if (this.currentTab === 2) {
          this.$app.nav.navigateTo('/pages/activity/past_activity_info/main', {id})
        }
      },
      cancelActivity(id) {
        console.log(id)
        let that = this
        wx.showModal({
          title: '提示',
          content: `活动24小时以外取退全款，活动24小时以内取消扣取${this.cancelA}%的名额费用`,
          success: function (res) {
            if (res.confirm) {
              that.$app.api.activity.quitActivity({
                userId: that.$app.storageStore.userStore.getters.getUserId,
                activityId: id
              }).then(res => {
                console.log(res)
                if (res.data) {
                  that.init(that.currentTab)
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
  .activity {
    padding: 15px;

    .activity_box {
      padding: 0 15px;
      background-color #eee
      border-radius 10px;
      font-size: 14px;
      color: #222;

      .activity_info {
        display flex;
        justify-content space-between;
        align-items center;
        line-height: 2

        .activity_info_time {
          flex none;
        }

        .activity_info_location {
          flex 1;
          margin-left 10px;
        }
      }

      .activity_text {
        padding: 5px 0;
        font-size 16px;
        color: #222;
      }
    }
  }
</style>
