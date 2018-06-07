<template>
  <main>
    <div class="attention_info panel panel-no_top panel-no_border">
      <img class="attention_info-img" :src="user.avatatUrl?user.avatatUrl:''">
      <div class="attention_info_box">
        <div class="info-name">{{user.nick}}</div>
        <div class="info-Marriage">
          <span class="icon" v-if="user.sex">&#xe665;</span>
          <span class="icon" v-else>&#xe643;</span>
          <span>{{love}}</span>
        </div>
        <div class="info-address">{{user.currentCity}}</div>
      </div>

      <div class="attention_level c999">
        <div>
          <span>会员：</span>
          <span v-if="userInfo.star===0">0级</span>
          <span v-if="userInfo.star===1">Ⅰ级</span>
          <span v-if="userInfo.star===2">Ⅱ级</span>
          <span v-if="userInfo.star===3">Ⅲ级</span>
          <span v-if="userInfo.star===4">Ⅳ级</span>
          <span v-if="userInfo.star===5">Ⅴ级</span>
          <span v-if="userInfo.star===6">Ⅵ级</span>
          <span v-if="userInfo.star===7">Ⅶ级</span>
          <span v-if="userInfo.star===8">Ⅷ级</span>
          <span v-if="userInfo.star===9">Ⅸ级</span>
          <span v-if="userInfo.star===10">Ⅹ级</span>
        </div>
        <div>
          <span>主持：</span>
          <span v-if="userInfo.hostLevel===0">初级</span>
          <span v-if="userInfo.hostLevel===1">优秀</span>
          <span v-if="userInfo.hostLevel===2">明星</span>
          <span v-if="userInfo.hostLevel===3">大咖</span>
          <span v-if="userInfo.hostLevel===4">阿神</span>
        </div>
        <div>
          <span>辅助：</span>
          <span v-if="userInfo.assistantLevel===0">初级</span>
          <span v-if="userInfo.assistantLevel===1">优秀</span>
          <span v-if="userInfo.assistantLevel===2">明星</span>
          <span v-if="userInfo.assistantLevel===3">大咖</span>
          <span v-if="userInfo.assistantLevel===4">阿神</span>
        </div>
        <div>
          <span>塔木德：</span>
          <span v-if="userInfo.talmudLevel===0">初级</span>
          <span v-if="userInfo.talmudLevel===1">优秀</span>
          <span v-if="userInfo.talmudLevel===2">明星</span>
          <span v-if="userInfo.talmudLevel===3">大咖</span>
          <span v-if="userInfo.talmudLevel===4">阿神</span>
        </div>
      </div>


    </div>

    <div class="panel">
      <div class="other_info">
        <div class="border">
          <span class="tag-box">
            <span>年龄</span>
            <span class="tag tab-no_bg">{{user.age}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>属相</span>
            <span class="tag tab-no_bg">{{user.zodiac}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>星座</span>
            <span class="tag tab-no_bg">{{user.constellation}}</span>
          </span>
        </div>
      </div>
      <div class="other_info">
        <div class="border">
          <span class="tag-box">
            <span>身高</span>
            <span class="tag tab-no_bg">{{user.height}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>职业</span>
            <span class="tag tab-no_bg">{{user.professional}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>籍贯</span>
            <span class="tag tab-no_bg">{{user.birthplace}}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="panel" @click="activity">
      <wx-cell arrow text="Ta的活动"></wx-cell>
    </div>

    <div class="panel" @click="comment">
      <wx-cell arrow text="Ta的评价"></wx-cell>
    </div>

    <div class="panel" @click="ta_talmud">
      <wx-cell arrow text="Ta的塔木德"></wx-cell>
    </div>

  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'attention_info',
    components: {
      WxCell
    },
    data() {
      return {
        love: '',
        user: {
          age: 24,
          avatatUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqHGEX2S1Nk5wJCOSp2zI5kekooGEwM7KvUCx1jFMEyelWRobDtoWibsAVoVQBQvjfic2ru9jbcL5IQ/132',
          birthplace: '荆州',
          constellation: '处女',
          currentCity: '日本',
          height: 159.0,
          id: 4,
          nick: '好好好',
          phone: '18888888888',
          professional: '学生',
          selfEvaluation: '好人',
          sex: 0,
          status: 3,
          zodiac: '猫'
        },
        userInfo: {
          avatatUrl: '',
          assistantLevel: 0, //辅助人等级
          assistantNumber: 0, //辅助次数
          gold: 0, //收入
          hostLevel: 0, //主持人等级
          hostNumber: 0, //主持次数
          integral: 0, //积分
          joinFreeNumber: 0, //免费参加次数
          joinNumber: 0, //参加活动次数
          member: 0, //会员类型 0非会员 1普通会员 2超级会员
          nick: '', //昵称
          sex: 0, //性别
          status: 0, //婚姻
          talmudLevel: 0, //塔木德等级
          talmudNumber: 0, //塔木德次数
          specialContribution: 0, //特殊贡献奖
          suggest: 0, //建议奖
          reviewNumber: 0 //评价次数
        }
      }
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      async init() {
        //获取用户信息
        this.$app.api.user.userData({
          userId: this.$mp.query.id
        }).then(res => {
          console.log(res)
          if (!res.data) {
            wx.showToast({title: '未知错误', icon: 'none'})
          } else if (res.data.user) {
            this.user = JSON.parse(res.data.user)
          }
        })
        //获取用户活动信息
        this.$app.api.user.userCenter({
          userId: this.$mp.query.id
        }).then(res => {
          console.log(res)
          this.userInfo = JSON.parse(res.data.user)
        })

        if (this.user.status === 0) {
          this.love = '单身'
        } else if (this.user.status === 3) {
          this.love = '已婚'
        } else if (this.user.status === 2) {
          this.love = '恋爱'
        }
      },
      activity() {
        this.$app.nav.navigateTo('/pages/my/my_attention/activity/main', {id: this.user.id})
      },
      comment() {
        this.$app.nav.navigateTo('/pages/my/my_attention/comment/main', {id: this.user.id})
      },
      ta_talmud() {
        this.$app.nav.navigateTo('/pages/my/my_attention/talmud/main', {id: this.user.id})
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .attention_info {
    padding: 15px;
    display flex;
    justify-content space-between;
    align-items center;
    font-size 14px;

    .attention_info-img {
      width 80px;
      height 80px;
    }
  }

  .attention_info_box {
    display flex;
    width 0;
    flex 1;
    color: $gray-dark
    text-align center;

    .info-name {
      color: $text-color;
    }

    .info-Marriage {
      margin 0 10px;
    }

    .info-Marriage_sex {
      display inline-block;
    }
  }

  .other_info {
    display flex;
    justify-content space-around;
    font-size: 16px;
    color: #999999;

    div {
      width 100%;
      height 100%;
      text-align center;
      line-height 40px;
    }
  }

  .attention_level {

    ._span:last-child {
      color: #009DDA;
    }
  }

</style>
