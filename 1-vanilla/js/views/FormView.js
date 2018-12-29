import View from './View.js'

const tag = '[FormView]'  // 디버깅을 위한 태그

const FormView = Object.create(View)  // Object.create 함수로 View 객체를 복사

FormView.setup = function (el) {  // HTML element를 주입 받아서 내부적으로 그것을 속성으로 갇게 하는 것
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.resetEl = el.querySelector('[type=reset]')
  this.showResetBtn(false)
  this.bindEvents()
  return this // MainController.js에서 체인메서드 '.on'을 구현하기위해서 this를 return 해야함.
}

FormView.showResetBtn = function (show = true) {
  this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function () {
  this.on('submit', e => e.preventDefault())  //
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e)) // inputEl가 HTML element이기 때문에 addEventListener 함수를 쓸 수 있음
  this.resetEl.addEventListener('click', e => this.onClickReset(e))
}

FormView.onKeyup = function (e) {
  const enter = 13
  this.showResetBtn(this.inputEl.value.length)  // 입력한 문자열이 있을 경우에만 버튼이 나타남
  if (!this.inputEl.value.length) return this.emit('@reset')
  if (e.keyCode !== enter) return
  this.emit('@submit', {input: this.inputEl.value}) // View 모듈에 있는 emit이라는 메서드 이용, 우리가 정의할 @submit이라는 메서드, parameter로는 방금 입력한 값
} // @submit -> 커스텀인 것을 표시하기 위해서 '@'을 붙임 (문자열이라서 상관 없음)

FormView.onClickReset = function (e) {
  this.emit('@reset')
  this.showResetBtn(false)
}

FormView.setValue = function (value = '') {
  this.inputEl.value = value
  // this.showResetBtn(true)
  this.showResetBtn(this.inputEl.value.length) // 좀 더 확실하게(안전하게) 하기 위해서 true 대신 length값을 전달
}

export default FormView
