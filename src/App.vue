<script>
  import {userStore} from './store'

  export default {
    beforeCreate() {
      //$app属性还没有生成,只能引用store
      userStore.dispatch('userStatus').then()
    }
  }
</script>

<style lang="stylus">
  @import "stylus/index.styl"

  page {
    font-size 16px;
  }

  /*radio默认样式重置*/
  radio .wx-radio-input {
    border-radius: 0;
    border: 1px solid #999 !important;
    background: none !important;
  }

  radio .wx-radio-input .wx-radio-input-checked {
  }

  radio .wx-radio-input.wx-radio-input-checked::before {
    font-family: "icon" !important;
    font-size: 16px;
    font-style: normal;
    content: '\e650'

    color: #1D9ED7;
    transform: translate(-50%, -50%) scale(1);
  }

  /*课程项*/
  .course {
    background-color #fff;
    .course_box {
      padding: 15px;
      display: flex;
      .course_box-img {
        width: 80px;
        height: 80px;
      }
      .course_box-text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 5px;
        flex: 1;
        .course_box-class {
          font-size: 16px;
          color: #333;
        }
        .course_box-course,
        .course_box-school {
          font-size: 12px;
          color: #797979;
        }
      }
      .course_box-other {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        .course_box-btn-study {
          font-size 14px;
          color: white;
          border-radius: 5px;
          padding: 6px 10px;
          background-color: #21afa9;
        }
        .course_box-price {
          font-size: 14px;
          color: red;
        }
        .course_box-blank {
          height: 1em;
        }
        .course_box-share {
          font-size: 12px;
          color: #bcbcbc;
        }
      }
    }
  }

</style>
