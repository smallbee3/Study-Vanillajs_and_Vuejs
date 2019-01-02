export default {
  template: '#list',
  props: ['data', 'type'],
  methods: {
    onClickList(keyword) {
      this.$emit('@click', keyword)
    },
    onClickRemoveList(keyword) {
      this.$emit('@remove', keyword)
    }
  }
}
