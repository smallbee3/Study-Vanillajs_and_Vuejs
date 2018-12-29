import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.tabNames = {
  recommend: '추천 검색어',
  recent: '최근 검색어'
}

TabView.setup = function (el) {
  this.init(el)
  // this.setActiveTab('추천 검색어') // My way instead of codes in MainController.js
  this.bindClick()
  return this
}

TabView.setActiveTab = function (tabName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
      li.className = li.innerHTML === tabName ? 'active' : ''
  })
}

TabView.bindClick = function () {
  Array.from(this.el.children).forEach(li => {
    // li.addEventListener('click', e => this.setActiveTab(li.innerHTML)) // My way - Didn't care about sedning event to Controller.js
    li.addEventListener('click', e => this.onClick(li.innerHTML))
  })
}

TabView.onClick = function (tabName) {
  this.setActiveTab(tabName)
  this.emit('@change', {tabName})
}

export default TabView
