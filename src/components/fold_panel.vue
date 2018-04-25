<template>
  <main class="panel">
    <div class="fold_panel"
         :class="selected?'fold_panel-arrow_bottom':'fold_panel-arrow_top'"
         @click="click">{{text}}
    </div>
    <slot v-if="selected"></slot>
  </main>
</template>

<script>
  export default {
    name: 'FoldPanel',
    props: {
      text: String,
      selected: Boolean
    },
    data() {
      return {
        selected: false
      }
    },
    methods: {
      click() {
        this.selected = !this.selected
      }
    }
  }
</script>

<style lang="stylus">
  @import "../stylus/fold_panel.styl";
</style>
