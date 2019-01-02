<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" v-on:keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus>
    <button v-show="inputValue.length" v-on:click="onReset" type="reset" class="btn-reset"></button>
  </form>
</template>

<script>
export default {
  // template: '#search-form',
  props: ['value'],
  data() {
    return {
      // query: ''
      // 이 query 문자열을 어디서 관리를 할 것인가를 생각해봐야 겠어요.
      // 이 FormComponent는 실제 검색어 질의어를 나타내구요.
      // 이 질이어는 직접 입력해서 검색어를 세팅할 수 있지만
      // 추천 검색어나 최근 검색어에서 클릭하게 되면 클릭한 값을 입력값으로
      // 설정해줘야 되요. 그 말은 이 query는 FormComponent가 관리하는 것 보다는
      // FormComponent의 상위객체가 관리해주는게 좋습니다.
      // 상위 객체는 app.js에서 정의한 뷰 인스턴스 겠죠.
      // 즉 vue 인스턴스의 query값을 통해서 검색폼의 input값을 관리하는게 좋습니다.
      // 그렇다라고 하면 FormComponent의 query값을 app.js의 query값으로 세팅하는
      // 방법이 필요해요. 그렇게 하기위해서 index.html의 search-form directive를 사용할 때
      // query값을 바인드 해줘야 되요.
      // <search-form v-bind:value="query"></search-form>

      inputValue: this.value
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.inputValue = newVal
    }
  },
  methods: {
    onSubmit() {
      this.$emit('@submit', this.inputValue.trim())
    },
    onKeyup() {
      if (!this.inputValue.length) this.onReset()
    },
    onReset() {
      this.inputValue = ''
      this.$emit('@reset')
    }
  }
}
</script>
