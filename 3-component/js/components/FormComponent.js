export default {
  template: '#search-form',
  props: ['value'],
  data() {
    return {
      // query: ''
      inputValue: this.value
    }
  },
  methods: {
    onSubmit() {
      this.$emit('@submit', this.inputValue.trim())
    },
    onKeyup() {

    },
    onReset() {

    }
  }
}
