<template>
  <main>

    <div class="mg15-lr icon">

      <div class="pd15 mg10-b bg-eee br10" v-for="(item,index) in myTalmuds" :key="index">
        <div class="fs16 c111 f-between">
          <div>{{item.title}}</div>
          <div>&#xe645;{{item.sameQuestion}}</div>
        </div>
        <div class="small c999 mg5-b f-between">
          <div>标签：{{item.tag}}</div>
          <div class="fs12 ls">&#xe6e1;{{item.like}}</div>
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
      await this.init()
    },
    methods: {
      async init() {
        this.$app.api.talmuds.myTalmud({
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="stylus">

</style>
