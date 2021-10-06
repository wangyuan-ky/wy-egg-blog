<!--
@file: BasePage.vue
@author: 王媛
@description: 页码组件
 -->
<template>
  <div class="do-pagination">
    <el-pagination v-bind="$attrs"
                   v-on="$listeners"
                   :layout="layout"
                   :background="background"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  components: {},
  inheritAttrs: false,

  data () {
    return {
    }
  },
  props: {
    background: {
      default: true
    },
    layout: {
      default: 'total, prev, pager, next,jumper, sizes'
    }
  },
  computed: {},
  methods: {
    handlePnChange (pn) {
      this.$emit('current-change', pn)
    },
    handleSizeChange (pn) {
      this.$emit('size-change', pn)
    }
  },
  watch: {},

  created () { },
  mounted () { },
  destroyed () { }
}
</script>
