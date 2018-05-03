<template>
  <main>

    <div class="field border-cell_line">
      <div class="field_left">活动名称</div>
      <div class="field_right">
        <input placeholder="16字以内 英文一个字母算一个字"/>
      </div>
    </div>
    <div class="field border-cell_line">
      <div class="field_left">活动时间</div>
      <div class="field_right">
        <input placeholder="2018-08-08 9：00"/>
      </div>
    </div>
    <div class="field border-cell_line">
      <div class="field_left">活动地点</div>
      <div class="field_right">
        <input placeholder="深圳 高新园 TCL大厦 1101 室"/>
      </div>
    </div>
    <div class="field border-cell_line">
      <div class="field_left">会员免费名额</div>
      <div class="field_right">
        <input placeholder="10"/>
      </div>
    </div>
    <div class="maxAndPrice border-cell_line">
      <div class="field">
        <div class="field_left">男生数量上限</div>
        <div class="field_right">
          <input placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input placeholder="50"/>
        </div>
      </div>
    </div>
    <div class="maxAndPrice border-cell_line">
      <div class="field">
        <div class="field_left">女生数量上限</div>
        <div class="field_right">
          <input placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input placeholder="50"/>
        </div>
      </div>
    </div>

    <div class="publish_activities_btn">
      <div class="btn btn_size-small btn_color-primary">确定/邀约辅助人</div>
      <div class="btn btn_size-small btn-disabled">确定/不邀约</div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style lang="stylus">

  .field_left {
    color: #006600;
  }

  .maxAndPrice {
    display flex;
  }

  .publish_activities_btn {
    display flex;
    align-items center
    justify-content center;
    margin-top 15px;
  }

</style>
