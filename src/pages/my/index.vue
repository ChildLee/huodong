<template>
  <main>
    <div class="my-info">
      <div class="my-rule" @click="popup">星级规则</div>
    </div>

    <div class="my-price">
      <div>
        <span>收入￥300</span>
        <span class="my-price-btn">转账</span>
      </div>
      <div>
        <span>会费￥500</span>
        <span class="my-price-btn">充值</span>
      </div>
    </div>

    <div class="menu_list">
      <div>
        <span class="tag-box">
          <span>我的活动</span>
          <span class="tag">11</span>
        </span>
      </div>
      <div>我的评价</div>
      <div>我的关注</div>
      <div>我的邀约</div>
      <div>我的爱情</div>
      <div>我组织的</div>
      <div>平台客服</div>
      <div>我的塔木德</div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>
          <!---->
          <div class="rule_top">
            <div>每期完成评价要求</div>
            <div>&同时达到累计参与次数</div>
          </div>
          <!---->
          <div class="upgrade">
            <div class="upgrade-box upgrade-color">
              <div>晋星</div>
              <div>参与次数</div>
            </div>
            <div class="upgrade-box">
              <div>I---II</div>
              <div>31</div>
            </div>
            <div class="upgrade-box">
              <div>II---III</div>
              <div>101</div>
            </div>
            <div class="upgrade-box">
              <div>II---III</div>
              <div>101</div>
            </div>
            <div class="upgrade-box">
              <div>III---IV</div>
              <div>301</div>
            </div>
            <div class="upgrade-box">
              <div>IV-V</div>
              <div>501</div>
            </div>
          </div>
          <!---->
          <div class="upgrade">
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
              <div>35</div>
              <div>85</div>
              <div>135</div>
              <div>185</div>
            </div>
            <div class="upgrade-box">
              <div class="upgrade-color">辅助人</div>
              <div>0</div>
              <div>35</div>
              <div>85</div>
              <div>135</div>
              <div>185</div>
            </div>
            <div class="upgrade-box">
              <div class="upgrade-color">塔木德</div>
              <div>无</div>
              <div>无</div>
              <div>20</div>
              <div>60</div>
              <div>100</div>
            </div>
          </div>
          <!---->
          <div class="rule_bottom">
            <div>塔木德评级系数：</div>
            <div>回答次数、赞数、回答质量</div>
            <div>主持/辅助人评级系数：</div>
            <div> 主持/辅助次数、平均分、评价内容、塔木德、面谈</div>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="popup"><!--幕布--></div>
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
    data () {
      return {
        isPopup: false
      }
    },
    beforeMount () {
    },
    methods: {
      popup () {
        this.isPopup = !this.isPopup
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .my-price {
    display flex;
    justify-content space-between;
    padding: 10px 15px;
    background-color white;
    color: #006600;
    font-size 16px;

    .my-price-btn {
      margin-left 10px;
      color: #6D5B42;
    }
  }

  .menu_list {
    font-size 16px;
    display flex;
    flex-wrap: wrap;
    color: #6D5B42;
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
  }

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: absolute;
      top: 5%;
      left: 8%;
      width 85%;
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

  .rule_top {
    color: #996600;
    font-size 14px;
    text-align center;
  }

  .rule_bottom {
    color: #996600;
    font-size 14px;

    ._div:nth-child(even) {
      text-indent 4em;
    }
  }

  .upgrade {
    color: #006600;
    margin-top 10px;
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
</style>
