import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.setup = function (el) {
  this.init(el)
  // this.setActiveTab('추천 검색어') // My way instead of codes in MainController.js
}

TabView.setActiveTab = function (tabName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
      li.className = li.innerHTML === tabName ? 'active' : ''
  })
}

export default TabView
