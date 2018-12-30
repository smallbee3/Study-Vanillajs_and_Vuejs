import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

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
      .on('@click', e => this.onClickKeyword(e.detail.keyword))

    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click', e => this.onClickHistory(e.detail.keyword))
      .on('@remove', e => this.onRemoveHistory(e.detail.keyword))

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
      HistoryView.hide()
    } else {
      this.fetchSearchHistory()
      KeywordView.hide()
    }
    ResultView.hide()
  },

  fetchSearchKeyword() {
    KeywordModel.list().then(data => {
      KeywordView.render(data)
    })
  },

  fetchSearchHistory() {
    HistoryModel.list().then(data => {
      // HistoryView.render(data)
      HistoryView.render(data).bindRemoveBtn()
                        // 왜 여기서 bindRemoveBtn을 호출을 하냐면 render 함수가 호출되면 data를 기반으로 DOM이 생성되고
                        // 그리고 나서 이벤트를 바인딩 할 수 있기 때문에 체이닝을 이용함
                        // -> 체이닝 하려면 render 함수가 this를 리턴해야되요.
                        //    이 render는 HistoryView를 복사해온 KeywordView에 있어요.
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
    // ResultView.hide()
    this.renderView()   // 기존에 onResetForm이 단순히 ResultView를 가리는 역할만 수행. -> 초기에 있던 TabView와 KeywordView를 보여주는 부분까지 같이
  },

  search(query) {
    console.log(tag, 'search()', query)
    // FormView.inputEl.value = keyword
    FormView.setValue(query)

    // search api
    // 1) no value
    // this.onSearchresult([])
    // 2) data from SearchModel.js (dummy data)
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
  },

  onSearchResult(data) {
    TabView.hide()
    KeywordView.hide()
    HistoryView.hide()
    ResultView.render(data)
  },

  onChangeTab(tabName) {
    this.selectedTab = tabName
    this.renderView()
  },

  onClickKeyword(keyword) {
    this.search(keyword)
  },

  onClickHistory(keyword) {
    this.search(keyword)
  },

  onRemoveHistory(keyword) {
    HistoryModel.remove(keyword)
    this.renderView()
  }
}
