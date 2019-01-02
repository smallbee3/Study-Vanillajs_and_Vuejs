export default {
  template: '#tabs',
  // props: ['tabs'],
  // data() {
  //   return {
  //     selectedTab: this.tabs[0]
  //   }
  // },
  // methods: {
  //   onClickTab(tab) {
  //     this.selectedTab = tab
  //     this.$emit('@change', tab)
  //   }
  // }
  props: ['tabs', 'selectedTab'],
  methods: {
    onClickTab(tab) {
      this.$emit('@change', tab)
    }
  }
}
