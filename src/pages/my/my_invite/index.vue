<template>
  <main>
    <div class="tab panel panel-no_top panel-no_border">
      <div class="tab-box">
        <div class="tab-item" :class="currentTab===1?'tab-item-selected':''" @click="switchNav(1)">
          <div class="tab-title">发出的邀约</div>
        </div>
        <div class="tab-item" :class="currentTab===2?'tab-item-selected':''" @click="switchNav(2)">
          <div class="tab-title">收到的邀约</div>
        </div>
      </div>
    </div>

    <div class="tab panel panel-no_border panel-no_top">
      <div class="tab-box tab-box-no_border">
        <div class="tab-item" @click="switchNavChild(1)">
          <div class="tab-title" :class="currentTabChild===1?'tab-title-selected':''">活动邀约</div>
        </div>
        <div class="tab-item" @click="switchNavChild(2)">
          <div class="tab-title" :class="currentTabChild===2?'tab-title-selected':''">辅助邀约</div>
        </div>
        <div class="tab-item" @click="switchNavChild(3)">
          <div class="tab-title" :class="currentTabChild===3?'tab-title-selected':''">爱情邀约</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'my_invite',
    data () {
      return {
        currentTab: 1,
        currentTabChild: 1
      }
    },
    methods: {
      switchNav (tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
      },
      switchNavChild (tab) {
        if (this.currentTabChild === tab) return false
        this.currentTabChild = tab
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"
  page {
    background-color $background-color
  }
</style>
