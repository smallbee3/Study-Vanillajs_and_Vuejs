import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.messages = {
  NO_RESULT: '검색 결과가 없습니다'
}

ResultView.setup = function (el) {
  this.init(el)
}

ResultView.render = function (data = []) {
  console.log(tag, 'render()', data)
  this.el.innerHTML = data.length ? this.getSearchResultHtml(data) : '검색 결과가 없습니다'
  this.show()
}

// ResultView 3 - My answer (called in MainController.js)
// ResultView.renderReset = function () {
//   console.log(tag, 'renderReset()')
//   this.el.innerHTML = ''
// }

ResultView.getSearchResultHtml = function (data) {
    // debugger
    return data.reduce((html, item) => {
      // console.log('html:', html, '\n', 'item: ', item)
      html += this.getSearchItemHtml(item)
      return html
    }, '<ul>') + '</ul>'
}

ResultView.getSearchItemHtml = function (item) {
    return `<li>
      <img src="${item.image}">
      <p>${item.name}</p>
    </li>`
  }

export default ResultView
