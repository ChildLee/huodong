<template>
  <main>
    <div class="talmud_top">
      <!--<div>规则</div>-->
      <div class="talmud_top-search">
        <input type="text" placeholder="搜索"/>
      </div>
      <div class="btn btn_size-small" @click="same">我的同问</div>
    </div>

    <div class="tab tab-box">
      <div class="tab-item" :class="tab===1?'tab-item-selected':''" @click="switchTab(1)">
        <div class="tab-title">整理区</div>
      </div>
      <div class="tab-item" :class="tab===2?'tab-item-selected':''" @click="switchTab(2)">
        <div class="tab-title">散问区</div>
      </div>
    </div>

    <div class="talmud">
      <div class="talmud-info" v-for="(item,index) in list" :key="item.id">
        <div class="talmud-title">
          <span>{{item.title}}</span>
          <span class="talmud-btn">回答</span>
          <span class="icon talmud-num" @click="addSame(item,item.id)">&#xe645;{{item.sameQuestion}}</span>
        </div>
        <div class="talmud-tag">标签:{{item.tag}}</div>
      </div>
    </div>

    <div style="height: 80px" class="bd f f-wrap_r">
      <div style="width: 30%">1</div>
      <div style="width: 30%">2</div>
      <div style="width: 30%">3</div>
      <div style="width: 30%">4</div>
      <div style="width: 30%">5</div>
      <div style="width: 30%">6</div>
      <div style="width: 30%">7</div>
      <div style="width: 30%" class="order-first">8</div>
    </div>

    <div style="position:fixed;bottom:0;z-index:2;width: 100%;padding: 5px;height: 50px;background: white;">
      <div class="questioner">提问</div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'talmud',
    data() {
      return {
        status: 1,
        tab: 1,
        res: {
          data: {
            myTalmuds: ''
          }
        },
        list: [{
          id: 1,
          sameQuestion: 300,
          tag: '标签1,标签2,标签3',
          title: '塔木德标题1'
        }]
      }
    },
    async onLoad() {
      //判断资料填了没有
      this.$app.storageStore.userStore.getters.getType ? `` : wx.redirectTo({url: '/pages/my/my_info/add_info/main?id=1'})
      await this.init(1)
    },
    methods: {
      async init(tab) {
        this.$app.api.talmuds.talmuds({
          status: tab //1散问 2整理
        }).then(res => {
          this.list = []
          if (res.data) {
            this.list = JSON.parse(res.data.myTalmuds)
          }
        })
      },
      switchTab(tab) {
        this.tab = tab
        this.init(tab)
      },
      same() {
        this.$app.api.talmuds.talmuds({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          status: this.tab //1散问 2整理
        }).then(res => {
          this.list = []
          if (res.data) {
            this.list = JSON.parse(res.data.myTalmuds)
          }
        })
      },
      addSame(item, id) {
        this.$app.api.talmuds.addSameQuestion({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          id: id
        }).then(res => {
          if (res.data) {
            ++item.sameQuestion
          } else {
            wx.showToast({title: res.message, icon: 'none'})
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"

  .talmud_top {
    padding: 15px;
    display flex;
    align-items center;
    font-size 14px;
    background-color white;

    .talmud_top-search {
      flex: 1;
      margin: 0 10px;
      border: 1px solid #999;
      text-align: center;
    }
  }

  .talmud_zone {
    font-weight bold;
  }

  .talmud {
    padding: 15px;

    .talmud-info {
      padding: 10px;
      border-radius 8px;
      background-color #f5f5f5;
      margin-bottom 10px;

      .talmud-title {
        display flex;
        justify-content space-between;
        align-items center;
      }

      .talmud-btn {
        flex none;
        color: #25ABDF;
        font-weight bold;
      }

      .talmud-num {
        color: #3B80CE;
      }

      .talmud-tag {
        font-size 12px;
        color: #999;
      }
    }
  }

  .questioner {
    width 30%;
    line-height 40px;
    background-color: rgba(22, 155, 213, 1);
    color: #fff;
    border-radius 8px;
    text-align center;
    position: fixed;
    left 50%;
    bottom: 10px;
    margin-left -15%
  }
</style>

