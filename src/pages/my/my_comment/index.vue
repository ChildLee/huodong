<template>
  <main>
    <div class="tab">
      <div class="tab_box tab-fixed">
        <div class="tab_item" :class="currentTab==0?'tab_item-selected':''" @click="switchNav(0)">
          <div class="tab_title">给出的评价</div>
        </div>
        <div class="tab_item" :class="currentTab==1?'tab_item-selected':''" @click="switchNav(1)">
          <div class="tab_title">收到的评价</div>
        </div>
      </div>
    </div>

    <div class="comment_filter panel">
      <div>总计：17（筛选总数）</div>
      <div class="btn btn-small btn-warn">筛选</div>
    </div>

    <div class="comment_box border_line panel">
      <div class="comment_score" @click="attention">
        <span>5分</span>
        <i class="icon"
           :style="isAttention?'color:red;':''"
           :class="isAttention?'icon-red-heart':'icon-heart'"></i>
      </div>
      <div class="comment_info">
        <div class="comment_time_location">
          <div class="comment_time">2018-8-8 9:00</div>
          <div class="comment_location">深圳高新园深圳高新园深圳高新园深圳高新园深圳高新园</div>
          <div class="comment_btn btn btn-mini">投诉信息</div>
        </div>
        <div class="field comment_text">
          <div class="field_left comment_name">
            张三：
            <div></div>
            (主持人)
          </div>
          <div class="field_right">主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃主持气氛很活跃！</div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        currentTab: 0, // tab当下标
        isAttention: false
      }
    },
    methods: {
      switchNav(tab) {
        if (this.currentTab === tab) return false
        this.currentTab = tab
      },
      attention() {
        this.isAttention = !this.isAttention
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/common.styl";

  page {
    background-color: $background-color;
  }

  .comment_filter {
    display flex;
    justify-content space-between;
    align-items center;
    padding 5px 15px;
    font-size 14px;
    color: $text-color
  }

  .comment_box {
    display flex;
    padding: 5px 15px;
    font-size 14px;

    .comment_score {
      flex none;
      align-self center;
      text-align center;
    }
    .comment_info {
      flex 1;
      margin-left 5px;

      .comment_time_location {
        display flex;
        justify-content space-between;
        align-items center;
        font-size: 12px;
        color: #999999;

        .comment_time {
          flex none;
        }

        .comment_location {
          flex 1 0 0;
          width 0;
          margin-left 5px;
          white-space nowrap;
          overflow hidden;
          text-overflow ellipsis;
        }

        .comment_btn {
          flex none;
        }
      }
    }

    .comment_text {
      padding 0;

      .comment_name {
        text-align center;
      }
    }
  }
</style>
