<template>
  <div class="home">
    <mytest :title="title" :massgae="massgae" />
    <span>{{ publishedBooksMessage }}</span>
    <span>{{ fullName }}</span>
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
  }
}
</script>
