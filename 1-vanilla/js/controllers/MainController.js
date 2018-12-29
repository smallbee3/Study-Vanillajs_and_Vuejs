import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

export default {
  init() {
    // console.log(tag, 'init()')
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))  // e.detail에서 input 속성으로 FormView.js에서 parameter로 전달한 값이 넘어올거예요.
      .on('@reset', e => this.onResetForm())

    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName))

    KeywordView.setup(document.querySelector('#search-keyword'))

    ResultView.setup(document.querySelector('#search-result'))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    console.log(tag, 'renderView')
    TabView.setActiveTab(this.selectedTab)

    if (this.selectedTab === '추천 검색어') {
      // KeywordModel.list().then(data => {
      //   KeywordView.render(data)
      // })
      // View를 rendering하는 곳이기 때문에 KeywordModel.js에서 data를 가져오는 코드를 아래 fetchSearchKeyword()로 분리
      this.fetchSearchKeyword()
    } else {

    }
    ResultView.hide()
  },

  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data)
    })
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
    ResultView.show()
  },

  onResetForm() {
    console.log(tag, 'onResetForm()')

    // ResultView.renderReset() // ResultView 3 - make 'renderReset' method in ResultView.js, which needs many code
    ResultView.hide()
  },

  search(query) {
    console.log(tag, 'search()', query)
    // search api
    // 1) no value
    // this.onSearchresult([])
    // 2) data from SearchModel.js (dummy data)
    SearchModel.list(query).then(data => {
      this.onSearchresult(data)
    })
  },

  onSearchresult(data) {
    ResultView.render(data)
  },

  onChangeTab(tabName) {
    debugger
  }
}
