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
    </div>

    <div class="activity_personnel icon">
      <div class="active_staff icon">
        <div></div>
        <div>&#xe643;</div>
        <div>&#xe665;</div>
      </div>

      <div class="active_staff" v-for="(item,index) in activityInfo.userList" v-if="item.role===2" :key="item.id">
        <div>主持人</div>
        <div>
          <div class="operate" v-if="item.sex===1">
            <div class="operate-attention">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else class="db w25"></span>
            </div>
            <div>{{item.nickName}}
              <span style="color: #1D9ED7;">
              {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <div class="operate-attention">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else class="db w25"></span>
            </div>
            <div>{{item.nickName}}
              <span style="color: #1D9ED7;">
                {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="active_staff" v-for="(item,index) in activityInfo.userList" v-if="item.role===3"
           :key="item.id">
        <div class="">辅助人</div>
        <div>
          <div class="operate" v-if="item.sex===1">
            <div class="operate-attention">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else class="db w25"></span>
            </div>
            <div>{{item.nickName}}
              <span style="color: #1D9ED7;">
                {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
            </div>
          </div>

        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <div class="operate-attention">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else class="db w25"></span>
            </div>
            <div>{{item.nickName}}
              <span style="color: #1D9ED7;">
               {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="active_staff">
        <div>参与人</div>
        <div class="participate">
          <div class="info_height" v-for="(item,index) in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===1">
              <div class="operate-attention">
                <span v-if="item.attention" style="color:red;">&#xe755;</span>
                <span v-else class="db w25"></span>
              </div>
              <div>{{item.nickName}}
                <span style="color: #1D9ED7;">
               {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
              </div>
            </div>
          </div>
        </div>
        <div class="participate">
          <div class="info_height" v-for="item in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===2">
              <div class="operate-attention">
                <span v-if="item.attention" style="color:red;">&#xe755;</span>
                <span v-else class="db w25"></span>
              </div>
              <div>{{item.nickName}}
                <span style="color: #1D9ED7;">
                {{item.maxLV===0?'Ⅰ':''}}
              {{item.maxLV===1?'Ⅱ':''}}
              {{item.maxLV===2?'Ⅲ':''}}
              {{item.maxLV===3?'Ⅳ':''}}
              {{item.maxLV===4?'Ⅴ':''}}
              {{item.maxLV===5?'Ⅵ':''}}
              {{item.maxLV===6?'Ⅶ':''}}
              {{item.maxLV===7?'Ⅷ':''}}
              {{item.maxLV===8?'Ⅸ':''}}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPay">
      <div class="popup-box">
        <div class="pay-box">
          <div class="pay-price">支付会费{{user.sex===1?activityInfo.activity.menPrice:activityInfo.activity.womenPrice}}元
          </div>
          <!--<div class="pay-balance">会费剩余100元</div>-->
          <div class="pay-btn border-top" @click="payBtn">确定</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->

    <div class="footer_line"></div>
    <div class="footer">
      <div @click="collection">
        <span class="icon">&#xe607;</span>
        <span>收藏</span>
      </div>
      <button class="btn-share" open-type="share">
        <span class="icon">&#xe642;</span>
        <span>分享</span>
      </button>
      <div @click="invitation">
        <span class="icon">&#xe7af;</span>
        <span>邀约</span>
      </div>
      <div @click="participate">
        <span class="icon">&#xe60a;</span>
        <span>参加</span>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'activity_info',
    data() {
      return {
        submit: true,
        user: '',
        isPay: false, //支付弹窗
        activityId: 0, //活动Id
        dataStatus: 0, //资料是否填写
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
            content: '', //内容
            menPrice: 0, //男价格
            womenPrice: 0, //女价格
            freePlaces: 0, //免费名额
            surplusStatus: 0 //活动是否满员,0没满,1满员
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
          advanced: 0, //超级会员总共免费次数
          ordinary: 0, //普通会员总共免费次数
          status: 0, //0没参加,1参加了
          integral: 0, //剩余积分
          number: 0//剩余免费参加活动次数
        }
      }
    },
    onShow() {
      this.submit = true
      wx.showLoading({title: '数据加载中'})
      this.dataStatus = this.$app.storageStore.userStore.getters.getType //获取资料填写状态
      this.activityId = this.$mp.query.id //获取活动id
      //初始化活动信息
      this.init()//调用初始化
    },
    methods: {
      //初始化页面
      async init() {
        this.activityInfo = []
        this.activityInfo.activity = []
        this.activityInfo.userList = []
        await this.$app.api.activity.activity({
          id: this.activityId, //活动id
          userId: this.$app.storageStore.userStore.getters.getUserId //用户id
        }).then(res => {
          this.activityInfo = res.data
          this.activityInfo.activity = JSON.parse(res.data.activity)
          this.activityInfo.userList = JSON.parse(res.data.userList)
        })

        await this.$app.api.user.userCenter({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          if (res.data) {
            this.user = JSON.parse(res.data.user)
          }
          wx.hideLoading()
        })
      },
      goData() {
        this.$app.nav.navigateTo('/pages/my/my_info/add_info/main')
      },
      navigateTo(nav) {
        this.$app.nav.navigateTo(nav)
      },
      //收藏按钮
      collection() {
        if (!this.dataStatus) {
          return this.goData()
        }
        this.$app.api.activity.collect({
          status: 0,
          userId: this.$app.storageStore.userStore.getters.getUserId,
          id: this.activityId
        }).then(res => {
          if (res.data) {
            wx.showToast({title: '收藏成功!', icon: 'none'})
          }
        })
      },
      //邀约
      invitation() {
        if (!this.dataStatus) {
          return this.goData()
        }
        this.activityInfo.activity.surplusStatus ? wx.showToast({
          title: '活动人数已满!', icon: 'none'
        }) : this.$app.nav.navigateTo('/pages/activity/invite/main', {id: this.activityId})
      },
      //参加
      participate() {
        if (this.submit) {
          this.submit = false
        } else {
          return wx.showToast({title: '请不要重复提交', icon: 'none'})
        }


        if (!this.dataStatus) {
          return this.goData()
        }
        if (this.activityInfo.activity.surplusStatus) {
          return wx.showToast({title: '活动人数已满!', icon: 'none'})
        }
        this.isPay = true
      },
      //关闭幕布
      closePopup() {
        this.isPay = false
      },
      payBtn() {
        let that = this
        this.$app.api.activity.joinActivity({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          activityId: this.activityId
        }).then(res => {
          console.log(res)
          if (res.data) {
            wx.showToast({title: '参加成功!', icon: 'none'})
            that.init()
          } else {
            wx.showToast({title: '参加失败,余额不足或已参加该活动', icon: 'none'})
          }
          this.closePopup()
        })
      }
    },
    onShareAppMessage() {
      return {
        title: '竹芝林',
        path: '/pages/activity/main'
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

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

  .footer_line {
    height 52px;
  }

  .footer {
    width 100%;
    position: fixed;
    bottom 0;
    line-height 50px;
    height 50px;
    display flex;
    justify-content space-between;
    align-items center;
    font-size 16px;
    color: #999;
    background-color white;
    box-sizing border-box;
    z-index 2
    overflow hidden;
    border-top 1px solid #ccc;

    ._div {
      flex 1;
      text-align center;

      ._span {
        padding 0 2px;
      }

      &:last-child {
        background-color #1D9ED7;
        color: white;
      }
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

  .activity-title {
    text-align center;
    font-weight bold;
  }

  .organize_desc {
    display flex;
    align-items center;
    padding: 5px 0;
    font-size 14px;
    color: #1D9ED7;
    font-weight bold;
  }

  .title-mark {
    display inline-block;
    width 5px;
    height 15px;
    line-height 0;
    font-size 0;
    margin-right 5px;
    background #1D9ED7;
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

  .info_height {
    min-height: 60px;
  }
</style>
