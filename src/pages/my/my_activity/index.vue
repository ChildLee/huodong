<template>
  <main>
    <div class="tab">
      <div class="tab_box tab-fixed">
        <div class="tab_item" :class="currentTab==0?'tab_item-selected':''" @click="switchNav(0)">
          <div class="tab_title">已预定</div>
        </div>
        <div class="tab_item" :class="currentTab==1?'tab_item-selected':''" @click="switchNav(1)">
          <div class="tab_title">已参加</div>
        </div>
      </div>
    </div>

    <div class="activity border_line" v-for="(item,index) in 10" :key="index">
      <div class="activity_box">
        <div class="activity_info border_line">
          <div class="activity_info_time">2018-8-8 9:00</div>
          <div class="activity_info_location">深圳高新园</div>
          <div v-if="!currentTab" class="btn btn-mini btn-danger" @click="cancelActivity">取消活动</div>
        </div>
        <div class="activity_text">这个活动666</div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'my_activity',
    data() {
      return {
        deduction: 50, // 取消活动扣取比例
        currentTab: 0 // tab当下标
      }
    },
    mounted() {
    },
    methods: {
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
      },
      cancelActivity() {
        wx.showModal({
          title: '提示',
          content: `活动24小时以外取退全款，活动24小时以内取消扣取${this.deduction}%的名额费用`,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
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
      background-color pink
      border-radius 10px;
      font-size: 14px;
      color: #666;

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
        color: #555;
      }
    }
  }
</style>
