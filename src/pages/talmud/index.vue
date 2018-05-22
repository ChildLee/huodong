<template>
  <main style="height: 100%;">
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

    <div class="talmud" v-if="member&&tab===1">
      <div class="talmud-info" v-for="(item,index) in list" :key="item.id" @click.stop="talmudInfo(item.id)">
        <div class="talmud-title">
          <span>{{item.title}}</span>
          <span class="talmud-btn" @click="reply(item.id)">回答</span>
          <span class="icon talmud-num" @click.stop="addSame(item,item.id)">&#xe645;{{item.sameQuestion}}</span>
        </div>
        <div class="talmud-tag">标签:{{item.tag}}</div>
      </div>
    </div>

    <div style="height: 50px"></div>

    <div class="questioner_box">
      <div class="questioner" @click="popup">提问</div>
    </div>

    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>
          <div>提问</div>
          <div>
            <textarea v-model.lazy="quest_text" class="quest_text"></textarea>
          </div>
          <div>标签</div>
          <div>
            <input v-model.lazy="quest_tag" class="quest_input" type="text">
          </div>
          <div class="quest_send" @click="quest_send">发送</div>
        </div>
      </div>
      <div class="popup-curtain" @click="closePopup"><!--幕布--></div>
    </div>
  </main>
  <!--弹窗-->
</template>

<script>
  export default {
    name: 'talmud',
    data() {
      return {
        member: 0,
        quest_text: '',
        quest_tag: '',
        isPopup: false, //是否显示弹窗
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
      this.member = this.$app.storageStore.userStore.getters.getMember
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
      closePopup() {
        this.isPopup = false
      },
      popup() {
        this.isPopup = true
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
      },
      quest_send() {
        this.$app.api.talmuds.addTalmud({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          content: this.quest_text,
          title: this.quest_text,
          tag: this.quest_tag
        }).then(res => {
          if (res.state) {
            return wx.showToast({title: res.message, icon: 'none'})
          }
          if (res.data) {
            this.init(this.tab)
          }
        })
        this.quest_text = ''
        this.quest_tag = ''
        this.closePopup()
      },
      talmudInfo(id) {
        this.$app.nav.navigateTo('/pages/talmud/talmud_info/main', {id})
      },
      reply(id) {
        // this.$app.api.talmuds.talmud({}).then(res => {
        //
        // })
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

  .questioner_box {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 5px;
    height: 50px;
    background: white;
  }

  .questioner {
    z-index 1;
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

  /* 弹窗 */
  .popup {
    height 100%;

    .popup-box {
      padding: 15px;
      box-sizing border-box;
      border-radius 10px;
      background-color white;
      position: fixed;
      top: 30%;
      left: 10%;
      width 80%;
      z-index: 4;
      transition: all 2s;

      .popup-msg {
        font-size 14px;
      }
    }

    .popup-curtain {
      background-color rgba(0, 0, 0, .5)
      position fixed;
      top: 0;
      left: 0;
      width 100%;
      height 100%;
      z-index 3;
    }
  }

  .quest_text {
    border 0 solid #eee;
    border-bottom-width 1px;
    width 100%;
    height 1rem;
  }

  .quest_input {
    border 0 solid #eee;
    border-bottom-width 1px;
  }

  .quest_send {
    text-align center;
    width 30%;
    line-height 35px;
    border-radius 8px;
    margin 0 auto;
    margin-top 10px;
    font-size 16px;
    color: #1388BA;
  }
</style>

