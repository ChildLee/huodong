<template>
  <main>
    <div class="activity_top">
      <div class="activity_search">
        <input v-model="search1" type="text" placeholder="搜索地点" @blur="search">
      </div>
      <div class="activity_btn" @click="filter">筛选</div>
    </div>

    <div class="activity_nav">
      <div @click="popup" style="color: #1D9ED7">优惠规则</div>
      <div @click="popup1" style="color: #1D9ED7">活动介绍</div>
      <div @click="past_activities" style="color: #1D9ED7">往期活动</div>
    </div>

    <div v-for="(item,index) in list" :key="item.id">
      <div class="container">
        <div class="activity_list" :class="item.surplusStatus===0?'':'bg-d8'" @click="activity(item.id)">
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
        <div class="popup-content">
          <!--<div class="popup-content-desc-1">-->
            <!--<div>被邀第一次参加活动可享8折优惠</div>-->
            <!--<div>会员邀请新成员参加后可获分享折扣红包</div>-->
          <!--</div>-->
          <div class="activity_rule_box">
            <div class="activity_rule activity_rule-title">
              <div>会员星级</div>
              <div>参与折扣</div>
              <div>推荐异性</div>
              <div>推荐异性</div>
              <div>推荐更多</div>
            </div>

            <div v-for="(item,index) in roles">
              <div class="activity_rule">
                <div v-if="item.level===1">I</div>
                <div v-if="item.level===2">II</div>
                <div v-if="item.level===3">III</div>
                <div v-if="item.level===4">IV</div>
                <div v-if="item.level===5">V</div>
                <div>{{item.rebate}}</div>
                <div>{{item.firstHeterosexual}}</div>
                <div>{{item.firstHomosexual}}</div>
                <div>{{item.other}}</div>
              </div>
            </div>


            <!--<div class="activity_rule">-->
            <!--<div>I</div>-->
            <!--<div>9</div>-->
            <!--<div>4</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--</div>-->
            <!--<div class="activity_rule">-->
            <!--<div>II</div>-->
            <!--<div>7</div>-->
            <!--<div>3</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--</div>-->
            <!--<div class="activity_rule">-->
            <!--<div>III</div>-->
            <!--<div>5</div>-->
            <!--<div>2</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--</div>-->
            <!--<div class="activity_rule">-->
            <!--<div>IV</div>-->
            <!--<div>3</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--</div>-->
            <!--<div class="activity_rule">-->
            <!--<div>V</div>-->
            <!--<div>1</div>-->
            <!--<div>2</div>-->
            <!--<div>1</div>-->
            <!--<div>1</div>-->
            <!--</div>-->
          </div>
          <!--<div class="popup-content-desc-2">-->
          <!--<div>一星会员9折参与</div>-->
          <!--<div>推荐新成员异性参加活动后返活动价格的4折</div>-->
          <!--<div>推荐同性新成员加活动后返活动价格的1折</div>-->
          <!--<div>再多荐新成员参加活动后无论同性异性皆返活动价的1折</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup">
        <!--幕布-->
      </div>
    </div>
    <!--弹窗-->


    <!--弹窗-->
    <div class="popup1" v-if="isPopup1">
      <div class="popup-box">
        <div>
          <!--这里填写弹窗的信息-->
          {{placard}}
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
        roles: [],
        placard: '',
        search1: '',
        isPopup: false,
        isPopup1: false,
        activityStatus: {
          title: '',
          type: 0, //type,0近期,1往期
          status: 1,//0收藏
          id: 0, //用户id
          page: 1 //页码
        },
        list: [{
          id: 0,
          title: '',
          time: '',
          place: '',
          surplusStatus: 0
        }]
      }
    },
    async onShow() {
      //初始化活动信息
      this.activityStatus.status = 1
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
        this.isPopup1 = false
      },
      popup() {
        this.$app.api.user.preferential().then(res => {
          this.roles = JSON.parse(res.data.preferential)
        })

        this.isPopup = true
      },
      popup1() {
        this.isPopup1 = true
        this.$app.api.activity.introduce().then(res => {
          this.placard = res.data.introduce
        })
      },
      filter() {
        let that = this
        wx.showActionSheet({
          itemList: ['收藏', '全部'],
          success: function (res) {
            if (res.tapIndex === 0) {
              that.activityStatus.status = 0
              that.init()
            }

            if (res.tapIndex === 1) {
              that.activityStatus.status = 1
              that.init()
            }
          }
        })
      },
      activity(id) {
        this.$app.nav.navigateTo('/pages/activity/activity_info/main', {
          id: id
        })
      },
      past_activities() {
        this.$app.nav.navigateTo('/pages/activity/past_activities/main')
      },
      search() {
        // console.log(1)
        // console.log(this.search1)
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
  @import "../../stylus/common.styl"

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: fixed;
      top: 15%;
      left: 8%;
      width 85%;
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

  /* 弹窗 */
  .popup1 {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: fixed;
      top: 15%;
      left: 8%;
      width 85%;
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

  .activity_nav {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 0 15px;
    font-size 14px;
    margin-bottom 15px;
    color: #1D9ED7;
    font-weight bold;
  }

  .activity_list {
    padding: 15px;
    background-color #f5f5f5;
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

  .popup-content {
    font-size 14px;
  }

  .activity_rule_box {
    width 200px;
    margin 20px auto;
    border-left: 1px solid black;
    border-top: 1px solid black;
  }

  .activity_rule-title {
    ._div {
      box-sizing border-box;
      padding: 5px;
      color: black !important;
    }
  }

  .activity_rule {
    display flex;
    justify-content space-between;
    align-items center;
    text-align center;

    ._div {
      display flex;
      align-items center;
      justify-content center
      width 100%;
      min-height: 40px;
      border-right: 1px solid black;
      border-bottom: 1px solid black;

      &:not(:first-child) {
        color: #009DDA;
      }
    }
  }

  .popup-content-desc-1 {
    font-size 14px;
    color: black;
    margin 10px 0;
    text-align center;
  }

  .popup-content-desc-2 {
    font-size 13px;
    color: #666666;
    margin 10px 0;
  }
</style>
