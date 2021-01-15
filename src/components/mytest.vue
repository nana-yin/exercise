<template>
  <div>
    <!-- 组件内未被注册的属性将作为普通html元素属性被渲染 -->
    <div>这是个h1标题{{ title }}</div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    }
  }, // 组件将不会把未被注册的props呈现为普通的HTML属性
  data() {
    return {
      mag: '111'
    }
  },
  created() {
    console.log(this.$attrs) // 通过其$attrs可以获取到没有使用的注册属性
  }
}
</script>
