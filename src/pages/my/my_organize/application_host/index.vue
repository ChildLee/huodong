<template>
  <main>
    <div class="card card_positive" @click="up_1">
      <span v-if="!img">上传身份证正面</span>
      <img v-else :src="img" class="card_img">
    </div>
    <div class="card card_negative" @click="up_1">
      <span v-if="!img_2">上传身份证正面</span>
      <img v-else :src="img_2" class="card_img">
    </div>
    <div class="card_desc">
      <textarea class="desc"/>
    </div>
    <div class="btn-box btn btn_color-diyBlue" @click="app_btn">申请</div>
  </main>
</template>

<script>
  export default {
    name: 'application_host',
    data() {
      return {
        img: '',
        img_2: ''
      }
    },
    methods: {
      up_1() {
        let that = this
        wx.chooseImage({
          success(res) {
            let tempFilePaths = res.tempFilePaths
            that.img = tempFilePaths[0]
            wx.uploadFile({
              url: wx.httpRequest._config.domain + '/cs/weChat/file',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                id: that.$app.storageStore.userStore.getters.getUserId
              },
              header: {
                'content-type': 'multipart/form-data'
              },
              success: function (res) {
                console.log(res)
              }
            })
          }
        })
      },
      // up_2() {
      //   let that = this
      //   wx.chooseImage({
      //     success(res) {
      //       let tempFilePaths = res.tempFilePaths
      //       that.img_2 = tempFilePaths[0]
      //     }
      //   })
      // },
      app_btn() {
        this.$app.nav.navigateTo('/pages/my/my_organize/main')
        wx.showToast({title: '申请成功!', icon: 'none'})
        this.img = ''
        this.img_2 = ''
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../../stylus/common.styl"

  page {
    background-color $background-color;
  }

  .card {
    width: 80%;
    height 150px;
    margin 0 auto;
    display flex;
    align-items center;
    justify-content center;
    margin-top 15px;
    font-size 14px;
    color: #999;
    background-color #ccc;
  }

  .card_desc {
    width 80%;
    margin 0 auto;
    margin-top 15px;

    .desc {
      width 100%;
      border: 1px solid #ccc;
    }
  }

  .card_img {
    width: 100%;
    height 100%;
  }
</style>
