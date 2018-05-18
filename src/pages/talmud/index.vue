<template>
  <main>
    <div class="talmud_top">
      <div>规则</div>
      <div class="talmud_top-search">
        <input type="text" placeholder="搜索"/>
      </div>
      <div class="btn btn_size-small">我的同问</div>
    </div>

    <div class="btn btn_size-large">
      <span class="talmud_zone">整理区</span>
      <span>/散问区</span>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {}
    },
    async onLoad() {
      //判断资料填了没有
      this.$app.storageStore.userStore.getters.getType ? `` : wx.redirectTo({url: '/pages/my/my_info/add_info/main?id=1'})
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl";

  page {
    background-color $background-color;
  }

  .talmud_top {
    padding: 15px;
    display flex;
    align-items center;
    font-size 14px;
    background-color white;

    .talmud_top-search {
      flex 1;
      margin 0 10px;
      border: 1px solid #999;
      text-align center;
    }
  }

  .talmud_zone {
    font-weight bold;
  }
</style>

