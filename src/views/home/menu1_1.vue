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
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      class Node {
        constructor(id) {
          // id = 0,1,2...
          this.id = id
          this.neighbors = new Set()
        }
        connect(node) {
          console.log('4', node, this)
          if (node !== this) {
            this.neighbors.add(node)
            node.neighbors.add(this)
          }
        }
      }
      class RandomGraph {
        constructor(size) {
          // size = 6
          this.nodes = new Set()
          // 创建节点
          for (let i = 0; i < size; ++i) {
            this.nodes.add(new Node(i))
          }
          // 随机连接节点
          const threshold = 1 / size
          for (const x of this.nodes) {
            for (const y of this.nodes) {
              if (Math.random() < threshold) {
                x.connect(y)
              }
            }
          }
        }
        // 这个方法仅用于调试
        // print() {
        //   for (const node of this.nodes) {
        //     const ids = [...node.neighbors]
        //       .map((n) => n.id)
        //       .join(',')
        //     console.log(`${node.id}: ${ids}`)
        //   }
        // }
      }
      const g = new RandomGraph(6)
      console.log(g)
      // g.print()
    }
  }
}
</script>
