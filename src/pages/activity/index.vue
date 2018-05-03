<template>
  <main>
    <div class="activity_top">
      <div class="activity_search"><input type="text"></div>
      <div class="activity_btn">筛选</div>
    </div>

    <div class="activity_nav">
      <div class="btn btn_size-small btn_color-DodgerBlue" @click="popup">优惠规则</div>
      <div class="btn btn_size-small btn_color-DodgerBlue">活动介绍</div>
      <div class="btn btn_size-small btn_color-DodgerBlue">往期活动</div>
    </div>

    <div class="container">
      <div class="activity_list">
        <div class="activity_list_info">
          <div>2018-8-18 9:00</div>
          <div>深圳高新园</div>
        </div>
        <div>深圳活动汇深圳活动汇深活动汇</div>
      </div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div class="popup-content">
          <div class="popup-content-desc">
            <div>被邀第一次参加活动可享8折优惠</div>
            <div>会员邀请新成员参加后可获分享折扣红包</div>
          </div>
          <div class="activity_rule_box">
            <div class="activity_rule">
              <div>会员星级</div>
              <div>参与折扣</div>
              <div>推荐异性</div>
              <div>推荐异性</div>
              <div>推荐更多</div>
            </div>
            <div class="activity_rule">
              <div>I</div>
              <div>9</div>
              <div>4</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="activity_rule">
              <div>II</div>
              <div>7</div>
              <div>3</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="activity_rule">
              <div>III</div>
              <div>5</div>
              <div>2</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="activity_rule">
              <div>IV</div>
              <div>3</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="activity_rule">
              <div>V</div>
              <div>1</div>
              <div>2</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
          <div class="popup-content-desc">
            <div>一星会员9折参与</div>
            <div>推荐新成员异性参加活动后返活动价格的4折</div>
            <div>推荐同性新成员加活动后返活动价格的1折</div>
            <div>再多荐新成员参加活动后无论同性异性皆返活动价的1折</div>
          </div>
        </div>
      </div>
      <div class="popup-curtain" @click="popup">
        <!--幕布-->
      </div>
    </div>
    <!--弹窗-->

  </main>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        isPopup: false
      }
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

  /* 弹窗 */
  .popup {
    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: absolute;
      top: 10%;
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

  .activity_top {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 15px;

    .activity_search {
      flex 1;
      border: 1px solid #999;
    }
    .activity_btn {
      margin-left 15px;
      font-size 14px;
    }
  }

  .activity_nav {
    display flex;
    justify-content space-between;
    align-items center;
    padding: 0 15px;
    font-size 14px;
    margin-bottom 15px;
  }

  .activity_list {
    padding: 15px;
    background-color #dae4da;
    border-radius 10px;
    font-size 16px;

    .activity_list_info {
      display flex;
      color: #999;
    }
  }

  .popup-content {
    font-size 14px;
  }

  .activity_rule_box {
    margin 0 auto;
    border-left: 1px solid black;
    border-top: 1px solid black;
  }

  .activity_rule {
    display flex;
    justify-content space-between;
    align-items center;
    text-align center;

    ._div {
      width 100%;
      height 100%;
      padding: 10px;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
    }
  }

  .popup-content-desc {
    color: #996600;
    margin 10px 0;
  }
</style>
