<script>
  export default {
    created () {

    }
  }
</script>

<style lang="stylus">
  @import "stylus/index.styl"

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

    color: DodgerBlue;
    transform: translate(-50%, -50%) scale(1);
  }
</style>
