<template>
  <main>
    <div class="my-info panel panel-no_top">
      <div class="my-rule" @click="popup">星级规则</div>
      <div class="my-info-box" @click="navigateTo('/pages/my/my_info/main')">
        <img class="my-info-box-img" :src="!!userInfo.avatatUrl?userInfo.avatatUrl:'http://placekitten.com/100/100'">
        <div class="my-info-box-text">
          <div>
            <span>{{userInfo.nick}}</span>
          </div>
          <div class="my-info-box-text-sex">
            <span class="icon" v-if="userInfo.sex">&#xe665;</span>
            <span class="icon" v-else>&#xe643;</span>
          </div>
          <div class="my-info-box-text-marriage">{{love}}</div>
        </div>
      </div>
      <div class="button-box">
        <button class="button" open-type="getUserInfo" @getuserinfo="getUserInfo">更新信息</button>
      </div>
    </div>

    <div class="level-info panel">
      <div>
        <div>
          <span>会员：</span>
          <span v-if="userInfo.member===0"></span>
          <span v-if="userInfo.member===1">Ⅰ级</span>
          <span v-if="userInfo.member===2">Ⅱ级</span>
          <span v-if="userInfo.member===3">Ⅲ级</span>
          <span v-if="userInfo.member===4">Ⅳ级</span>
          <span v-if="userInfo.member===5">Ⅴ级</span>
          <span v-if="userInfo.member===6">Ⅵ级</span>
          <span v-if="userInfo.member===7">Ⅶ级</span>
          <span v-if="userInfo.member===8">Ⅷ级</span>
          <span v-if="userInfo.member===9">Ⅸ级</span>
          <span v-if="userInfo.member===10">Ⅹ级</span>
        </div>
        <div>
          <span>主持：</span>
          <span v-if="userInfo.hostLevel===0"></span>
          <span v-if="userInfo.hostLevel===1">初级</span>
          <span v-if="userInfo.hostLevel===2">优秀</span>
          <span v-if="userInfo.hostLevel===3">明星</span>
          <span v-if="userInfo.hostLevel===4">大咖</span>
          <span v-if="userInfo.hostLevel===5">阿神</span>
        </div>
        <div>
          <span>辅助：</span>
          <span v-if="userInfo.assistantLevel===0"></span>
          <span v-if="userInfo.assistantLevel===1">初级</span>
          <span v-if="userInfo.assistantLevel===2">优秀</span>
          <span v-if="userInfo.assistantLevel===3">明星</span>
          <span v-if="userInfo.assistantLevel===4">大咖</span>
          <span v-if="userInfo.assistantLevel===5">阿神</span>
        </div>
        <div>
          <span>塔木德：</span>
          <span v-if="userInfo.talmudLevel===0"></span>
          <span v-if="userInfo.talmudLevel===1">初级</span>
          <span v-if="userInfo.talmudLevel===2">优秀</span>
          <span v-if="userInfo.talmudLevel===3">明星</span>
          <span v-if="userInfo.talmudLevel===4">大咖</span>
          <span v-if="userInfo.talmudLevel===4">阿神</span>
        </div>
      </div>
      <div>
        <div>
          <span>参加次数：</span>
          <span>{{userInfo.joinNumber}}</span>
        </div>
        <div>
          <span>评价参与度：</span>
          <span>0</span>
        </div>
        <div>
          <span>评价平均分：</span>
          <span>0</span>
        </div>
        <div>
          <span>塔木德次数：</span>
          <span>{{userInfo.talmudNumber}}</span>
        </div>
      </div>
      <div>
        <div>
          <span>主持次数：</span>
          <span>{{userInfo.hostNumber}}</span>
        </div>
        <div>
          <span>辅助次数：</span>
          <span>{{userInfo.assistantNumber}}</span>
        </div>
        <div>
          <span>建议奖：</span>
          <span>0</span>
        </div>
        <div>
          <span>特殊贡献奖：</span>
          <span>0</span>
        </div>
      </div>
    </div>

    <div class="my-price panel">
      <div>
        <span class="c666">收入￥<span style="color: #1D9ED7;">{{userInfo.gold}}</span></span>
        <span style="width: 50%;background: #1D9ED7;"
              class="my-price-btn btn btn_size-small btn_color-DodgerBlue br5 of"
              @click="transfer">转账</span>
      </div>
      <div>
        <span class="c666">会费￥<span style="color: #1D9ED7;">{{userInfo.integral}}</span></span>
        <span style="width: 50%;background: #1D9ED7;"
              class="my-price-btn btn btn_size-small btn_color-DodgerBlue br5 of"
              @click="recharge">充值</span>
        <!--navigateTo('/pages/activity/pay/main')-->
      </div>
    </div>

    <div class="menu_list panel">
      <div @click="navigateTo('/pages/my/my_activity/main')">我的活动</div>
      <div @click="navigateTo('/pages/my/my_comment/main')">我的评价</div>
      <div @click="navigateTo('/pages/my/my_attention/main')">我的关注</div>
      <div @click="navigateTo('/pages/my/my_invite/main')">我的邀约</div>
      <div @click="navigateTo('/pages/my/my_love/main')">我的爱情</div>
      <div @click="navigateTo('/pages/my/my_organize/main')">我组织的</div>
      <div @click="navigateTo('/pages/my/service/main')">平台客服</div>
      <div @click="navigateTo('/pages/my/my_talmud/main')">我的塔木德</div>
    </div>

    <!--规则弹窗-->
    <div class="popup-1" v-if="isPopup">
      <div class="popup-box">
        <div>
          <!---->
          <!--<div class="rule_top">-->
          <!--<div>每期完成评价要求</div>-->
          <!--<div>&同时达到累计参与次数</div>-->
          <!--</div>-->
          <!---->
          <div class="upgrade-1">
            <div class="upgrade-box upgrade-color">
              <div>晋星</div>
              <div>参与次数</div>
            </div>
            <div class="upgrade-box">
              <div>I---II</div>
              <div>{{roles.userLV2}}</div>
            </div>
            <div class="upgrade-box">
              <div>II---III</div>
              <div>{{roles.userLV3}}</div>
            </div>
            <div class="upgrade-box">
              <div>III---IV</div>
              <div>{{roles.userLV4}}</div>
            </div>
            <div class="upgrade-box">
              <div>IV-V</div>
              <div>{{roles.userLV5}}</div>
            </div>
          </div>
          <!---->
          <div class="upgrade-2">
            <div class="upgrade-box upgrade-title upgrade-color">
              <div class="upgrade-color">等级次数折算</div>
              <div>初级</div>
              <div>优秀</div>
              <div>明星</div>
              <div>大咖</div>
              <div>阿神</div>
            </div>
            <div class="upgrade-box">
              <div class="upgrade-color">主持人</div>
              <div>0</div>
              <div>{{roles.hostLV1}}</div>
              <div>{{roles.hostLV2}}</div>
              <div>{{roles.hostLV3}}</div>
              <div>{{roles.hostLV4}}</div>
            </div>
            <div class="upgrade-box">
              <div class="upgrade-color">辅助人</div>
              <div>0</div>
              <div>{{roles.assistantLV1}}</div>
              <div>{{roles.assistantLV2}}</div>
              <div>{{roles.assistantLV3}}</div>
              <div>{{roles.assistantLV4}}</div>
            </div>
            <div class="upgrade-box">
              <div class="upgrade-color">塔木德</div>
              <div>无</div>
              <div>无</div>
              <div>{{roles.talmudLV1}}</div>
              <div>{{roles.talmudLV2}}</div>
              <div>{{roles.talmudLV3}}</div>
            </div>
          </div>
          <!---->
          <div class="rule_bottom">
            <div>塔木德：回答次数、赞数、回答质量</div>
            <div></div>
            <div>主持/辅助人：次数、平均分、评价内容、塔木德、面谈</div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="popup"><!--幕布--></div>
    </div>
    <!--规则弹窗-->

    <!--转账弹窗-->
    <div class="popup-2" v-if="isTransfer">
      <div class="popup-box" style="top:35%;">
        <div>
          <radio-group class="transfer-box" @change="popup_sel">
            <label class="transfer">
              <radio :value="0"/>
              <span>转会费</span>
              <span>
                <input v-model="transfer_money" class="transfer-input" type="number" placeholder="请输入金额">
              </span>
            </label>
            <label class="transfer">
              <radio :value="1"/>
              <span>提现</span>
              <span>
                <input v-model="withdraw" class="transfer-input" type="number" placeholder="每月25日申请">
              </span>
            </label>
          </radio-group>
          <div class="transfer-btn-box border-top">
            <span class="transfer-btn btn btn_size-small" @click="transfer_btn">确定</span>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="transfer"><!--幕布--></div>
    </div>
    <!--转账弹窗-->

    <!--充值-->
    <div class="popup-3" v-if="isPopup2">
      <div class="popup-box">
        <div>
          <div class="transfer">
            <span>充值</span>
            <span>
                <input v-model="recharge1" class="transfer-input1" type="number" placeholder="请输入金额">
              </span>
          </div>
          <div class="transfer-btn-box border-top">
            <span class="transfer-btn btn btn_size-small" @click="btn_recharge">确定</span>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'my',
    components: {
      WxCell
    },
    data() {
      return {
        roles: {
          assistantLV1: 35,
          assistantLV2: 85,
          assistantLV3: 135,
          assistantLV4: 185,
          hostLV1: 35,
          hostLV2: 85,
          hostLV3: 135,
          hostLV4: 185,
          talmudLV1: 20,
          talmudLV2: 60,
          talmudLV3: 180,
          userLV2: 31,
          userLV3: 101,
          userLV4: 301,
          userLV5: 501
        },
        love: '',
        transfer_money: '', //转账金额
        withdraw: '', //提现金额
        transfer_sel: 0, //选择转账还是提现
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
        },
        isPopup: false,
        isPopup2: false,
        isTransfer: false,
        recharge1: ''
      }
    },
    watch: {
      isTransfer(e) {
        if (e) {
          this.transfer_money = ''
          this.withdraw = ''
          this.transfer_sel = 0
        }
      }
    },
    async onShow() {
      //判断资料填了没有
      this.$app.storageStore.userStore.getters.getType ? `` : wx.redirectTo({url: '/pages/my/my_info/add_info/main'})
      //初始化个人中心
      await this.$app.api.user.userCenter({
        userId: this.$app.storageStore.userStore.getters.getUserId
      }).then(res => {
        this.userInfo = JSON.parse(res.data.user)
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
      getUserInfo(e) {
        let img = JSON.parse(e.target.rawData).avatarUrl
        this.$app.api.user.avatatUrl({
          url: img,
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          wx.showToast({title: '更新成功!', icon: 'none'})
          this.userInfo.avatatUrl = img
        })
      },
      closePopup() {
        this.isPopup2 = false
      },
      popup() {
        this.$app.api.user.LVRule().then(res => {
          this.roles = res.data
        })

        this.isPopup = !this.isPopup
      },
      transfer() {
        this.isTransfer = !this.isTransfer
      },
      navigateTo(nav) {
        this.$app.nav.navigateTo(nav)
      },
      popup_sel(e) {
        this.transfer_sel = e.target.value
      },
      btn_recharge() {
        let reg = /^[\d]+$/
        if (!reg.test(this.recharge1)) {
          return wx.showToast({title: '请填写数字!', icon: 'none'})
        }
        this.$app.api.money.recharge({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          money: this.recharge1
        }).then(res => {
          if (res.data) {
            // wx.showToast({title: '', icon: 'none'})
            this.closePopup()
            this.$app.nav.navigateTo('/pages/activity/pay/main')
          }
        })
      },
      recharge() {
        this.isPopup2 = true
      },
      transfer_btn() {
        let that = this
        if (this.transfer_sel === '0') { //转会费
          let reg = /^[\d]+$/
          if (!reg.test(that.transfer_money)) {
            return wx.showToast({title: '请填写数字!', icon: 'none'})
          }
          if (!this.transfer_money) return wx.showToast({title: '请填写金额!', icon: 'none'})
          this.$app.api.money.withdraw({
            userId: this.$app.storageStore.userStore.getters.getUserId,
            money: this.transfer_money,
            mode: this.transfer_sel
          }).then(res => {
            this.isTransfer = false
            wx.showToast({title: '转会费成功!', icon: 'none'})
          }).catch(err => {
            wx.showToast({title: '未知错误!', icon: 'none'})
          })
        } else if (this.transfer_sel === '1') { //提现
          let myDate = new Date()
          console.log(myDate.getDate())
          if (!myDate.getDate() >= 25) {
            return wx.showToast({title: '每月25日申请!', icon: 'none'})
          }
          let reg = /^[\d]+$/
          if (!reg.test(that.withdraw)) {
            return wx.showToast({title: '请填写数字!', icon: 'none'})
          }
          if (!this.withdraw) return wx.showToast({title: '请填写金额!', icon: 'none'})
          this.$app.api.money.withdraw({
            userId: this.$app.storageStore.userStore.getters.getUserId,
            money: this.withdraw,
            mode: this.transfer_sel
          }).then(res => {
            this.isTransfer = false
            wx.showToast({title: '提现成功!', icon: 'none'})
          }).catch(err => {
            wx.showToast({title: '未知错误!', icon: 'none'})
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .button-box {
    border: 1px solid #ccc;
    overflow hidden;
    border-radius 20px;
    margin 0 auto;
    margin-top 10px;
    width 60px;
  }

  .button {
    background none;
    font-size 12px;
    padding: 0;
    margin 0;
    line-height 1.5;
    color: #999;

    &::after {
      border: none;
    }
  }

  .level-info {
    display flex;
    font-size 14px;
    padding: 15px;
    color: #666;
    justify-content space-between;

    ._span:last-child {
      color: #009DDA;
    }
  }

  .my-price {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 10px 15px;
    background-color white;
    color: #006600;
    font-size 16px;
    text-align center

    > ._div {
      display flex;
      justify-content space-between;
      align-items center;
    }
    .my-price-btn {
      margin-left 10px;
      padding: 0 10px !important
    }
  }

  .menu_list {
    font-size 16px;
    display flex;
    flex-wrap: wrap;
    color: #666;
    background-color white;

    ._div {
      width 50%;
      box-sizing border-box;
      position: relative;
      text-align center;
      padding: 15px 0;

      &::after {
        border_line()
        border-width 1px;
      }
    }
  }

  .my-info {
    position: relativee;
    padding: 15px;

    .my-rule {
      color: #1D9ED7;
      font-size 14px;
      position absolute;
      top: 5px;
      right 5px;
    }

    .my-info-box {
      font-size 16px;
      text-align center;

      .my-info-box-img {
        width 100px;
        height 100px;
      }

      .my-info-box-text {
        display flex;
        justify-content center;
        align-items center;
        font-size 18px;
        font-weight bold;

        .my-info-box-text-sex {
          margin 0 10px;
          color: #999
          font-size 14px;
        }

        .my-info-box-text-marriage {
          color: #999;
          font-size 14px;
        }
      }
    }
  }

  /* 弹窗 */
  .popup-1 {
    .popup-box {
      padding: 15px;
      position: absolute;
      border-radius 10px;
      box-sizing border-box;
      background-color white;
      top: 10%;
      left: 7%;
      width 86%;
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

  /* 转账弹窗 */
  .popup-2 {
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

  .rule_top {
    color: #6D5B42;
    font-size 14px;
    text-align center;
  }

  .rule_bottom {
    color: #6D5B42;
    font-size 14px;

    ._div:nth-child(even) {
      /*text-indent 2em;*/
    }
  }

  .upgrade-1 {
    margin 0 auto;
    width 200px;
    color: #009DDA;
    margin-top 10px;
    border: 0 solid #999;
    border-top-width 1px;
    border-left-width 1px;
  }

  .upgrade-2 {
    color: #009DDA;
    margin: 20px 0;
    border: 0 solid #999;
    border-top-width 1px;
    border-left-width 1px;
  }

  .upgrade-title ._div {
    height 40px;
    display flex;
    align-items center;
    justify-content center;

  }

  .upgrade-color {
    color: #6D5B42;
  }

  .upgrade-box {
    display flex;
    align-items center;
    box-sizing border-box;

    ._div {
      width 100%;
      text-align center;
      font-size 14px;
      padding: 5px 0;
      border: 0 solid #999;
      border-right-width 1px;
      border-bottom-width 1px;
    }
  }

  .transfer-box {
    font-size 16px;
  }

  .transfer {
    margin 10px 0;
    display flex;
    align-items center;

    ._span {
      flex none;
    }

    .transfer-input {
      width 150px;
      margin-left 10px;
      border-bottom 1px solid #ccc;
      font-size 14px;
    }

    .transfer-input1 {
      width 150px;
      margin-left 10px;
      font-size 14px;
    }
  }

  .transfer-btn-box {
    text-align center;

    .transfer-btn {
      margin-top 10px;
    }
  }

  /* 充值弹窗 */
  .popup-3 {
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
</style>
