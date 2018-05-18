<template>
  <main>
    <div class="organize-btn">
      <div v-if="hostStatus" class="btn-box btn btn_size-small btn_color-diyBlue"
           @click="navigateTo('/pages/my/my_organize/application_host/main')">申请成为主持人
      </div>
      <div v-else class="btn-box btn btn_color-DodgerBlue">发布活动</div>
    </div>

    <div class="tab">
      <div class="tab-box">
        <div class="tab-item" :class="tab===1?'tab-item-selected':''" @click="organize_tab(1)">
          <div class="tab-title">将组织的</div>
        </div>
        <div class="tab-item" :class="tab===2?'tab-item-selected':''" @click="organize_tab(2)">
          <div class="tab-title">已组织的</div>
        </div>
      </div>
    </div>

    <div class="organize" v-for="(item,index) in list">
      <div class="organize-box" @click="organize_nav(item.id)">
        <div class="organize-info border-bottom-color_white">
          <div class="organize-time">{{item.time}}</div>
          <div class="organize-address">{{item.place}}</div>
          <div class="organize-status" v-if="!item.status">待确认</div>
        </div>
        <div class="organize-name">{{item.title}}</div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'my_organize',
    data() {
      return {
        hostStatus: 0,//0不是主持人
        tab: 1,
        type: 1,//0将组织的,1已组织的
        list: [{
          id: 1,
          place: '地点1',
          status: 2,//0准备发起 1已发起 2已结束
          time: '2018-5-13 17:19:40',
          title: '标题1'
        }]
      }
    },
    async onLoad() {
      this.init(1)
    },
    methods: {
      init(type) {
        this.$app.api.activity.myOrganizations({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          type: type
        }).then(res => {
          if (res.data) {
            this.list = JSON.parse(res.data.myOrganizations)
            this.hostStatus = res.data.hostStatus
          }
        })
      },
      organize_tab(tab) {
        this.tab = tab
        this.init(tab)
      },
      navigateTo(nav) {
        this.$app.nav.navigateTo(nav)
      },
      organize_nav(id) {
        this.$app.nav.navigateTo('/pages/my/my_organize/organize_info/main', {id})
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

  .organize-btn {
    text-align center;
  }

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
