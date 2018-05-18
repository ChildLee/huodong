<template>
  <main>
    <div class="past-top">
      <div class="past-top-Notice">公告</div>
      <div class="past-top-input_box">
        <input class="past-top-input" type="text" placeholder="搜索活动">
      </div>
      <div class="past-top-participating">已参加的</div>
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

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        activityStatus: {
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
      this.$app.api.activity.getActivitys(this.activityStatus).then(res => {
        this.list = JSON.parse(res.data.activities)
      })
    },
    methods: {
      activity(id) {
        this.$app.nav.navigateTo('/pages/activity/past_activity_info/main', {id: id})
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
</style>
