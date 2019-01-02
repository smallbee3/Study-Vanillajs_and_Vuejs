import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    // selectedTab: '추천 검색어', // -> 이렇게 하면 코드가 중복이니까요. Vue 인스턴스가 생성될 때 tabs 배열의 0번 인덱스로 설정하면 될 것 같아요
    selectedTab: '',
    keywords: [],
    searchResult: []
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
  },
  methods: {
    onSubmit(e) {
      // e.preventDefault() // -> vanilla.js 방식
      // index.html에서 v-on:submit.prevent="onSubmit" -> vue.js 방식
      this.search()
    },
    onKeyup(e) {
      if (!this.query.length) this.resetForm()
    },
    onReset(e) {
      this.resetForm()
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.search()
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true
        this.searchResult = data
      })
    },
    resetForm() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    }
  }
})
