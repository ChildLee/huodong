<template>
  <main>
    <div class="panel panel-no_top">
      <div class="fold_panel"
           :class="fold_selected?'fold_panel-arrow_bottom':'fold_panel-arrow_top'"
           @click="fold">
        <span class="fold_title">等级与充值规则</span>
      </div>
      <div class="fold_panel-box" v-if="fold_selected">
        <div>会员：</div>
        <div>晋星（五星）规则：每期完成评价要求
          （参与次数=参与活动次数+推荐折算次数+塔木德折算次数+主持/辅助人等级折算次数），
        </div>
        <div>同时：一星晋二星：参与次数达31次以上；</div>
        <div>二星晋三星：参与次数101次</div>
        <div>三星晋四星：参与次数301次；</div>
        <div>四星晋五星：参与次数501次；</div>
        <div>
          塔木德折算（分三级别）：明星折20次，大咖折60次，阿神折180次，
          （每次晋星可反复使用）（塔木德评定系数：回答次数、回答质量、赞数，
          后台根据情况给与塔木德等级）；这个晋级星级的次数后台可手动修改，
          修改需要有备注（这个次数与实际参加活动次数是两个概念并显示出来）。
        </div>
        <div>
          主持/辅助人等级：最开始为初级、之后：优秀（可折算35次）、
          明星（可折算85次）、大咖（可折算135次）、阿神（可折算185次），
          评定系数为：主持/辅助次数、平均分、评价内容、面谈，
          后台根据情况给与主持人/辅助人等级。
        </div>
      </div>
    </div>

    <!--会员页面-->
    <div v-if="true">
      <div class="my_vip panel">
        <div class="my_vip_box">
          <div class="my_info">
            <div class="my_info_box">
              <img src="http://placehold.it/200">
              <div class="my_name">王五五</div>
              <div class="my_marry">单身</div>
            </div>
            <div class="activity_num">
              <div>参加次数：88次</div>
              <div>主持次数：18次</div>
              <div>辅助次数：83次</div>
              <div>塔木德次数：118次</div>
              <div>评价平均分：8分</div>
              <div>评价参与度：8分</div>
            </div>
          </div>
        </div>
        <div class="my_vip_price">
          <div>会费8888元</div>
          <div>充值</div>
          <div>收入8888元</div>
        </div>
      </div>

      <div class="panel">
        <wx-cell arrow text="我的活动" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的评价" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的关注" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的邀约" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>
      <div class="panel">
        <wx-cell arrow text="我的爱情" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我组织的" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的塔木德" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>
      <div class="panel">
        <wx-cell arrow text="平台客服" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>
    </div>

    <!--非会员页面-->
    <div v-else>
      <div class="my_no_vip">
        <div class="my_no_vip_info">
          <img src="http://placehold.it/200">
          <div class="my_name">王五五</div>
          <div class="my_marry">单身</div>
        </div>
      </div>

      <div class="panel">
        <wx-cell arrow text="我的活动" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的评价" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的关注" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>
      <div class="panel">
        <wx-cell arrow text="我的邀约" imgUrl="/static/img/my/my_activities.png"></wx-cell>
        <wx-cell arrow text="我的塔木德" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>

      <div class="panel">
        <wx-cell arrow text="平台客服" imgUrl="/static/img/my/my_activities.png"></wx-cell>
      </div>
    </div>
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
        fold_selected: false // 滑动单元格是否展开
      }
    },
    beforeMount () {
    },
    methods: {
      fold () {
        this.fold_selected = !this.fold_selected
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .fold_title {
    color: #999;
  }

  .fold_panel-box {
    padding: 15px;
    font-size 14px;
  }

  .my_vip {
    background-color white;

    .level_rule {
      color: #009BD9;
      font-size 12px;
      text-align right;
      padding: 5px 15px;
    }

    .my_vip_box {
      display flex;

      .my_info {
        flex 1;
        display inline-block;
        vertical-align top;

        .my_info_box {
          display flex;
          align-items center;
          justify-content center;
          font-size 14px;

          img {
            width 40px;
            height 40px;
            border-radius 50%;
            flex none
          }

          .my_name {
            margin 0 8px
          }

          .my_marry {
            flex none;
            color: #999
          }
        }

        .activity_num {
          margin-top 10px;
          font-size 12px;
          margin-left 30px;
          div:nth-child(-n+3) {
            text-indent: 1em;
          }
          div {
            color: red;
          }
        }
      }
    }

    .my_vip_price {
      display flex;
      font-size 14px;
      padding 10px 15px;
      justify-content space-between;
      color: #009BD9;
    }
  }

  .my_no_vip {
    background-color white;

    .my_no_vip_info {
      display flex;
      flex-direction column;
      align-items center;
      padding: 15px 0;
      font-size 14px;

      img {
        width 100px;
        height 100px;
        border-radius 50%;
      }

      .my_marry {
        color: #999;
      }
    }
  }


</style>
