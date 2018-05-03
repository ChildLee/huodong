<template>
  <main>
    <div class="card card_positive">上传身份证正面</div>
    <div class="card card_negative">上传身份证反面</div>
    <div class="card_desc">
      <textarea class="desc"/>
    </div>

    <div class="btn-box btn btn_color-primary">申请</div>
  </main>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .card {
    width: 80%;
    height 150px;
    margin 0 auto;
    display flex;
    align-items center;
    justify-content center;
    margin-top 15px;
    font-size 14px;
    color: #999;
    background-color #ccc;
  }

  .card_desc {
    width 80%;
    margin 0 auto;
    margin-top 15px;

    .desc {
      border: 1px solid #999;
    }
  }
</style>
