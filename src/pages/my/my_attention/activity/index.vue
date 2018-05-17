<template>
  <main>
    <div class="tab">
      <div class="tab-box tab-fixed">
        <div class="tab-item" :class="currentTab==1?'tab-item-selected':''" @click="switchNav(1)">
          <div class="tab-title">已预定</div>
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
          <!--<div v-if="!currentTab" class="btn btn_size-mini btn_color-DodgerBlue" @click="cancelActivity">取消活动</div>-->
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
        list: [{
          id: 1,
          place: '地点1',
          status: 2,
          time: '2018-5-13 17:19:40',
          title: '标题1'
        }],
        deduction: 50, // 取消活动扣取比例
        currentTab: 1 // tab当下标
      }
    },
    beforeMount() {
      this.init(1)
    },
    methods: {
      init(tab) {
        this.$app.api.activity.myActivities({
          userId: this.$mp.query.id,
          status: tab
        }).then(res => {
          this.list = []
          if (res.data) {
            this.list = JSON.parse(res.data.activitys)
          }
        })
      },
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
        this.init(tab)
      },
      go_activity_info(id) {
        this.$app.nav.navigateTo('/pages/activity/past_activity_info/main', {id})
      },
      cancelActivity() {

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
