<template>
  <main>
    <div class="activity-title">
      {{activityInfo.activity.title}}
    </div>

    <div class="organize_desc panel panel-no_border">
      <div class="title-mark"></div>
      <div>活动详情</div>
    </div>
    <div class="activity-info">
      <div>时间：{{activityInfo.activity.time}}</div>
      <div>地点：{{activityInfo.activity.place}}</div>
      <div>联系：{{activityInfo.activity.phone}}</div>
      <div class="icon">费用：&#xe643;{{activityInfo.activity.menPrice}}&#xe665;{{activityInfo.activity.womenPrice}}</div>
      <div>会员免费名额：{{activityInfo.activity.freePlaces}}人</div>
      <div>活动内容：</div>
      <div class="activity-info-content">{{activityInfo.activity.content}}</div>
      <!--<div class="activity-info-desc" v-if="activityInfo.activity.img">-->
      <!--<img :src="activityInfo.activity.img" mode="widthFix">-->
      <!--</div>-->
    </div>

    <div class="past_activity_info-box panel panel-no_border">
      <div class="organize_desc">
        <div class="title-mark"></div>
        <div>参与人员</div>
      </div>
      <!--<div class="assess_desc">点击人名进行评价</div>-->
      <!--<div class="assess-rule" @click="assess_rule">评价规则</div>-->
    </div>

    <div class="activity_personnel icon">
      <div class="active_staff">
        <div></div>
        <div>男</div>
        <div>女</div>
      </div>

      <div class="active_staff" v-for="(item,index) in activityInfo.userList" v-if="item.role===2" :key="item.id">
        <div>主持人</div>
        <div>
          <div class="operate" v-if="item.sex===1">
            <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
            <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
            <!--<span v-else>&#xe613;</span>-->
            <!--</div>-->
            <div @click="assess(item)">{{item.nickName}}</div>
            <div class="price_color">￥{{item.price}}</div>
          </div>
        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
            <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
            <!--<span v-else>&#xe613;</span>-->
            <!--</div>-->
            <div @click="assess(item)">{{item.nickName}}</div>
            <div class="price_color">￥{{item.price}}</div>
          </div>
        </div>
      </div>

      <div class="active_staff" v-for="item in activityInfo.userList" v-if="item.role===3" :key="item.id">
        <div>辅助人</div>
        <div>
          <div class="operate" v-if="item.sex===1">
            <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
            <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
            <!--<span v-else>&#xe613;</span>-->
            <!--</div>-->
            <div @click="assess(item)">{{item.nickName}}</div>
            <div class="price_color">￥{{item.price}}</div>
          </div>
        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
            <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
            <!--<span v-else>&#xe613;</span>-->
            <!--</div>-->
            <div @click="assess(item)">{{item.nickName}}</div>
            <div class="price_color">￥{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="active_staff">
        <div>参与人</div>
        <div class="participate">
          <div v-for="item in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===1">
              <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
              <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
              <!--<span v-else>&#xe613;</span>-->
              <!--</div>-->
              <div @click="assess(item)">{{item.nickName}}</div>
              <div class="price_color">￥{{item.price}}</div>
            </div>
          </div>
        </div>
        <div class="participate">
          <div v-for="item in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===2">
              <!--<div class="operate-attention" @click="focus(item,item.id,item.attention)">-->
              <!--<span v-if="item.attention" style="color:red;">&#xe755;</span>-->
              <!--<span v-else>&#xe613;</span>-->
              <!--</div>-->
              <div @click="assess(item)">{{item.nickName}}</div>
              <div class="price_color">￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isAssess">
      <div class="popup-box">
        <div>
          <div class="assess_popup-title">5分是很宝贵的，请别随意给出</div>
          <div class="assess_popup-score">
            <div @click="clickScore(1)" :class="assess_score===1?'assess_score-selected':''">1分</div>
            <div @click="clickScore(2)" :class="assess_score===2?'assess_score-selected':''">2分</div>
            <div @click="clickScore(3)" :class="assess_score===3?'assess_score-selected':''">3分</div>
            <div @click="clickScore(4)" :class="assess_score===4?'assess_score-selected':''">4分</div>
            <div @click="clickScore(5)" :class="assess_score===5?'assess_score-selected':''">5分</div>
          </div>
          <div class="assess_popup-comment_box">
            <textarea v-model="review" class="assess_popup-comment" maxlength="1000"
                      placeholder="评语不只是您对他人的权利,更是您自身的体现,请注意客观和风度">
            </textarea>
          </div>
          <div class="assess_popup-send">
            <span class="send" @click="send_assess">发送</span>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="closeAssess"><!--幕布--></div>
    </div>
    <!--弹窗-->

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        activityId: 0, //活动Id
        assessId: 0, //被评价人的id
        assessRole: 0, //被评价人的角色
        assess_score: 0, //评价得分
        review: '', //评价内容
        isAssess: false, //是否显示弹窗
        activityInfo: {
          activity: {
            hostRevenue: 0, //主持人收入
            assistantRevenue: 0, //辅助人收入
            title: '', //标题
            time: '', //时间
            place: '', //地点
            phone: '', //手机
            content: '', //内容,
            menPrice: 0, //男价格
            womenPrice: 0, //女价格
            freePlaces: 0 //免费名额
          },
          userList: [{
            id: 0,
            nickName: '', //用户名
            maxLV: 0, //
            star: 0, //星级
            attention: 0, //是否关注
            role: 0, //角色 1参与者 2主持人 3辅助人
            sex: 0 //性别
          }],
          advanced: 0, //超级会员免费次数
          ordinary: 0, //普通会员免费次数
          integral: 0, //剩余积分
          status: 0 //0没参加,1参加了
        }
      }
    },
    watch: {
      //监听评价弹窗是否关闭
      isAssess(param) {
        if (!param) {
          this.assess_score = 0//清空评价得分
          this.review = ''//清空评价
        }
      }
    },
    async onLoad() {
      this.activityId = this.$mp.query.id//保存活动ID
      await this.init()//调用初始化
    },
    methods: {
      //初始化页面
      async init() {
        this.$app.api.activity.myOrganization({
          id: this.activityId, //活动id
          userId: this.$app.storageStore.userStore.getters.getUserId //用户id
        }).then(res => {
          this.activityInfo.activity = JSON.parse(res.data.myOrganizations)
          this.activityInfo.userList = JSON.parse(res.data.userlists)
        })
      },
      //点击评价规则
      assess_rule() {
        wx.showToast({title: '对方投诉成功，评价人取消本次参与计数', icon: 'none'})
      },
      //点击分数事件
      clickScore(score) {
        this.assess_score = score
      },
      //点击💗关注事件
      focus(item, id, attention) {
        // this.$app.api.user.addFocus({
        //   userId: this.$app.storageStore.userStore.getters.getUserId,
        //   attentionUserId: id,
        //   status: !attention
        // }).then(res => {
        //   if (res.data) {
        //     item.attention = !item.attention
        //   }
        // })
      },
      //关闭评价弹窗
      closeAssess() {
        this.isAssess = false
      },
      //打开评价弹窗
      assess(item) {
        this.assessId = item.id //获取被评价人的id
        this.assessRole = item.role //获取被评价人的角色
        //this.isAssess = !this.isAssess
      },
      //发送评价信息
      send_assess() {
        if (!this.assess_score) {
          wx.showToast({title: '请给予评分!', icon: 'none'})
        } else if (!this.review) {
          wx.showToast({title: '请填写评价!', icon: 'none'})
        } else {
          this.$app.api.activity.addComment({
            userId: this.$app.storageStore.userStore.getters.getUserId,
            role: this.assessRole,
            activityId: this.activityId,
            reviewUserId: this.assessId,
            review: this.review,
            score: this.assess_score
          }).then(res => {
            res.state ? wx.showToast({title: res.message, icon: 'none'}) : wx.showToast({title: '评价成功!', icon: 'none'})
          }).then(() => {
            this.isAssess = false
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  .price_color {
    color: #25ABDF;
  }

  .assess_popup-title {
    text-align center;
    font-size 14px;
    color: #999;
  }

  .assess_popup-score {
    display flex;
    align-items center;
    justify-content center;

    ._div {
      flex none;
      margin 10px 5px;
      width 35px;
      height 35px;
      line-height 35px;
      text-align center;
      border-radius 50%;
      border: 1px solid #ccc;
      color: #ccc;
      font-size 14px;
    }

    .assess_score-selected {
      background-color: #009dda;
      border: 1px solid #009dda;
      color: white;
    }
  }

  .assess_popup-comment_box {

  }

  .assess_popup-comment {
    display block;
    width 100%;
    border: 1px solid #ccc;
    font-size 14px;
    border-radius 5px;
    padding: 5px;
    box-sizing border-box;
  }

  .assess_popup-send {
    text-align center;
    padding: 5px;

    .send {
      padding: 5px;
      font-size 16px;
      color: #1D9ED7;
    }
  }

  .operate {
    display flex;
    align-items center;
    position: relative;
    margin-left 15px;

    .operate-attention {
      font-size 26px;
      margin-right 10px;
    }
  }

  .past_activity_info-box {
    display flex;
    align-items center;
    justify-content space-between;

    .assess_desc {
      color: #ccc;
      font-size 14px;
    }

    .assess-rule {
      font-size 14px;
      margin-right 10px;
      color: #1D9ED7;
    }
  }

  .activity-title {
    text-align center;
    font-weight bold;
  }

  .organize_desc {
    display flex;
    align-items center;
    padding: 5px 0;
    font-size 14px;
    color: DodgerBlue;
    font-weight bold;
  }

  .title-mark {
    display inline-block;
    width 5px;
    height 15px;
    line-height 0;
    font-size 0;
    margin-right 5px;
    background DodgerBlue;
  }

  .activity_personnel {
    background-color #eee;
  }

  .activity-info {
    font-size 14px;
    background-color #eee;
  }

  .activity-info-content {
    text-indent 2em;
  }

  .activity-info-desc img {
    width 100%;
    display block;
  }

  .active_staff {
    display flex;
    font-size 14px;

    > ._div {
      width 0;
      flex 1;
      padding: 15px 0;
      text-align center;
      position: relative;

      &::after {
        border_line(white);
        border-right-width 1px;
        border-bottom-width 1px;
      }
    }
  }

  .participate {
    width 100%;
    padding: 0 !important;

    > ._div {
      position: relative;
      padding: 15px 0;
      box-sizing border-box;

      &::after {
        border_line(white);
        border-bottom-width 1px;
      }
    }
  }

  .btn-share {
    padding: 0;
    width 0;
    flex 1;
    background-color white;
    font-size 16px;
    color: #999;
    border: 0 solid #ccc;
    border-left-width 1px;
    border-right-width 1px;
    border-radius 0;
    line-height 50px;
    height 50px;

    ._span {
      padding 0 2px;
    }

    &::after {
      border: none;
    }
  }

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: absolute;
      top: 25%;
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
      position absolute;
      top: 0;
      left 0;
      width 100%;
      height 100%;
      z-index 2;
    }
  }
</style>
