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
        <div>{{item.remark?item.remark:''}}</div>
        <div>
          <span class="btn btn_size-small btn_color-DodgerBlue br5 of" @click="love_btn(item.attentionUserId)">邀约</span>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPay1">
      <div class="popup-box">
        <div class="pay-box">
          <div class="pay-price">支付费用{{love}}元
          </div>
          <!--<div class="pay-balance">会费剩余100元</div>-->
          <div class="pay-btn border-top" @click="invite_helper">确定</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->

  </main>
</template>

<script>
  export default {
    name: 'activity_invite',
    data() {
      return {
        isPay1: false,
        searchInvite: '',
        activityId: '21',//活动id
        addStatus: 'true',//是否添加成功
        hostStatus: '0',//能不能不要辅助人0不能
        userId: '4',//用户id
        list: [{
          id: 7,
          nickName: '名',
          remark: null,
          sex: 1,
          time: '2018-5-5 20:19:15'
        }],
        promiseLove: 0, // promiseLove 答应爱情价格
        love: 0, //love  邀请爱情价格
        invite_id: 0 //邀约人的Id
      }
    },
    async onLoad() {
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
        this.isPay1 = false
      },
      love_btn(id) {
        this.invite_id = id
        this.isPay1 = true
      },
      invite_helper() {
        this.$app.api.activity.addInvitation({
          activityId: 0,
          type: 3,//1参与者,2是辅助人,3爱情
          userId: this.$app.storageStore.userStore.getters.getUserId,
          invitationId: this.invite_id
        }).then(res => {
          console.log(res.data)
          if (res.data) {
            wx.reLaunch({url: '/pages/my/main'})
            wx.showToast({title: '邀约成功!', icon: 'none'})
          } else {
            wx.showToast({title: '邀约失败!不能邀约同性或余额不足!', icon: 'none'})
          }
        })
        this.closePopup()
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
