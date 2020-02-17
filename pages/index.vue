<template>
  <div class="index-page">
    <button @click="showModal" class="index-page__button">
      Регистрация или вход
    </button>
    <portal to="modal">
      <register-form />
    </portal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import RegisterForm from '~/components/forms/RegisterForm.vue'

export default {
  components: {
    RegisterForm
  },
  methods: {
    ...mapMutations('modal', ['showModal'])
  }
}
</script>

<style lang="less">
  .index-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &__button {
      display: block;
      border: none;
      background: #2F80F3;
      color: #FFF;
      padding: 22px;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
