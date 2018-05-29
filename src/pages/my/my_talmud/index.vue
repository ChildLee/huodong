<template>
  <main>

    <div class="mg15-lr icon">

      <div class="pd15 mg10-b bg-eee br10" v-for="(item,index) in myTalmuds" :key="index" @click="talmudInfo(item.id)">
        <div class="fs16 c111 f-between">
          <div>{{item.title}}</div>
          <div>&#xe645;{{item.sameQuestion}}</div>
        </div>
        <div class="small c999 mg5-b f-between">
          <div>标签：{{item.tag}}</div>
          <!--<div class="fs12 ls">&#xe6e1;{{item.like}}</div>-->
        </div>
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
      }
    }
  }
</script>

<style lang="stylus">

</style>
