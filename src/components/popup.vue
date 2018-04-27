<template>
  <main>
    <!--弹窗-->
    <div class="popup" v-if="isPopup">
      <div class="popup-box">
        <div>13333333</div>
      </div>
      <div class="popup-curtain" @click="popup"></div>
    </div>
    <!--弹窗-->
  </main>
</template>

<script>
  export default {
    name: 'popup',
    data() {
      return {
        isPopup: false
      }
    },
    methods: {
      popup() {
        this.isPopup = !this.isPopup
      }
    }
  }
</script>

<style scoped>

</style>
