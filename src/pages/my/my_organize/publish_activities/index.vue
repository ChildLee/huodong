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
        <input v-model.lazy="time" placeholder="2014-01-01 12:00:00"/>
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
        <input type="number" v-model.lazy="phone" placeholder="联系方式"/>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">会员免费名额</div>
      <div class="field_right">
        <input type="number" v-model.lazy="freePlaces" placeholder="10"/>
      </div>
    </div>
    <div class="maxAndPrice border-cell">
      <div class="field">
        <div class="field_left">男生数量上限</div>
        <div class="field_right">
          <input type="number" v-model.lazy="menPlaces" placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input type="number" v-model.lazy="menPrice" placeholder="50"/>
        </div>
      </div>
    </div>
    <div class="maxAndPrice border-cell">
      <div class="field">
        <div class="field_left">女生数量上限</div>
        <div class="field_right">
          <input type="number" v-model.lazy="womenPlaces" placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input type="number" v-model.lazy="womenPrice" placeholder="50"/>
        </div>
      </div>
    </div>
    <div class="field border-cell">
      <div class="field_left">内容</div>
      <div class="field_right">
        <textarea v-model="content" placeholder="活动目的,意义"/>
      </div>
    </div>

    <div class="publish_activities_btn mg15-b">
      <div class="btn btn_size-small btn_color-diyBlue" @click="invite_btn">确定/邀约辅助人</div>
      <div class="btn btn_size-small btn_color-diyBlue" @click="no_invite_btn" v-if="hostLV>=aloneHost">确定/不邀约</div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'publish_activities',
    data() {
      return {
        submit: true,
        id: '',
        time: '',
        title: '',
        phone: '',
        place: '',
        menPrice: '',
        menPlace: '',
        freePlaces: '',//免费名额
        womenPrice: '',
        womenPlaces: '',
        content: '',
        hostLV: 0, //主持人的等级,3级才能不邀约辅助人
        aloneHost: 0 //达到这个等级可以不邀约辅助人
      }
    },
    onShow() {
      this.submit = true
      this.init()
    },
    methods: {
      init() {
        this.hostLV = this.$mp.query.hostLV
        this.aloneHost = this.$mp.query.aloneHost
        console.log('发布活动界面', '主持人等级', this.hostLV)
        this.time = ''
        this.title = ''
        this.place = ''
        this.phone = ''
        this.menPrice = ''
        this.menPlaces = ''
        this.freePlaces = ''
        this.womenPrice = ''
        this.womenPlaces = ''
        this.content = ''
      },
      reg(enter) {
        let reg = /[a-zA-Z\d\u4e00-\u9fa5]/
        return !reg.test(enter)
      },
      regNum(enter) {
        let reg = /^\d+$/
        return !reg.test(enter)
      },
      regform() {

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

        if (this.regNum(this.menPrice)
          || this.regNum(this.menPlaces) || this.regNum(this.freePlaces)
          || this.regNum(this.womenPrice) || this.regNum(this.womenPlaces)
        ) {
          return wx.showToast({title: '价格和数量只能为数字', icon: 'none'})
        }

        let info = {
          id: this.$app.storageStore.userStore.getters.getUserId,
          time: this.time,
          title: this.title,
          place: this.place,
          phone: this.phone,
          menPrice: this.menPrice,
          menPlaces: this.menPlaces,
          freePlaces: this.freePlaces,
          womenPrice: this.womenPrice,
          womenPlaces: this.womenPlaces,
          content: this.content
        }

        wx.redirectTo({
          url: this.$app.utils.addUrlQuery('/pages/my/my_organize/invite/main', {info: JSON.stringify(info)})
        })
      },
      no_invite_btn() {
        if (this.submit) {
          this.submit = false
        } else {
          return wx.showToast({title: '请不要重复提交', icon: 'none'})
        }

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

        if (this.regNum(this.menPrice)
          || this.regNum(this.menPlaces) || this.regNum(this.freePlaces)
          || this.regNum(this.womenPrice) || this.regNum(this.womenPlaces)
        ) {
          return wx.showToast({title: '价格和数量只能为数字', icon: 'none'})
        }

        this.$app.api.activity.publishActivities({
          id: this.$app.storageStore.userStore.getters.getUserId,
          time: this.time,
          title: this.title,
          place: this.place,
          phone: this.phone,
          menPrice: this.menPrice,
          menPlaces: this.menPlaces,
          freePlaces: this.freePlaces,
          womenPrice: this.womenPrice,
          womenPlaces: this.womenPlaces,
          content: this.content
        }).then(res => {
          /**
           * activityId:62
           * addStatus:true
           * hostStatus:0
           * userId:5
           */
          console.log(res.data)
          if (res.data) {
            this.$app.api.activity.separateHosting({
              userId: res.data.userId,
              activityId: res.data.activityId
            }).then(res => {
              console.log(res.data)
              if (res.data) {
                wx.redirectTo({
                  url: this.$app.utils.addUrlQuery('/pages/my/my_organize/main', res.data)
                })
              }
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
