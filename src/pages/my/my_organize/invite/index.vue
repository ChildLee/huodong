<template>
  <main>
    <!--<div class="invite-search">-->
    <!--<input type="text" placeholder="搜索">-->
    <!--</div>-->

    <div class="invite-title border-bottom">
      <div>关注人</div>
      <div>备注</div>
      <div>邀约</div>
    </div>

    <div v-for="(item,index) in list" :key="index">

      <div class="invite-list border-bottom">
        <div>{{item.nickName}}</div>
        <div>{{item.remark?remark:''}}</div>
        <div>
          <span class="btn-no_border btn btn_size-small btn_color-DodgerBlue" @click="invite_helper(item.id)">邀约</span>
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
        activityId: "21",//活动id
        addStatus: "true",//是否添加成功
        hostStatus: "0",//能不能不要辅助人0不能
        userId: "4",//用户id
        list: [{
          id: 7,
          nickName: "名",
          remark: null,
          sex: 1,
          time: "2018-5-5 20:19:15"
        }]
      }
    },
    beforeMount() {
      console.log(this.$mp.query);
      this.init();
    },
    methods: {
      init() {
        this.$app.api.user.myFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          if (res.data) {
            this.list = JSON.parse(res.data.focus);
          } else {
            this.list = []
          }
        })
      },
      invite_helper(id) {
        console.log(id);
        this.$app.api.activity.addInvitation({
          activityId: this.activityId,
          type: 2,//1参与者,2是辅助人,3爱情
          userId: this.$app.storageStore.userStore.getters.getUserId,
          invitationId: id
        }).then(res => {
          if (res.data) {
            this.$app.nav.navigateTo('/pages/my/my_activity/main')
            wx.showToast({title: '邀约成功!', icon: 'success'})
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
</style>
