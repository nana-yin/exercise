<template>
  <div class="home">
    <mytest :title="title" :massgae="massgae" />
    <span>{{ publishedBooksMessage }}</span>
    <span>{{ fullName }}</span>
    <div class="separate">
      scss引用:
      npm install sass  --save-dev
      npm install sass-loader --save-dev
      npm install node-sass --save-dev
    </div>
    <span class="test">全局引用scss</span>
    <div>
    </div>
  </div>
</template>
<script>
import mytest from '../../components/mytest.vue'
export default {
  name: 'Menu11',
  components: {
    mytest
  },
  data() {
    return {
      title: 'title1111',
      massgae: 'message111',
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    },
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  watch: {
    search() {
      this.fetchList()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {

    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  display: block;
  border: 1px solid $color1;
  color: $color1;
}
</style>
