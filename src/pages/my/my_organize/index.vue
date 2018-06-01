<template>
  <main>
    <div class="organize-btn">
      <div v-if="!hostStatus" class="btn-box btn btn_color-DodgerBlue br5 of"
           @click="navigateTo('/pages/my/my_organize/application_host/main')">申请成为主持人
      </div>
      <div v-else class="btn-box btn btn_color-DodgerBlue" @click="pushActivitie">发布活动</div>
    </div>

    <div class="tab">
      <div class="tab-box">
        <div class="tab-item" :class="tab===1?'tab-item-selected':''" @click="organize_tab(1)">
          <div class="tab-title">将组织的</div>
        </div>
        <div class="tab-item" :class="tab===2?'tab-item-selected':''" @click="organize_tab(2)">
          <div class="tab-title">已组织的</div>
        </div>
      </div>
    </div>

    <div class="organize" v-for="(item,index) in list" :key="index">
      <div class="organize-box" @click="organize_nav(item.id)">
        <div class="organize-info border-bottom-color_white">
          <div class="organize-time">{{item.time}}</div>
          <div class="organize-address">{{item.place}}</div>
          <div class="organize-status" v-if="!item.status">待确认</div>
        </div>
        <div class="organize-name">{{item.title}}</div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'my_organize',
    data() {
      return {
        hostLV: 0, //主持人的等级,3级才能不邀约辅助人
        hostStatus: 0,//0不是主持人
        tab: 1,
        type: 1,//1将组织的,2已组织的
        list: [{
          id: 1,
          place: '',
          status: 0,//0准备发起 1已发起 2已结束,3开始
          time: '',
          title: ''
        }]
      }
    },
    async onShow() {
      wx.showLoading({title: '加载中'})
      await this.init(1)
      wx.hideLoading()
    },
    methods: {
      init(type) {
        this.list = []
        this.$app.api.activity.myOrganizations({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          type: type
        }).then(res => {
          console.log(res)
          if (res.data) {
            this.hostStatus = res.data.hostStatus
            this.hostLV = res.data.hostLV
            console.log('我组织的', '主持人等级', this.hostLV)
            console.log('我组织的', '是不是主持人', this.hostStatus, this.hostStatus ? '是主持人' : '不是主持人')
          }
          res.data.myOrganizations ? this.list = JSON.parse(res.data.myOrganizations) : ``
        })
      },
      organize_tab(tab) {
        this.tab = tab
        this.init(tab)
      },
      navigateTo(nav) {
        this.$app.nav.navigateTo(nav)
      },
      organize_nav(id) {
        this.$app.nav.navigateTo('/pages/my/my_organize/organize_info/main', {id})
      },
      pushActivitie() {
        this.$app.nav.navigateTo('/pages/my/my_organize/publish_activities/main', {hostLV: this.hostLV})
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  .organize-btn {
    text-align center;
  }

  page {
    background-color $background-color
  }

  .organize {
    padding: 15px;

    .organize-box {
      padding: 15px;
      margin-bottom 15px;
      border-radius 10px;
      background-color rgba(0, 0, 0, .08);

      .organize-info {
        display flex
        align-items center;
        padding-bottom: 5px;
        font-size 14px;
        color: #999

        .organize-time {
          flex none;
        }

        .organize-address {
          width 0;
          flex 1
          margin-left 10px;
        }

        .organize-status {
          flex none;
          color: Darkorange;
        }
      }

      .organize-name {
        margin-top 5px;
        font-size 14px;
        color: #666;
      }
    }
  }
</style>
