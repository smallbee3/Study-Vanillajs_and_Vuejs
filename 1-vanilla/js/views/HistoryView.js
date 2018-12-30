import KeywordView from './KeywordView.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(KeywordView)

HistoryView.messages.NO_KEYWORDS = '검색 이력이 없습니다'

HistoryView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onClickKeyword(e))
    li.querySelector('button').addEventListener('click', e => this.onRemoveBtn(e))
  })
}

HistoryView.getKeywordsHtml = function (data) {
  return data.reduce((html, item) => {
    html += `<li data-keyword="${item.keyword}">
        ${item.keyword}
        <span class="date">${item.date}</span>
        <button class="btn-remove" data-keyword="${item.keyword}"></button>
      </li>`
    return html
  }, '<ul class="list">') + '</ul>'
}

HistoryView.onRemoveBtn = function (e) {
  const { keyword } = e.currentTarget.dataset
  this.emit('@remove', { keyword })
  e.stopPropagation()
}

export default HistoryView
