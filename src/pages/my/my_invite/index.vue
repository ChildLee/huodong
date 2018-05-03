<template>
  <main>
    <div class="tab panel panel-no_top panel-no_border">
      <div class="tab-box">
        <div class="tab-item tab-item-selected">
          <div class="tab-title">发出的邀约</div>
        </div>
        <div class="tab-item">
          <div class="tab-title">收到的邀约</div>
        </div>
      </div>
    </div>

    <div class="tab panel panel-no_border panel-no_top">
      <div class="tab-box tab-box-no_border">
        <div class="tab-item">
          <div class="tab-title">活动邀约</div>
        </div>
        <div class="tab-item">
          <div class="tab-title">辅助邀约</div>
        </div>
        <div class="tab-item">
          <div class="tab-title">爱情邀约</div>
        </div>
      </div>
    </div>


  </main>
</template>

<script>
  export default {
    name: 'my_invite'
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"
  page {
    background-color $background-color
  }
</style>
