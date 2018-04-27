<template>
  <main>
    <div class="attention_info panel panel-no_top panel-no_border">
      <div class="attention_info_box">
        <div class="info-name">王五</div>
        <div class="info-Marriage"><i class="info-Marriage_sex icon icon-men"></i>单身</div>
        <div class="info-address">深圳</div>
      </div>
    </div>

    <div class="panel">
      <div class="other_info">
        <div class="border">年龄</div>
        <div class="border">属相</div>
        <div class="border">星座</div>
      </div>
      <div class="other_info">
        <div class="border">身高</div>
        <div class="border">职业</div>
        <div class="border">籍贯</div>
      </div>
    </div>

    <div class="panel">
      <wx-cell text="其他" text-color="#999"></wx-cell>
    </div>

    <div class="panel">
      <wx-cell arrow text="Ta的活动"></wx-cell>
    </div>

    <div class="panel">
      <wx-cell arrow text="Ta的评价"></wx-cell>
    </div>

    <div class="panel">
      <wx-cell arrow text="Ta组织的"></wx-cell>
    </div>

    <div class="panel">
      <wx-cell arrow text="Ta的塔木德"></wx-cell>
    </div>

  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'attention_info',
    components: {
      WxCell
    },
    data() {
      return {}
    },
    beforeMount() {
    },
    methods: {}
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .attention_info {
    padding: 15px;
    display flex;
    justify-content space-between;
    align-items center;
  }

  .echarts-wrap {
    flex none;
    display inline-block
    width: 220px;
    height: 150px;
  }

  .attention_info_box {
    width 0;
    flex 1;
    display inline-block;
    font-size 16px;
    color: $gray-dark
    text-align center;

    .info-name {
      font-size 18px;
      color: $text-color;
    }
    .info-Marriage_sex {
      display inline-block;
    }
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
