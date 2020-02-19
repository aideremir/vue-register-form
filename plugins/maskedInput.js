import Vue from 'vue'
import MaskedInput from 'vue-masked-input';

const vueMaskedInput = {
  install(Vue) {
    Vue.component('masked-input', MaskedInput)
  },
}
Vue.use(vueMaskedInput)
export default vueMaskedInput
