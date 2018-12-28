import View from './View.js'

const tag = '[FormView]'  // 디버깅을 위한 태그

const FormView = Object.create(View)  // Object.create 함수로 View 객체를 복사

FormView.setup = function (el) {  // HTML element를 주입 받아서 내부적으로 그것을 속성으로 갇게 하는 것
  this.init(el)
  this.inputEL = el.querySelector('[type=text]')
  this.resetEL = el.querySelector('[type=reset]')
  this.showResetBtn(false)
}

FormView.showResetBtn = function(show = true) {
  this.resetEL.style.display = show ? 'block' : 'none'
}

export default FormView
