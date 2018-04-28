<template>
  <main>

    <div class="organize_info panel panel-no_top">
      <wx-cell text="深圳活动汇" text-size="18"></wx-cell>
      <wx-cell text="2018-8-8~~14:00-16:00" icon="icon icon-time"></wx-cell>
      <wx-cell text="深圳高新园地铁站" icon="icon icon-nav"></wx-cell>
      <wx-cell text="￥188" text-color="red" icon="icon icon-money"></wx-cell>
      <wx-cell text="15812345678" icon="icon icon-phone"></wx-cell>
    </div>

    <div class="organize_desc panel panel-no_border">
      <div class="title-mark"></div>
      <div>活动详情</div>
    </div>
    <div class="organize_content">代号吃喝玩</div>

    <div class="organize_desc panel panel-no_border">
      <div class="title-mark"></div>
      <div>活动人员</div>
    </div>

  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'organize_info',
    components: {
      WxCell
    }
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color $background-color
  }

  .organize_info {
    background-color white;
  }

  .organize_desc {
    display flex;
    align-items center;
    padding: 5px 15px;
    font-size 14px;
  }

  .title-mark {
    display inline-block;
    width 5px;
    height 15px;
    line-height 0;
    font-size 0;
    margin-right 2px;
    background #169BD5;
  }

  .organize_content {
    background-color white;
    min-height: 1em;
    padding: 5px 15px;
    font-size 14px;
    color: #333;
  }
</style>
