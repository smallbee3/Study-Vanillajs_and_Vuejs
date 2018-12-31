new Vue({
  el: '#app',
  data: {
    query: ''
  },
  methods: {
    onSubmit(e) {
      // e.preventDefault() // -> vanilla.js 방식
      // index.html에서 v-on:submit.prevent="onSubmit" -> vue.js 방식
    }
  }
})
