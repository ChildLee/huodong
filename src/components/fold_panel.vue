<template>
  <main>
    <div class="panel">
      <div class="fold_panel"
           :class="fold_selected?'fold_panel-arrow_bottom':'fold_panel-arrow_top'"
           @click="fold">{{text}}
      </div>
      <slot v-if="fold_selected"></slot>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'FoldPanel',
    props: {
      text: String,
      fold_selected: Boolean
    },
    data() {
      return {
        fold_selected: false // 滑动单元格是否展开
      }
    },
    methods: {
      fold() {
        this.fold_selected = !this.fold_selected
      }
    }
  }
</script>

<style lang="stylus">
  @import "../stylus/fold_panel.styl";
</style>
