<template>
  <main>
    <div class="slide_cell border_line" v-for="(item,index) in list">
      <div class="slide_box"
           :style="item.style"
           :data-index="index"
           @touchstart="touchS"
           @touchmove="touchM"
           @touchend="touchE">
        <!--代码-->

      </div>
      <!--这里是滑动后显示的按钮----start-->
      <div class="slide_btn">
        <div class="del">删除</div>
      </div>
      <!--这里是滑动后显示的按钮----end-->
    </div>
  </main>
</template>

<script>
  export default {
    name: 'slide_cell',
    data() {
      return {
        list: [{
          style: ''
        }],
        startX: 0, // 记录触摸起始位置的X坐标
        btnWidth: 160, // 右侧按钮区域的宽度,单位rpx
        style: '', //滑动后样式
        index: 0 //滑动项的下标
      }
    },
    methods: {
      touchS(e) {
        // 当手指触摸屏幕时触发
        if (e.touches.length === 1) {
          //重置展开index的数据
          this.list[this.index].style = ''
          // 记录触摸起始位置的X坐标
          this.startX = e.clientX
        }
      },
      touchM(e) {
        // 当手指在屏幕上滑动时连续地触发
        if (e.touches.length === 1) {
          //获取手指触摸的是哪一个item
          this.index = e.currentTarget.dataset.index
          //记录触摸点位置的X坐标
          let moveX = e.clientX
          //计算手指起始点的X坐标与当前触摸点的X坐标的差值
          let disX = this.startX - moveX
          //delWidth 为右侧按钮区域的宽度
          let btnWidth = this.btnWidth
          //移动距离大于0，文本层left值等于手指移动距离
          disX > 0 ? this.style = `left:-${disX}rpx` : this.style = ''
          //控制手指移动距离最大值为删除按钮的宽度
          disX >= btnWidth ? this.style = `left:-${btnWidth}rpx` : ''
          //将拼接好的样式设置到当前item中
          this.list[this.index].style = this.style
        }
      },
      touchE(e) {
        // 当手指从屏幕上移开时触发
        if (e.mp.touches.length === 0) {
          //获取手指触摸的是哪一个item
          this.index = e.currentTarget.dataset.index
          //手指移动结束后触摸点位置的X坐标
          let endX = e.mp.changedTouches[0].clientX
          let disX = this.startX - endX
          //触摸开始与结束，手指移动的距离
          let btnWidth = this.btnWidth
          disX > btnWidth / 4 ? this.style = `left:-${btnWidth}rpx` : this.style = ''
          //将拼接好的样式设置到当前item中
          this.list[this.index].style = this.style
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/common.styl"
  page {
    background-color $background-color;
  }

  .slide_cell {
    position: relative;
    box-sizing border-box;

    .slide_box {
      transition: all .5s;
      box-sizing border-box;
      background-color white;
      position: relative;
      left 0;
      width 100%;
      height 100%;
      z-index 1
    }
    .slide_btn {
      box-sizing border-box;
      position absolute;
      top: 0;
      right 0;
      height 100%;
      z-index -1;

      .del {
        display flex;
        align-items center;
        justify-content center;
        width 50px;
        height 100%;
        color white;
        background-color red;
        font-size 16px;
      }
    }
  }
</style>
