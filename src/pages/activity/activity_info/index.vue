<template>
  <main>
    <div class="footer">
      <div>
        <span class="icon">&#xe607;</span>
        <span>收藏</span>
      </div>
      <div>
        <span class="icon">&#xe642;</span>
        <span>分享</span>
      </div>
      <div>
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
    name: 'activity_info'
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"
  .footer {
    width 100%;
    position: fixed;
    bottom 0;
    line-height 50px;
    display flex;
    justify-content space-between;
    align-items center;
    font-size 16px;
    color: #999;

    ._div {
      width 100%;
      text-align center;
      border: 1px solid #ccc;

      ._span {
      padding 0 2px;
      }

      &:last-child {
        background-color DodgerBlue;
        color: white;
      }
    }
  }
</style>
