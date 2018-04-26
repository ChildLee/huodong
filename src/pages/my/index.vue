<template>
  <main>
    <!--会员页面-->
    <div v-if="true">
      <div class="my_vip">
        <div class="level_rule">等级与充值规则</div>
        <div class="my_vip_box">
          <div class="echarts-wrap">
            <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas"/>
          </div>
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
  import echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'

  export default {
    name: '个人中心',
    components: {
      WxCell,
      mpvueEcharts
    },
    data() {
      return {
        echartsData: [1, 2, 3, 4],
        echarts,
        onInit: ''
      }
    },
    beforeMount() {
      console.log(2)
      this.onInit = this.initChart
    },
    methods: {
      // 菱形图
      initChart(canvas, width, height) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        let option = {
          color: ['#ff0000'],
          radar: {
            // radius: 40, // 放大
            startAngle: 135, // 旋转
            axisLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            nameGap: 0, // 指示器名称和指示器轴的距离。
            name: {
              // fontSize: 16,
              // padding: 10
            },
            indicator: [{
              name: '会员等级',
              max: 5,
              color: '#000'
            }, {
              name: '主持大咖',
              max: 5,
              color: '#000'
            }, {
              name: '塔木德阿神',
              max: 5,
              color: '#000'
            }, {
              name: '辅助明星',
              max: 5,
              color: '#000'
            }]
          },
          series: [{
            type: 'radar',
            data: [{
              value: this.echartsData
            }]
          }]
        }
        chart.setOption(option)
        return chart
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"

  page {
    background-color $background-color;
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

      .echarts-wrap {
        flex none;
        display inline-block
        width: 220px;
        height: 150px;
      }

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
