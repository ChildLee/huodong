<template>
  <main>
    <div class="panel panel-no_top">
      <wx-cell text="王五" desc="恋爱中" info="深圳"></wx-cell>
      <wx-cell text="手机" desc="13344445555" info="更改需要后台验证并同意"></wx-cell>
      <div class="my_info_desc">自我感觉好</div>
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

    <div class="my_info_edit btn-box">
      <div class="btn" @click="navigateTo('/pages/my/my_info/edit_info/main')">修改</div>
    </div>
  </main>
</template>

<script>
  import WxCell from '@/components/cell'

  export default {
    name: 'my_info',
    components: {
      WxCell
    },
    data () {
      return {}
    },
    methods: {
      navigateTo (nav) {
        this.$app.nav.navigateTo(nav)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl";

  page {
    background-color $background-color;
  }

  .my_info_edit {
    text-align right;
  }

  .my_info_desc {
    padding: 15px;
    font-size 14px;
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

