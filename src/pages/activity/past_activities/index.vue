<template>
  <main>
    <div class="past-top">
      <div class="past-top-Notice" @click="popup">公告</div>
      <div class="past-top-input_box">
        <input v-model="search1" class="past-top-input" type="text" placeholder="搜索地点" @blur="search">
      </div>
      <div class="past-top-participating" @click.stop="can">已参加的</div>
    </div>

    <div v-for="item in list" :key="item.id">
      <div class="container">
        <div class="activity_list" @click="activity(item.id)">
          <div class="activity_list_info">
            <div>{{item.time}}</div>
            <div class="activity_list_info-address">{{item.title}}</div>
          </div>
          <div class="activity_list_info-content">{{item.place}}</div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>
          {{public_notice}}
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        public_notice: '',
        isPopup: false, //是否显示弹窗
        search1: '',
        activityStatus: {
          title: '',
          type: 1, //type,0近期,1往期
          status: 1,
          id: 0, //用户id
          page: 1 //页码
        },
        list: [{
          id: 0,
          title: '',
          time: '',
          place: ''
        }]
      }
    },
    async onLoad() {
      //初始化活动信息
      this.activityStatus.id = this.$app.storageStore.userStore.getters.getUserId //获取用户id
      await this.init()
    },
    methods: {
      async init() {
        this.list = []
        await this.$app.api.activity.getActivitys(this.activityStatus).then(res => {
          if (res.data) {
            this.list = JSON.parse(res.data.activities)
          }
        })
      },
      closePopup() {
        this.isPopup = false
      },
      popup() {
        this.isPopup = true
        this.$app.api.activity.placard().then(res => {
          if (res.data) {
            this.public_notice = res.data.placard
          }
        })
      },
      activity(id) {
        this.$app.nav.navigateTo('/pages/activity/past_activity_info/main', {id: id})
      },
      can() {
        this.$app.nav.navigateTo('/pages/my/my_activity/main')
      },
      search() {
        this.activityStatus.title = this.search1
        this.init()
      }
    },
    onReachBottom() {
      //上拉刷新
      this.activityStatus.page++ //页码加一
      this.$app.api.activity.getActivitys(this.activityStatus).then(res => {
        //传入的页面和服务器返回的页面是否一致,不一致则没有下一页了,不刷新
        if (res.data.page === this.activityStatus.page) {
          this.list = this.list.concat(JSON.parse(res.data.activities))
        }
      })
    }
  }
</script>

<style lang="stylus">
  .past-top {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 15px;
    font-size 16px;

    ._div {
      flex 1;
    }

    .past-top-Notice {
      flex none;
      color: #009DDA;
      font-weight bold;
      font-size 14px;
    }

    .past-top-participating {
      flex none;
      color: #009DDA;
      font-weight bold;
      font-size 14px;
    }

    .past-top-input_box {
      margin 0 10px;

      .past-top-input {
        width 100%;
        border: 1px solid #ccc;
        text-align center;
        border-radius 5px;
      }
    }
  }

  .activity_list {
    padding: 15px;
    background-color #e9e9e9;
    border-radius 10px;
    font-size 16px;
    margin-bottom 10px;

    .activity_list_info {
      display flex;
      color: #999;
      font-size 14px;

      .activity_list_info-address {
        margin-left 10px;
      }
    }

    .activity_list_info-content {
      text-indent 2em;
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
      top: 15%;
      left: 10%;
      width 80%;
      height 70%;
      z-index: 3;
      transition: all 2s;
      overflow auto;

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

</style>
