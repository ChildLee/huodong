<template>
  <main>
    <div class="tab">
      <div class="tab-box">
        <div :class="tab===1?'tab-item-selected':''" class="tab-item" @click="cutover(1)">
          <div class="tab-title">骚扰投诉</div>
        </div>
        <div :class="tab===2?'tab-item-selected':''" class="tab-item" @click="cutover(2)">
          <div class="tab-title">建议</div>
        </div>
        <div :class="tab===3?'tab-item-selected':''" class="tab-item" @click="cutover(3)">
          <div class="tab-title">业务联系</div>
        </div>
      </div>
    </div>

    <div>
      <textarea v-model="info" class="w h200">      </textarea>
    </div>

    <div class="btn btn_color-diyBlue" @click="submit">提交</div>
  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        tab: 1,
        info: ''
      }
    },
    methods: {
      cutover(tab) {
        this.tab = tab
      },
      submit() {
        this.info = ''
        wx.showToast({title: '提交成功!', icon: 'none'})
      }
    }
  }
</script>

<style scoped>

</style>
