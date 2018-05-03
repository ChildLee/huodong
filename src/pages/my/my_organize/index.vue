<template>
  <main>
    <div>
      <div v-if="true" class="btn-box btn btn_color-DodgerBlue"
           @click="navigateTo('/pages/my/my_organize/application_host/main')">申请成为主持人
      </div>
      <div v-else class="btn-box btn btn_color-DodgerBlue">发布活动</div>
    </div>

    <div class="tab">
      <div class="tab-box">
        <div class="tab-item tab-item-selected">
          <div class="tab-title">将组织的</div>
        </div>
        <div class="tab-item">
          <div class="tab-title">已组织的</div>
        </div>
      </div>
    </div>

    <div class="organize">

      <div class="organize-box">
        <div class="organize-info border-bottom-color_white">
          <div class="organize-time">2018-8-8 9:00</div>
          <div class="organize-address">深圳高新园</div>
          <div class="organize-status">待确认</div>
        </div>
        <div class="organize-name">深圳活动汇深圳活动汇深活动汇</div>
      </div>
      <div class="organize-box">
        <div class="organize-info border-bottom-color_white">
          <div class="organize-time">2018-8-8 9:00</div>
          <div class="organize-address">深圳高新园</div>
          <div class="organize-status" v-if="false">待确认</div>
        </div>
        <div class="organize-name">深圳活动汇深圳活动汇深活动汇</div>
      </div>

    </div>
  </main>
</template>

<script>
  export default {
    name: 'my_organize',
    computed: {},
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      navigateTo (nav) {
        this.$app.nav.navigateTo(nav)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  page {
    background-color $background-color
  }

  .organize {
    padding: 15px;

    .organize-box {
      padding: 15px;
      margin-bottom 15px;
      border-radius 10px;
      background-color rgba(0, 0, 0, .08);

      .organize-info {
        display flex
        align-items center;
        padding-bottom: 5px;
        font-size 14px;
        color: #999

        .organize-time {
          flex none;
        }

        .organize-address {
          width 0;
          flex 1
          margin-left 10px;
        }

        .organize-status {
          flex none;
          color: Darkorange;
        }
      }

      .organize-name {
        margin-top 5px;
        font-size 14px;
        color: #666;
      }
    }
  }
</style>
