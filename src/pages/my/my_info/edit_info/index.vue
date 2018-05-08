<template>
  <main>
    <form @submit="formSubmit">
      <div class="info-title">必填</div>
      <div class="info-required border-cell_line">
        <div class="field border-line">
          <div class="field_left">手机号：</div>
          <div class="field_right">
            <input name="phone" v-model.lazy="userInfo.phone" type="number">
          </div>
        </div>
        <div class="field border-line">
          <div class="field_left">昵称：</div>
          <div class="field_right">
            <input name="nick" v-model.lazy="userInfo.nick" type="text" placeholder="昵称不能重复">
          </div>
        </div>
        <div class="info-table border-line">
          <div class="field">
            <div class="field_left">性别：</div>
            <div class="field_right">
              <picker name="sex" @change="sexChange" :value="userInfo.sex" :range="sexBox">
                {{sexBox[userInfo.sex]}}
              </picker>
            </div>
          </div>
          <div class="field">
            <div class="field_left">常住城市：</div>
            <div class="field_right">
              <input name="currentCity" v-model.lazy="userInfo.currentCity" type="text">
            </div>
          </div>
        </div>
        <div class="field border-line">
          <div class="field_left">关系状态：</div>
          <div class="field_right">
            <radio-group name="status" class="info-table" @change="radioChange">
              <label>
                <radio :value="0" :checked="userInfo.status==0"/>
                <span>单身</span>
              </label>
              <label>
                <radio :value="3" :checked="userInfo.status==3"/>
                <span>已婚</span>
              </label>
              <label>
                <radio :value="2" :checked="userInfo.status==2"/>
                <span>恋爱</span>
              </label>
            </radio-group>
          </div>
        </div>
        <div class="field border-line">
          <div class="field_left">自评：</div>
          <div class="field_right">
            <textarea name="selfEvaluation" v-model.lazy="userInfo.selfEvaluation" maxlength="1000"
                      placeholder="请简洁客观，言之有物"></textarea>
          </div>
        </div>
      </div>
      <div class="info-title">选填</div>
      <div class="info-other">
        <div class="border">
          <span>年龄</span>
          <span>
          <input name="age" v-model.lazy="userInfo.age" type="number" placeholder=" ">
        </span>
        </div>
        <div class="border">
          <span>属相</span>
          <span>
          <input name="zodiac" v-model.lazy="userInfo.zodiac" type="text" placeholder=" ">
        </span>
        </div>
        <div class="border">
          <span>星座</span>
          <span>
          <input name="constellation" v-model.lazy="userInfo.constellation" type="text" placeholder=" ">
        </span>
        </div>
      </div>
      <div class="info-other">
        <div class="border">
          <span>身高</span>
          <span>
          <input name="height" v-model.lazy="userInfo.height" type="number" placeholder=" ">
        </span>
        </div>
        <div class="border">
          <span>职业</span>
          <span>
          <input name="professional" v-model.lazy="userInfo.professional" type="text" placeholder=" ">
        </span>
        </div>
        <div class="border">
          <span>出生地</span>
          <span>
          <input name="birthplace" v-model.lazy="userInfo.birthplace" type="text" placeholder=" ">
        </span>
        </div>
      </div>
      <button class="btn-box btn btn_color-primary" formType="submit">提交</button>
    </form>
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
        },
        sexBox: ['未知', '男', '女']
      }
    },
    beforeMount () {
      this.$app.api.user.userData({
        userId: this.$app.storageStore.userStore.getters.getUserId
      }).then(res => {
        if (res.state) {
          wx.showToast({title: '未知错误', icon: 'none'})
        } else if (res.data.user) {
          this.userInfo = JSON.parse(res.data.user)
        }
      })
    },
    methods: {
      sexChange (e) {
        //改变选中的性别
        this.userInfo.sex = e.target.value
      },
      radioChange (e) {
        //改变选中的婚姻
        this.userInfo.status = e.target.value
      },
      async formSubmit (e) {
        let data = e.mp.detail.value
        if (data.phone && data.nick && data.currentCity && data.selfEvaluation) {
          await this.$app.api.user.checkNick({
            nick: data.nick,
            status: 1, //status 0 第一次填写 1 多次填写
            userId: this.$app.storageStore.userStore.getters.getUserId
          }).then(res => {
            if (res.state) {
              wx.showToast({
                title: '未知错误!',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data) {
              this.validation = true
            } else {
              wx.showToast({
                title: '昵称已存在',
                icon: 'none',
                duration: 2000
              })
              this.validation = false
            }
          })
        } else {
          this.validation = false
          wx.showToast({
            title: '必填信息为空',
            icon: 'none',
            duration: 2000
          })
        }

        if (this.validation) {
          this.$app.api.user.addUser({
            userId: this.$app.storageStore.userStore.getters.getUserId, //用户id
            phone: data.phone, //手机
            nick: data.nick, //昵称
            sex: data.sex, //性别
            currentCity: data.currentCity, //常驻城市
            status: data.status, //婚姻状态
            selfEvaluation: data.selfEvaluation, //自评
            age: data.age, //年龄
            height: data.height, //身高
            zodiac: data.zodiac, //属相
            professional: data.professional, //职业
            constellation: data.constellation, //星座
            birthplace: data.birthplace //出生地
          }).then(res => {
            if (res.state) {
              wx.showToast({
                title: '未知错误!',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data) {
              this.$app.storageStore.userStore.dispatch('userStatus').then(res => {
                wx.navigateBack()
                wx.showToast({title: '资料修改成功!', icon: 'success'})
              })
            }
          })
        }
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
