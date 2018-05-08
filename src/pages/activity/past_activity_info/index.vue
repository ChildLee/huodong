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
      <div class="assess_desc">点击人名进行评价</div>
      <div class="assess-rule" @click="assess_rule">评价规则</div>
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
            <div class="operate-attention" @click="focus(item,item.id,item.attention)">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else>&#xe613;</span>
            </div>
            <div @click="assess(item.id)">{{item.nickName}}</div>
          </div>
        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <div class="operate-attention" @click="focus(item,item.id,item.attention)">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else>&#xe613;</span>
            </div>
            <div @click="assess(item.id)">{{item.nickName}}</div>
          </div>
        </div>
      </div>

      <div class="active_staff" v-for="item in activityInfo.userList" v-if="item.role===3" :key="item.id">
        <div>辅助人</div>
        <div>
          <div class="operate" v-if="item.sex===1">
            <div class="operate-attention" @click="focus(item,item.id,item.attention)">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else>&#xe613;</span>
            </div>
            <div @click="assess(item.id)">{{item.nickName}}</div>
          </div>
        </div>
        <div>
          <div class="operate" v-if="item.sex===2">
            <div class="operate-attention" @click="focus(item,item.id,item.attention)">
              <span v-if="item.attention" style="color:red;">&#xe755;</span>
              <span v-else>&#xe613;</span>
            </div>
            <div @click="assess(item.id)">{{item.nickName}}</div>
          </div>
        </div>
      </div>
      <div class="active_staff">
        <div>参与人</div>
        <div class="participate">
          <div v-for="item in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===1">
              <div class="operate-attention" @click="focus(item,item.id,item.attention)">
                <span v-if="item.attention" style="color:red;">&#xe755;</span>
                <span v-else>&#xe613;</span>
              </div>
              <div @click="assess(item.id)">{{item.nickName}}</div>
            </div>
          </div>
        </div>
        <div class="participate">
          <div v-for="item in activityInfo.userList" v-if="item.role===1" :key="item.id">
            <div class="operate" v-if="item.sex===2">
              <div class="operate-attention" @click="focus(item,item.id,item.attention)">
                <span v-if="item.attention" style="color:red;">&#xe755;</span>
                <span v-else>&#xe613;</span>
              </div>
              <div @click="assess(item.id)">{{item.nickName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        activityId: 0, // 活动Id
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
    beforeMount () {
      this.activityId = this.$mp.query.id
      this.init()
    },
    methods: {
      init () {
        //初始化页面
        this.$app.api.activity.activity({
          // id: this.activityId, //活动id
          id: 1,
          userId: this.$app.storageStore.userStore.getters.getUserId //用户id
        }).then(res => {
          this.activityInfo = res.data
          this.activityInfo.activity = JSON.parse(res.data.activity)
          this.activityInfo.userList = JSON.parse(res.data.userList)
        })
      },
      assess_rule () {
        wx.showToast({
          title: '对方投诉成功，评价人取消本次参与计数',
          icon: 'none',
          duration: 2000
        })
      },
      focus (item, id, attention) {
        this.$app.api.user.addFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          attentionUserId: id,
          status: !attention
        }).then(res => {
          if (res.data) {
            item.attention = !item.attention
          }
        })
      },
      assess (id) {
        console.log(id)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"
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
    background-color #ccc;
  }

  .activity-info {
    font-size 14px;
    background-color #ccc;
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
</style>
