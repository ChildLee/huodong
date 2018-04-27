<template>
  <main>
    <div class="tab panel panel-no_top panel-no_border">
      <div class="tab_box">
        <div class="tab_item tab_item-selected">
          <div class="tab_title">发出的邀约</div>
        </div>
        <div class="tab_item">
          <div class="tab_title">收到的邀约</div>
        </div>
      </div>
    </div>

    <div class="tab panel panel-no_border panel-no_top">
      <div class="tab_box tab_box-no_border">
        <div class="tab_item">
          <div class="tab_title">活动邀约</div>
        </div>
        <div class="tab_item">
          <div class="tab_title">辅助邀约</div>
        </div>
        <div class="tab_item">
          <div class="tab_title">爱情邀约</div>
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
