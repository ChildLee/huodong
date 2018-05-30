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
    <div class="field border-cell">
      <div class="field_left">会员免费名额</div>
      <div class="field_right">
        <input v-model.lazy="freePlaces" placeholder="10"/>
      </div>
    </div>
    <div class="maxAndPrice border-cell">
      <div class="field">
        <div class="field_left">男生数量上限</div>
        <div class="field_right">
          <input v-model.lazy="menPlaces" placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input v-model.lazy="menPrice" placeholder="50"/>
        </div>
      </div>
    </div>
    <div class="maxAndPrice border-cell">
      <div class="field">
        <div class="field_left">女生数量上限</div>
        <div class="field_right">
          <input v-model.lazy="womenPlaces" placeholder="30"/>
        </div>
      </div>
      <div class="field">
        <div class="field_left">价格</div>
        <div class="field_right">
          <input v-model.lazy="womenPrice" placeholder="50"/>
        </div>
      </div>
    </div>

    <div class="publish_activities_btn">
      <div class="btn btn_size-small btn_color-diyBlue" @click="invite_btn">确定/邀约辅助人</div>
      <div class="btn btn_size-small btn-disabled" @click="no_invite_btn">确定/不邀约</div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'publish_activities',
    data() {
      return {
        id: '',
        time: '',
        title: '',
        phone: '',
        place: '',
        menPrice: '',
        menPlace: '',
        freePlaces: '',//免费名额
        womenPrice: '',
        womenPlaces: ''
      }
    },
    methods: {
      invite_btn() {
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
          womenPlaces: this.womenPlaces
        }).then(res => {
          if (res.state) {
            return wx.showToast({title: res.message, icon: 'none'})
          } else {
            wx.redirectTo({
              url: this.$app.utils.addUrlQuery('/pages/my/my_organize/invite/main', res.data)
            })
          }
        })
      },
      no_invite_btn() {
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
          womenPlaces: this.womenPlaces
        }).then(res => {
          if (res.data) {
            wx.redirectTo({
              url: this.$app.utils.addUrlQuery('/pages/my/my_organize/invite/main', res.data)
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
