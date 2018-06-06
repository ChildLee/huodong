<template>
  <main>
    <div class="tab">
      <div class="tab-box">
        <div :class="tab===0?'tab-item-selected':''" class="tab-item" @click="cutover(0)">
          <div class="tab-title">骚扰投诉</div>
        </div>
        <div :class="tab===1?'tab-item-selected':''" class="tab-item" @click="cutover(1)">
          <div class="tab-title">建议</div>
        </div>
        <div :class="tab===2?'tab-item-selected':''" class="tab-item" @click="cutover(2)">
          <div class="tab-title">业务联系</div>
        </div>
      </div>
    </div>

    <div>
      <textarea v-model="info" class="w h200"></textarea>
    </div>

    <div class="btn btn_color-diyBlue" @click="submit">提交</div>

    <div class="we w-80 tc">
      <img class="w-60" mode="widthFix" src="/static/img/we.png">
      <div class="c999">请截屏后用微信识别二维码添加客服微信</div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        tab: 0,
        info: ''
      }
    },
    methods: {
      cutover(tab) {
        this.tab = tab
      },
      submit() {
        this.$app.api.user.feedback({
          content: this.info,
          type: this.tab,
          userId: this.$app.storageStore.userStore.getters.getUserId
        }).then(res => {
          if (res.data) {
            wx.showToast({title: '提交成功!', icon: 'none'})
          }
        }).catch(res => {
          wx.showToast({title: '未知错误!', icon: 'none'})
        })
        this.info = ''
      }
    }
  }
</script>

<style lang="stylus">
  .we {
    margin 0 auto;
  }
</style>
