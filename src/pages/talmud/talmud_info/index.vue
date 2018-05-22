<template>
  <main>
    <div class="talmud">
      <div class="talmud-info">
        <div class="talmud-title">
          <span>{{talmud.title}}</span>
          <!--<span class="icon talmud-num" @click="addSame(item,item.id)">&#xe645;{{talmud.content}}</span>-->
        </div>
        <!--<div class="talmud-tag">标签:{{item.tag}}111</div>-->
      </div>
    </div>

    <div class="mg15 mg-no-t br10 bg-f9" v-for="(item,index) in replies" :key="index">
      <div class="pd15 ">
        <div class="talmud_info f f-between c999 ">
          <span class="f-none">{{item.nickName}}</span>
          <span class="f-1 mg10-l small">2018-8-8 9:00</span>
        </div>
        <div class="c555 fs14">{{item.content}}
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
        replies: [{'attentionStatus': 0, 'content': '塔木德回答内容1', 'like': 300, 'nickName': '匿名用户'}],
        talmud: {'content': '塔木德内容1', 'title': '塔木德标题1'}
      }
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      async init() {
        this.$app.api.talmuds.talmud({
          id: this.$mp.query.id
        }).then(res => {
          if (res.data) {
            this.replies = JSON.parse(res.data.replies)
            this.talmud = JSON.parse(res.data.talmud)
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
