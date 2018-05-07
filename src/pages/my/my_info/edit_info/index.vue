<template>
  <main>
    <div class="info-title">必填</div>
    <div class="info-required border-cell_line">
      <div class="field border-line">
        <div class="field_left">手机号：</div>
        <div class="field_right">
          <input type="number">
        </div>
      </div>
      <div class="field border-line">
        <div class="field_left">昵称：</div>
        <div class="field_right">
          <input type="text" placeholder="昵称不能重复">
        </div>
      </div>
      <div class="info-table border-line">
        <div class="field">
          <div class="field_left">性别：</div>
          <div class="field_right">
            <picker @change="sexChange" :value="sexIndex" :range="sex">
              {{sex[sexIndex]}}
            </picker>
          </div>
        </div>
        <div class="field">
          <div class="field_left">常住城市：</div>
          <div class="field_right">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="field border-line">
        <div class="field_left">关系状态：</div>
        <div class="field_right">
          <radio-group class="info-table" @change="radioChange">
            <label>
              <radio :value="0" :checked="true"/>
              <span>单身</span>
            </label>
            <label>
              <radio :value="1"/>
              <span>已婚</span>
            </label>
            <label>
              <radio :value="2"/>
              <span>恋爱</span>
            </label>
          </radio-group>
        </div>
      </div>
      <div class="field border-line">
        <div class="field_left">自评：</div>
        <div class="field_right">
          <textarea maxlength="-1" placeholder="请简洁客观，言之有物"></textarea>
        </div>
      </div>
    </div>
    <div class="info-title">选填</div>
    <div class="info-other">
      <div class="border">
        <span>年龄</span>
        <span>
          <input type="number" placeholder=" ">
        </span>
      </div>
      <div class="border">
        <span>属相</span>
        <span>
          <input type="text" placeholder=" ">
        </span>
      </div>
      <div class="border">
        <span>星座</span>
        <span>
          <input type="text" placeholder=" ">
        </span>
      </div>
    </div>
    <div class="info-other">
      <div class="border">
        <span>身高</span>
        <span>
          <input type="number" placeholder=" ">
        </span>
      </div>
      <div class="border">
        <span>职业</span>
        <span>
          <input type="text" placeholder=" ">
        </span>
      </div>
      <div class="border">
        <span>出生地</span>
        <span>
          <input type="text" placeholder=" ">
        </span>
      </div>
    </div>
    <div class="btn-box btn btn_color-primary">提交</div>
  </main>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        userInfo: {
          phone: '', //手机
          nick: '', //昵称
          sex: '', //性别
          currentCity: '', //常驻城市
          status: '', //婚姻状态
          selfEvaluation: '', //自评
          age: '', //年龄
          height: '', //身高
          zodiac: '', //属相
          professional: '', //职业
          constellation: '', //星座
          birthplace: '' //出生地
        },
        sexIndex: 0,
        sex: ['男', '女', '中性']
      }
    },
    beforeMount () {
      this.$app.api.user.userData({
        userId: this.$app.storageStore.userStore.getters.getUserId
      }).then(res => {
        if (res.state) {
          wx.showToast({title: '未知错误', icon: 'none'})
        } else if (res.data.user) {
          console.log(JSON.parse(res.data.user))
        }
      })
    },
    methods: {
      sexChange (e) {
        this.sexIndex = e.target.value
      },
      radioChange (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color #f2f2f2;
  }

  .info-title {
    padding: 5px 15px;
    font-size 16px;
    color: #6D5B42;
    font-weight bold;
  }

  .info-required {
    background-color white;
  }

  .info-table {
    display: flex;
    align-items: center;
    justify-content: space-around

    ._span {
      color: #009900;
    }
  }

  .field_left {
    color: #009900;
  }

  .info-other {
    display flex;
    background-color white;
    font-size 16px;
    text-align center;
    color: #009900;

    > ._div {
      padding: 5px 15px;
      flex 1;

      input {
        color: #000
      }
    }
  }
</style>
