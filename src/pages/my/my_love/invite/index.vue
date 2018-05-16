<template>
  <main>
    <!--<div class="invite-search">-->
    <!--<input type="text" placeholder="搜索">-->
    <!--</div>-->

    <div class="invite-title border-bottom">
      <div>关注人</div>
      <div>备注</div>
      <div>邀约</div>
    </div>

    <div>
      <div class="invite-list border-bottom">
        <div>张三</div>
        <div>老张</div>
        <div>
          <span class="btn-no_border btn btn_size-small btn_color-DodgerBlue">邀约</span>
        </div>
      </div>
      <div class="invite-list border-bottom">
        <div>张三</div>
        <div>老张</div>
        <div>
          <span class="btn-no_border btn btn_size-small btn_color-DodgerBlue">邀约</span>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'activity_invite'
  }
</script>

<style lang="stylus">
  page {
    /*background-color #e4e4e4;*/
  }

  .btn-no_border {
    border-radius 15px;

    &::after {
      border: none;
    }
  }

  .invite-search {
    width 80%;
    margin 5px auto;
    background-color white;
    border-radius 10px;
    text-align center;
    padding: 5px 0;
  }

  .invite-title {
    font-size 16px;
    font-weight bold;
    display: flex;
    align-items center;
    padding: 10px 0;
    ._div {
      flex: 1;
      text-align center
    }

  }

  .invite-list {
    display: flex;
    align-items center;
    background-color white;
    padding: 10px 0;
    font-size 16px;

    ._div {
      flex: 1;
      text-align center
    }
  }
</style>
