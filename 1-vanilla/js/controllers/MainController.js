import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default {
  init() {
    // console.log(tag, 'init()')
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))  // e.detail에서 input 속성으로 FormView.js에서 parameter로 전달한 값이 넘어올거예요.
      .on('@reset', e => this.onResetForm())

    TabView.setup(document.querySelector('#tabs'))

    ResultView.setup(document.querySelector('#search-result'))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    console.log(tag, 'renderView')
    TabView.setActiveTab(this.selectedTab)
    ResultView.hide()
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
  }
}
