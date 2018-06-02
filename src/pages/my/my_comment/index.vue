<template>
  <main>
    <div class="tab">
      <div class="tab-box tab-fixed">
        <div class="tab-item" :class="currentTab==1?'tab-item-selected':''" @click="switchNav(1)">
          <div class="tab-title">给出的评价</div>
        </div>
        <div class="tab-item" :class="currentTab==2?'tab-item-selected':''" @click="switchNav(2)">
          <div class="tab-title">收到的评价</div>
        </div>
      </div>
    </div>

    <div class="comment_filter panel">
      <div>总计：{{activitys.length}}(筛选总数)</div>
      <div @click="isPopup_1">筛选</div>
    </div>

    <div v-for="(item,index) in activitys" :key="index">
      <div class="comment_box border_line panel">
        <div class="comment_score">
          <span>{{item.score}}分</span>
          <i class="icon"
             :style="item.attention?'color:red;':''"
             :class="item.attention?'icon-red-heart':'icon-heart'" @click="focus(item,item.id,item.attention)"></i>
        </div>
        <div class="comment_info">
          <div class="comment_time_location">
            <div class="comment_time">{{item.time}}</div>
            <div class="comment_location">{{item.title}}</div>
            <!--<div class="comment_btn" @click="isPopup_2" v-if="item.complaintsStatus">投诉信息</div>-->
          </div>
          <div class="comment_text">
            <span>{{item.role===1?'(主持人)':item.role===2?'(辅助人)':''}}{{item.nickName}}：{{item.review}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--筛选弹窗-->
    <div class="popup_1" v-if="popup_1">
      <div class="popup-box">
        <div class="filter_box">
          <div @click="filter_comment(false,1)" class="border-bottom_line">主持人</div>
          <div @click="filter_comment(false,2)" class="border-bottom_line">辅助人</div>
          <div @click="filter_comment(false,3)" class="border-bottom_line">参与人</div>
          <div @click="filter_comment(5)" class="border-bottom_line">5分</div>
          <div @click="filter_comment(4)" class="border-bottom_line">4分</div>
          <div @click="filter_comment(3)" class="border-bottom_line">3分</div>
          <div @click="filter_comment(2)" class="border-bottom_line">2分</div>
          <div @click="filter_comment(1)" class="border-bottom_line">1分</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--筛选弹窗-->

    <!--投诉信息弹窗-->
    <!--<div class="popup_2" v-if="popup_2">-->
    <!--<div class="popup-box">-->
    <!--<div>-->
    <!--<div class="Complaints">投诉原因</div>-->
    <!--<div class="Complaints-info">不好玩不好玩不好玩不好玩不好玩不好玩</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="popup-curtain" @click="closePopup">&lt;!&ndash;幕布&ndash;&gt;</div>-->
    <!--</div>-->
    <!--投诉信息弹窗-->

  </main>
</template>

<script>
  export default {
    name: 'my_comment',
    data() {
      return {
        currentTab: 1, // tab当下标
        popup_1: false,
        popup_2: false,
        param: {
          status: 1, //1给出的,2收到的
          role: 0,
          score: ''
        },
        activitys: [{
          adminFeedback: null,
          attention: 1,//是否关注
          complaints: null,//投诉内容
          complaintsStatus: 0,//是否投诉了 0未 1投诉了
          nickName: 'cs名', //昵称
          place: '地点4',//地点
          review: '这个是我给出的评价1',//评论内容
          role: 1, //角色
          score: 5, //得分
          time: '2018-04-24 17:25:46',//时间
          title: '标题4'
        }]
      }
    },
    async onLoad() {
      await this.init({status: 1, role: 1})
    },
    methods: {
      async init(param) {
        this.activitys=[]
        this.$app.api.activity.myComment({
          status: param.status,
          userId: this.$app.storageStore.userStore.getters.getUserId,
          role: param.role,
          score: param.score
        }).then(res => {
          console.log(res)
          this.activitys = res.data ? JSON.parse(res.data.activitys) : []
        })
      },
      closePopup() {
        this.popup_1 = false
        this.popup_2 = false
      },
      isPopup_1() {
        this.popup_1 = true
      },
      isPopup_2() {
        this.popup_2 = true
      },
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
        this.param.status = tab
        this.param.score = ''
        this.param.role = 1
        this.init(this.param)
      },
      filter_comment(score, role) {
        score ? this.param.score = score : this.param.role = role
        score ? this.param.role = '' : this.param.score = ''
        this.init(this.param)
        this.closePopup()
      },
      //点击💗关注事件
      focus(item, id, attention) {
        this.$app.api.user.addFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          attentionUserId: id,
          status: !attention
        }).then(res => {
          if (res.data) {
            item.attention = !item.attention
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl";

  page {
    background-color: $background-color;
  }

  .comment_filter {
    display flex;
    justify-content space-between;
    align-items center;
    padding 5px 15px;
    font-size 14px;
    color: $text-color
  }

  .comment_box {
    display flex;
    padding: 15px;
    font-size 14px;

    .comment_score {
      flex none;
      align-self center;
      text-align center;
    }
    .comment_info {
      flex 1;
      margin-left 5px;

      .comment_time_location {
        display flex;
        justify-content space-between;
        align-items center;
        font-size: 12px;
        color: #999999;

        .comment_time {
          flex none;
        }

        .comment_location {
          flex 1 0 0;
          width 0;
          margin-left 5px;
          white-space nowrap;
          overflow hidden;
          text-overflow ellipsis;
        }

        .comment_btn {
          flex none;
        }
      }
    }

    .comment_text {
      padding 0;
    }
  }

  /* 弹窗 */
  .popup_1 {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      /*border-radius 10px;*/
      background-color white;
      position: absolute;
      top: 30%;
      left: 35%;
      width 30%;
      z-index: 3;
      transition: all 2s;
      text-align center;

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

  /* 评价弹窗 */
  .popup_2 {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: fixed;
      top: 30%;
      left: 10%;
      width 80%;
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

  .filter_box {
    margin -15px;

    ._div {
      padding: 5px 0;
    }
  }

  .Complaints {
    font-size 16px;
  }

  .Complaints-info {
    font-size 14px;
    color: #999;
  }
</style>
