<template>
  <main>
    <div class="talmud">
      <div class="talmud-info">
        <div class="talmud-title">
          <span>{{talmud.title?talmud.title:''}}</span>
        </div>
        <div class="talmud-tag">标签:{{talmud.tag?talmud.tag:''}}</div>
      </div>
    </div>

    <div class="mg15 mg-no-t br10 bg-f9" v-for="(item,index) in replies" :key="index">
      <div class="pd15 ">
        <div class="talmud_info f f-between c999 ">
          <span class="f-none f f-y-c">
              <!--<i class="icon"-->
                 <!--:style="item.attention?'color:red;':''"-->
                 <!--:class="item.attention?'icon-red-heart':'icon-heart'" @click="focus(item,item.attUid,item.attention)">-->
              <!--</i>-->
            <span class="mg5-l">{{item.nickName}}</span>
          </span>
          <span class="f-1 mg10-l small">2018-8-8 9:00</span>
          <span style="float: right" class="small icon" @click.stop="like_btn(item.id)">&#xe6e1; {{item.likes}}</span>
        </div>
        <div class="c555 fs14 mg5-l">{{item.content}}
        </div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        replies: [],
        talmud: {}
      }
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      async init() {
        let that = this
        this.replies = []
        this.talmud = {}
        this.$app.api.talmuds.talmud({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          id: that.$mp.query.id
        }).then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.replies) {
              that.replies = JSON.parse(res.data.replies)
            }
            if (res.data.talmud !== 'null') {
              that.talmud = JSON.parse(res.data.talmud)
            }
          }
        })
      },
      like_btn(id) {
        let that = this
        this.$app.api.talmuds.like({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          talmudId: id
        }).then(res => {
          if (res.data) {
            that.init()
          }
          console.log(res.data)
        })
      },
      //点击💗关注事件
      focus(item, id, attention) {
        this.$app.api.user.addFocus({
          userId: this.$app.storageStore.userStore.getters.getUserId,
          attentionUserId: id,
          status: !attention
        }).then(res => {
          if (res.data) {
            item.attention = !item.attention
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
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

  .talmud_info {

  }
</style>
