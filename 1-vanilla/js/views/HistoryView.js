import KeywordView from './KeywordView.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(KeywordView)

HistoryView.setup = function (el) {
  this.init(el)
  return this
}

export default HistoryView
