<template>
  <main>
    <div class="attention_top panel panel-no_top">
      <div>关注人</div>
      <div>最近活动</div>
      <div>备注</div>
    </div>

    <div class="slide_cell border-bottom_line" v-for="(item,index) in list" :key="index">
      <div class="slide_box"
           :style="item.style"
           :data-index="index"
           @touchstart="touchS"
           @touchmove="touchM"
           @touchend="touchE">
        <div class="attention_info" @click="attention_info(item.attentionUserId)">
          <div class="info-name">{{item.nickName}}</div>
          <div class="info-time">{{item.time}}</div>
          <div class="info-desc">{{item.remark?item.remark:''}}</div>
        </div>
      </div>
      <!--这里是滑动后显示的按钮----start-->
      <div class="slide_btn">
        <div class="del" @click="del(index,item.attentionUserId)">删除</div>
      </div>
      <!--这里是滑动后显示的按钮----end-->
    </div>

    <!--<div class="more">-->
      <!--<div class="btn btn_size-small btn_color-DodgerBlue" @click="popup">关注更多</div>-->
    <!--</div>-->

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>
          <radio-group class="attention_more" @change="popupChange">
            <label class="attention-1">
              <radio :value="1"/>
              <span>￥50</span>
              <span class="a-more">更多关注50人/年</span>
            </label>
            <label class="attention-2">
              <radio :value="2"/>
              <span>￥100</span>
              <span class="a-more">更多关注200人/年</span>
            </label>
          </radio-group>
          <div class="attention_more-btn border-top">
            <div @click="closePopup">取消</div>
            <div class="attention_more-btn-2" @click="popup_1">确定</div>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->


    <!--弹窗-->
    <div class="popup_1" v-if="isPopup_1">
      <div class="popup-box">
        <div class="money-box">
          <div class="money-1">支付会费{{attention_money}}元</div>
          <div class="money-2">会费余额{{attention_balance}}元</div>
          <div class="money-3 border-top" @click='attention_pay'>确定</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  export default {
    name: 'my_attention',
    data() {
      return {
        attention_balance: 0,//余额
        attention_money: 0,//选择的购买金额
        attention_num: 0, //购买关注的选项
        isPopup: false, //是否显示弹窗
        isPopup_1: false, //是否显示弹窗
        list: [{
          style: '',
          id: 0,
          nickName: '',
          remark: '',
          sex: 1,
          time: '',
          attentionUserId: 0
        }],
        startX: 0, // 记录触摸起始位置的X坐标
        btnWidth: 160, // 右侧按钮区域的宽度,单位rpx
        style: '', //滑动后样式
        index: 0 //滑动项的下标
      }
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      async init() {
        this.$app.api.user.myFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          if (res.data) {
            this.list = JSON.parse(res.data.focus)
          } else {
            this.list = []
          }
        })
      },
      del(index, id) {
        this.$app.api.user.addFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          attentionUserId: id,
          status: false
        }).then(res => {
          res.data ? this.list.splice(index, 1) : ``
        })
      },
      attention_info(id) {
        this.$app.nav.navigateTo('/pages/my/my_attention/attention_info/main', {id})
      },
      attention_pay() {
        this.attention_balance > this.attention_money
          ? wx.showToast({title: '购买成功!', icon: 'none'})
          : wx.showToast({title: '余额不足,请充值!', icon: 'none'})
        this.closePopup()
      },
      closePopup() {
        this.isPopup = false
        this.isPopup_1 = false
        this.attention_num = 0
      },
      popup() {
        this.isPopup = true
      },
      popup_1() {
        if (this.attention_num === 0) {
          return wx.showToast({title: '请选择金额!', icon: 'none'})
        }
        this.attention_num === '1' ? this.attention_money = 50 : this.attention_money = 100
        this.closePopup()
        this.isPopup_1 = true
      },
      popupChange(e) {
        this.attention_num = e.target.value
      },
      //滑动事件
      touchS(e) {
        // 当手指触摸屏幕时触发
        if (e.touches.length === 1) {
          //重置展开index的数据
          this.list[this.index].style = ''
          // 记录触摸起始位置的X坐标
          this.startX = e.clientX
        }
      },
      touchM(e) {
        // 当手指在屏幕上滑动时连续地触发
        if (e.touches.length === 1) {
          //获取手指触摸的是哪一个item
          this.index = e.currentTarget.dataset.index
          //记录触摸点位置的X坐标
          let moveX = e.clientX
          //计算手指起始点的X坐标与当前触摸点的X坐标的差值
          let disX = this.startX - moveX
          //delWidth 为右侧按钮区域的宽度
          let btnWidth = this.btnWidth
          //移动距离大于0，文本层left值等于手指移动距离
          disX > 0 ? this.style = `left:-${disX}rpx` : this.style = ''
          //控制手指移动距离最大值为删除按钮的宽度
          disX >= btnWidth ? this.style = `left:-${btnWidth}rpx` : ''
          //将拼接好的样式设置到当前item中
          this.list[this.index].style = this.style
        }
      },
      touchE(e) {
        // 当手指从屏幕上移开时触发
        if (e.mp.touches.length === 0) {
          //获取手指触摸的是哪一个item
          this.index = e.currentTarget.dataset.index
          //手指移动结束后触摸点位置的X坐标
          let endX = e.mp.changedTouches[0].clientX
          let disX = this.startX - endX
          //触摸开始与结束，手指移动的距离
          let btnWidth = this.btnWidth
          disX > btnWidth / 4 ? this.style = `left:-${btnWidth}rpx` : this.style = ''
          //将拼接好的样式设置到当前item中
          this.list[this.index].style = this.style
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl";

  page {
    background-color $background-color
  }

  .slide_cell {
    position: relative;
    box-sizing border-box;

    .slide_box {
      transition: all .5s;
      box-sizing border-box;
      position: relative;
      left 0;
      width 100%;
      height 100%;
      z-index 1
    }
    .slide_btn {
      box-sizing border-box;
      position absolute;
      top: 0;
      right 0;
      height 100%;
      z-index 0;
      display flex;

      .invite {
        background-color: $orange
        display flex;
        align-items center;
        justify-content center;
        width 80px;
        height 100%;
        color white;
        font-size 16px;
      }

      .del {
        background-color red;
        display flex;
        align-items center;
        justify-content center;
        width 80px;
        height 100%;
        color white;
        font-size 16px;
      }
    }
  }

  .attention_top {
    padding: 15px;
    display flex;
    justify-content space-between;
    align-items center
    font-size 16px;
  }

  .attention_info {
    padding: 15px;
    display flex;
    justify-content space-between;
    align-items center;
    font-size 16px;
    background-color white;
  }

  .more {
    position fixed;
    bottom: 15px;
    right 15px;
  }

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;       background-color white;       position: fixed;
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

  .attention_more {
    font-size 16px;

    .attention-1 {
      display block;
      margin 10px;
    }

    .attention-2 {
      display block;
      margin 10px;
    }

    .a-more {
      font-size 14px;
      color: #999;
      margin-left 10px;
    }
  }

  .attention_more-btn {
    margin-left -15px;
    margin-right -15px;
    display flex;
    justify-content space-between;
    align-items center;
    margin-top 10px;
    margin-bottom -15px;

    ._div {
      font: 1;
      width 100%;
      line-height 50px;
      text-align center;
    }
    ._div:last-child {
      border-left 1px solid #eee;
    }

    .attention_more-btn-2 {
      color: #1388BA;
    }
  }

  /* 弹窗 */
  .popup_1 {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;       background-color white;       position: fixed;
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

  .money-box {

    .money-1 {
      text-align center;
      padding: 15px 0;
    }
    .money-2 {
      text-align right;
      padding: 15px 0;
      font-size 14px;
      color: #999;
    }
    .money-3 {
      text-align center;
      margin-left -15px;
      margin-right -15px;
      margin-bottom -15px;
      line-height 50px;
      font-size 16px;
      color: #1388BA;
    }
  }
</style>
