import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default {
  init() {
    // console.log(tag, 'init()')
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))  // e.detail에서 input 속성으로 FormView.js에서 parameter로 전달한 값이 넘어올거예요.
      .on('@reset', e => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'))
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },

  onResetForm() {
    console.log(tag, 'onResetForm()')
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
