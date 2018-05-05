<template>
  <main>
    <div class="activity-title">
      深圳活动
    </div>

    <div class="organize_desc panel panel-no_border">
      <div class="title-mark"></div>
      <div>活动详情</div>
    </div>
    <div class="activity-info">
      <div>时间：2018-8-8 14:00-16：00</div>
      <div>地点：深圳高新园地铁站---TCL大厦1101室</div>
      <div>联系：15812345678</div>
      <div class="icon">费用：&#xe643;30&#xe665;40</div>
      <div>会员免费名额：10人</div>
      <div>活动内容：</div>
      <div class="activity-info-desc">
        <img src="http://placekitten.com/300/200" mode="widthFix">
      </div>
    </div>

    <div class="organize_desc panel panel-no_border">
      <div class="title-mark"></div>
      <div>活动人员</div>
    </div>

    <div class="activity_personnel icon">
      <div class="active_staff">
        <div></div>
        <div>男</div>
        <div>女</div>
      </div>
      <div class="active_staff">
        <div>主持人</div>
        <div>&#xe613;张三</div>
        <div></div>
      </div>
      <div class="active_staff">
        <div>辅助人</div>
        <div></div>
        <div>&#xe613;李四</div>
      </div>
      <div class="active_staff">
        <div>参与人</div>
        <div class="participate">
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
          <div>&#xe613;王五</div>
        </div>
        <div class="participate">
          <div>&#xe613;二丫</div>
          <div>&#xe613;二丫</div>
        </div>
      </div>
    </div>

    <div class="footer_line"></div>
    <div class="footer">
      <div>
        <span class="icon">&#xe607;</span>
        <span>收藏</span>
      </div>
      <button class="btn-share" open-type="share">
        <span class="icon">&#xe642;</span>
        <span>分享</span>
      </button>
      <div @click="navigateTo('/pages/activity/activity_info/activity_invite/main')">
        <span class="icon">&#xe7af;</span>
        <span>邀约</span>
      </div>
      <div>
        <span class="icon">&#xe60a;</span>
        <span>参加</span>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'activity_info',
    methods: {
      navigateTo (nav) {
        this.$app.nav.navigateTo(nav)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

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
        background-color DodgerBlue;
        color: white;
      }
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

    ._div {
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
