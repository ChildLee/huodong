<template>
  <main>

    <!--<div class="talmud_top">-->
      <!--&lt;!&ndash;<div>规则</div>&ndash;&gt;-->
      <!--<div class="talmud_top-search">-->
        <!--<input v-model="search1" type="text" placeholder="搜索" @blur="search"/>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="btn btn_size-small" @click="same">我的同问</div>&ndash;&gt;-->
    <!--</div>-->

    <div class="mg15-lr icon">

      <div class="pd15 mg10-b bg-eee br10" v-for="(item,index) in myTalmuds" :key="index" @click="talmudInfo(item.id)">
        <div class="fs16 c111 f-between">
          <div>{{item.title}}</div>
          <div>&#xe645;{{item.sameQuestion}}</div>
        </div>
        <div class="small c999 mg5-b f-between">
          <div>标签：{{item.tag}}</div>
          <div class="fs12 ls c999">&#xe6e1;{{item.likes}}</div>
        </div>
        <div style="float: right" class="fs14 c555" @click.stop="del_ta(item.id)">删除</div>

        <div class="fs16 c555 fs14">{{item.content}}</div>
      </div>

    </div>

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        id: 0,
        myTalmuds: [{
          'content': '塔木德回答内容2',
          'id': 2,
          'like': 0,
          'sameQuestion': 300,
          'tag': '标签1,标签2,标签3',
          'title': '塔木德标题1'
        }]
      }
    },
    async onLoad() {
      this.id = this.$mp.query.id || this.$app.storageStore.userStore.getters.getUserId
      await this.init()
    },
    methods: {
      async init() {
        this.myTalmuds = []
        this.$app.api.talmuds.myTalmud({
          userId: this.id
        }).then(res => {
          if (res.data) {
            this.myTalmuds = JSON.parse(res.data.myTalmuds)
          }
        })
      },
      talmudInfo(id) {
        this.$app.nav.navigateTo('/pages/talmud/talmud_info/main', {id})
      },
      del_ta(id) {
        let that = this
        this.$app.api.talmuds.deleteReply({
          id: id
        }).then(res => {
          if (res.data) {
            that.init()
            wx.showToast({title: '删除成功!', icon: 'none'})
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl"

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
</style>
