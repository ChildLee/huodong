<template>
  <main>
    <div class="activity_top" style="background: white">
      <div class="activity_search">
        <input v-model="searchInvite" type="text" placeholder="搜索关注人" @blur="search">
      </div>
    </div>

    <div class="invite-title border-bottom">
      <div>关注人</div>
      <div>备注</div>
      <div>邀约</div>
    </div>

    <div v-for="(item,index) in list" :key="index">

      <div class="invite-list border-bottom">
        <div>{{item.nickName}}</div>
        <div>{{item.remark}}</div>
        <div>
          <span class="btn btn_size-small btn_color-DodgerBlue br5 of"
                @click="invite_helper(item.attentionUserId)">邀约</span>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
  export default {
    name: 'activity_invite',
    data() {
      return {
        searchInvite: '',
        activityId: '21',//活动id
        addStatus: 'true',//是否添加成功
        hostStatus: '0',//能不能不要辅助人0不能
        userId: '4',//用户id
        list: [{'attentionUserId': 6, 'id': 104, 'nickName': '66666666', 'remark': '后台', 'sex': 2}]
      }
    },
    async onLoad() {
      wx.showLoading({title: '加载中'})
      this.activityId = this.$mp.query.id
      await this.init()
    },
    methods: {
      async init() {
        this.list = []
        this.$app.api.user.myFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          if (res.data) {
            this.list = JSON.parse(res.data.focus)
          }
          wx.hideLoading()
        })
      },
      invite_helper(id) {
        wx.showLoading({title: '邀约中'})
        let that = this
        this.$app.api.activity.addInvitation({
          activityId: this.activityId,
          type: 1,//1参与者,2是辅助人,3爱情
          userId: this.$app.storageStore.userStore.getters.getUserId,
          invitationId: id
        }).then(res => {
          console.log(res)
          if (res.data) {
            that.$app.nav.navigateTo('/pages/activity/activity_info/main', {id: that.activityId})
            wx.showToast({title: '邀约成功!', icon: 'success'})
            wx.hideLoading()
          }
        })
      },
      search() {
        this.list = []
        this.$app.api.user.myFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          condition: this.searchInvite
        }).then(res => {
          console.log(res)
          if (res.data) {
            this.list = JSON.parse(res.data.focus)
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  page {
    /*background-color #e4e4e4;*/
  }

  .btn-no_border {
    border-radius 15px;

    &::after {
      border: none;
    }
  }

  .invite-search {
    width 80%;
    margin 5px auto;
    background-color white;
    border-radius 10px;
    text-align center;
    padding: 5px 0;
  }

  .invite-title {
    font-size 16px;
    font-weight bold;
    display: flex;
    align-items center;
    padding: 10px 0;
    ._div {
      flex: 1;
      text-align center
    }

  }

  .invite-list {
    display: flex;
    align-items center;
    background-color white;
    padding: 10px 0;
    font-size 16px;

    ._div {
      flex: 1;
      text-align center
    }
  }

  .activity_top {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 15px;

    .activity_search {
      flex 1;

      input {
        border: 1px solid #ccc
        font-size 14px;
      }
    }
    .activity_btn {
      margin-left 15px;
      font-size 14px;
    }
  }
</style>
