<template>
  <main>
    <div class="panel panel-no_top">
      <wx-cell :text="userInfo.nick" :desc="love" :info="userInfo.currentCity"></wx-cell>
      <wx-cell text="手机" :desc="userInfo.phone"></wx-cell>
      <div class="my_info_desc">{{userInfo.selfEvaluation}}</div>
    </div>

    <div class="panel">
      <div class="other_info">
        <div class="border">
          <span class="tag-box">
            <span>年龄</span>
            <span class="tag tab-no_bg">{{userInfo.age}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>属相</span>
            <span class="tag tab-no_bg">{{userInfo.zodiac}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>星座</span>
            <span class="tag tab-no_bg">{{userInfo.constellation}}</span>
          </span>
        </div>
      </div>
      <div class="other_info">
        <div class="border">
          <span class="tag-box">
            <span>身高</span>
            <span class="tag tab-no_bg">{{userInfo.height}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>职业</span>
            <span class="tag tab-no_bg">{{userInfo.professional}}</span>
          </span>
        </div>
        <div class="border">
          <span class="tag-box">
            <span>籍贯</span>
            <span class="tag tab-no_bg">{{userInfo.birthplace}}</span>
          </span>
        </div>
      </div>
    </div>

    <!--<div class="panel">-->
    <!--<wx-cell text="其他" text-color="#999"></wx-cell>-->
    <!--</div>-->

    <div class="my_info_edit btn-box">
      <div class="btn" @click="navigateTo('/pages/my/my_info/edit_info/main')">修改</div>
    </div>
  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'my_info',
    components: {
      WxCell
    },
    data () {
      return {
        love: '',
        userInfo: {
          phone: '', //手机
          nick: '', //昵称
          sex: 0, //性别
          currentCity: '', //常驻城市
          status: 0, //婚姻状态
          selfEvaluation: '', //自评
          age: 0, //年龄
          height: '', //身高
          zodiac: '', //属相
          professional: '', //职业
          constellation: '', //星座
          birthplace: '' //出生地
        }
      }
    },
    async onShow () {
      await this.$app.api.user.userData({
        userId: this.$app.storageStore.userStore.getters.getUserId
      }).then(res => {
        if (res.state) {
          wx.showToast({title: '未知错误', icon: 'none'})
        } else if (res.data.user) {
          this.userInfo = JSON.parse(res.data.user)
        }
      })
      if (this.userInfo.status === 0) {
        this.love = '单身'
      } else if (this.userInfo.status === 3) {
        this.love = '已婚'
      } else if (this.userInfo.status === 2) {
        this.love = '恋爱'
      }
    },
    methods: {
      navigateTo (nav) {
        this.$app.nav.navigateTo(nav)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl";

  page {
    background-color $background-color;
  }

  .tab-no_bg {
    left 5px;
  }

  .my_info_edit {
    text-align right;
  }

  .my_info_desc {
    padding: 15px;
    font-size 14px;
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
</style>

