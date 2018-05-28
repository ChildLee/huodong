<template>
  <main>

    <div class="field border-cell">
      <div class="field_left">活动名称</div>
      <div class="field_right">
        <input v-model.lazy="title" placeholder="16字以内 英文一个字母算一个字"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">活动时间</div>
      <div class="field_right">
        <input v-model.lazy="time" placeholder="2018-08-08 9：00"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">活动地点</div>
      <div class="field_right">
        <input v-model.lazy="place" placeholder="深圳 高新园 TCL大厦 1101 室"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">电话号码</div>
      <div class="field_right">
        <input v-model.lazy="phone" placeholder="联系方式"/>
      </div>
    </div>

    <div class="w h100">
      <textarea v-model="content" class="w h panel panel-no_top bg-f8 pd15-lr pd5-tb" placeholder="内容"></textarea>
    </div>

    <div class="publish_activities_btn">
      <div class="btn btn_size-small btn_color-diyBlue" @click="invite_btn">确定修改</div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'publish_activities',
    data() {
      return {
        activityId: 0, //活动Id
        id: '',
        time: '',
        title: '',
        phone: '',
        place: '',
        content: ''
      }
    },
    onLoad() {
      this.time = ''
      this.title = ''
      this.phone = ''
      this.place = ''
      this.content = ''
      this.activityId = this.$mp.query.id
    },
    methods: {
      invite_btn() {
        let that = this
        this.$app.api.activity.modifyActivity({
          id: that.activityId,
          time: that.time,
          title: that.title,
          place: that.place,
          phone: that.phone,
          content: that.content
        }).then(res => {
          if (res.state) {
            return wx.showToast({title: res.message, icon: 'none'})
          } else {
            wx.redirectTo({
              url: that.$app.utils.addUrlQuery('/pages/my/my_organize/organize_info/main', {id: that.activityId})
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus">

  page {
    background-color #F8f8f8;
  }

  .field_left {

  }

  .maxAndPrice {
    display flex;
  }

  .publish_activities_btn {
    display flex;
    align-items center
    justify-content center;
    margin-top 15px;
  }

</style>
