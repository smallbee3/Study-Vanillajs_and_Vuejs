import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.message = {
  NO_KEYWORDS: '추천 검색어가 없습니다'
}

KeywordView.setup = function (el) {
  this.init(el)
  // this.bindClickEvent()  // setup에서 bindClickEvent를 하지말고 DOM이 만들어진 후에 이벤트를 바인딩해야 합니다.
  return this
}

KeywordView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.message.NO_KEYWORDS
  this.bindClickEvent()
  this.show()
}

KeywordView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onClickKeyword(e))
  })
}

KeywordView.getKeywordsHtml = function (data) {
  return data.reduce((html, item, index) => {
    // html += `<li data-keyword="${item.keyword}>
    //   <span class="number">${index + 1}</span>
    //   ${item.keyword}
    // </li>`
    html += `<li data-keyword="${item.keyword}">
        <span class="number">${index + 1}</span>
        ${item.keyword}
      </li>`
    return html
  }, '<ul class="list">') + '</ul>'
}

KeywordView.onClickKeyword = function (e) {
  const { keyword } = e.currentTarget.dataset
  this.emit('@click', { keyword })
}

export default KeywordView
