<template>
  <main>

    <div class="field border-cell">
      <div class="field_left">活动名称</div>
      <div class="field_right">
        <input v-model="title" placeholder="16字以内 英文一个字母算一个字"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">活动时间</div>
      <div class="field_right">
        <input v-model="time" placeholder="2018-08-08 9：00"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">活动地点</div>
      <div class="field_right">
        <input v-model="place" placeholder="深圳 高新园 TCL大厦 1101 室"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">电话号码</div>
      <div class="field_right">
        <input v-model="phone" placeholder="联系方式"/>
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
        content: '',
        activity: {
          'content': '2',
          'phone': '2',
          'place': '2',
          'time': '2',
          'title': '2'
        }
      }
    },
    onLoad() {
      this.init()
    },
    methods: {
      init() {
        this.time = ''
        this.title = ''
        this.phone = ''
        this.place = ''
        this.content = ''

        this.activityId = this.$mp.query.id
        console.log('活动ID', this.activityId)

        this.$app.api.activity.myOrganization({
          id: this.activityId, //活动id
          userId: this.$app.storageStore.userStore.getters.getUserId //用户id
        }).then(res => {
          if (res.data.myOrganizations) {
            let activity = JSON.parse(res.data.myOrganizations)
            this.title = activity.title
            this.time = activity.time
            this.phone = activity.phone
            this.place = activity.place
            this.content = activity.content
            console.log(this.activity)
          }
        })
      },
      reg(enter) {
        let reg = /[a-zA-Z\d\u4e00-\u9fa5]/
        return !reg.test(enter)
      },
      regNum(enter) {
        let reg = /^\d+$/
        return !reg.test(enter)
      },
      invite_btn() {
        let r = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
        let p = /1[0-9]{10}/

        if (this.reg(this.title)) {
          return wx.showToast({title: '请输入正确的标题', icon: 'none'})
        }

        if (!r.test(this.time)) {
          return wx.showToast({title: '时间格式为:2014-01-01 12:00:00', icon: 'none'})
        }

        let day = new Date()
        let day1 = new Date(this.time)
        if (day - day1 > 0) {
          return wx.showToast({title: '时间不能小于当前时间', icon: 'none'})
        }

        if (this.reg(this.place)) {
          return wx.showToast({title: '请输入正确的地点', icon: 'none'})
        }

        if (!p.test(this.phone)) {
          return wx.showToast({title: '请输入正确的手机号', icon: 'none'})
        }

        if (this.reg(this.content)) {
          return wx.showToast({title: '请输入正确的内容', icon: 'none'})
        }

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
