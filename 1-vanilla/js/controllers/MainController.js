import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default {
  init() {
    // console.log(tag, 'init()')
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))  // e.detail에서 input 속성으로 FormView.js에서 parameter로 전달한 값이 넘어올거예요.
      .on('@reset', e => this.onResetForm())
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
  },
  onResetForm() {
    console.log(tag, 'onResetForm()')
  }
}
