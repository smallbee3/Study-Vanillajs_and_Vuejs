import View from './View.js'

const tag = '[FormView]'  // 디버깅을 위한 태그

const FormView = Object.create(View)  // Object.create 함수로 View 객체를 복사

FormView.setup = function (el) {  // HTML element를 주입 받아서 내부적으로 그것을 속성으로 갇게 하는 것
  this.init(el)
  this.inputEL = el.querySelector('[type=text]')
  this.resetEL = el.querySelector('[type=reset]')
  this.showResetBtn(false)
  this.bindEvents()
  return this // MainController.js에서 체인메서드 '.on'을 구현하기위해서 this를 return 해야함.
}

FormView.showResetBtn = function(show = true) {
  this.resetEL.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
  this.on('submit', e => e.preventDefault())  //
  this.inputEL.addEventListener('keyup', e => this.onKeyup(e)) // inputEL가 HTML element이기 때문에 addEventListener 함수를 쓸 수 있음
}

FormView.onKeyup = function(e) {
  const enter = 13
  this.showResetBtn(this.inputEL.value.length)  // 입력한 문자열이 있을 경우에만 버튼이 나타남
  if (e.keyCode !== enter) return
  this.emit('@submit', {input: this.inputEL.value}) // View 모듈에 있는 emit이라는 메서드 이용, 우리가 정의할 @submit이라는 메서드, paramter로는 방금 입력한 값
} // @submit -> 커스텀인 것을 표시하기 위해서 '@'을 붙임 (문자열이라서 상관 없음)

export default FormView