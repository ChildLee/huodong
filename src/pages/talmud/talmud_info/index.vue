<template>
  <main>
    <div class="talmud">
      <div class="talmud-info" v-for="(item,index) in 1" :key="item.id">
        <div class="talmud-title">
          <span>{{item.title}}111</span>
          <span class="icon talmud-num" @click="addSame(item,item.id)">&#xe645;{{item.sameQuestion}}111</span>
        </div>
        <div class="talmud-tag">标签:{{item.tag}}111</div>
      </div>
    </div>

    <div class="container">
      <div class="talmud_info f f-between">
        <span class="f-none">💗王五</span>
        <span class="f-1">2018-8-8 9:00</span>
        <span class="f-none">王五</span>
      </div>
      <div class="">内容内容内容内容内容内容内容内
        容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {}
    },
    async onLoad() {
      await this.init()
    },
    methods: {
      async init() {

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
    border: 1px solid red;
  }
</style>
