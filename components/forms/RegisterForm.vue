<template>
  <div class="register-form">
    <form v-show="!isPhoneSubmitted" @submit.prevent="submitPhone">
      <h1 class="register-form__title">Вход или регистрация</h1>
      <label class="register-form__label">Номер телефона</label>
      <input
        ref="phone"
        v-mask="'+7(###)###-##-##'"
        v-model.trim="$v.phone.$model"
        placeholder="+7(___)___-__-__"
        class="register-form__input"
      />
      <button :disabled="$v.phone.$error" type="submit" class="register-form__button">Продолжить</button>
      <div v-show="$v.phone.$error" class="register-form__error">
        Для продолжения введите корректный номер телефона
      </div>
      <div class="register-form__info">
        Нажимая кнопку «Продолжить», я даю согласие на обработку моих персональных данных и принимаю настоящие
        <nuxt-link to="#">Соглашения</nuxt-link>
      </div>
    </form>
    <form v-show="isPhoneSubmitted" @submit.prevent="submitCode">
      <h1 class="register-form__title">Введите код</h1>
      <div class="register-form__message">
        Мы отправили код на {{ phone }}
      </div>
      <div class="register-form__link" @click="showPhoneForm">
        Изменить
      </div>
      <div ref="digits" class="register-form__digits">
        <div
          v-for="index of [0, 1, 2, 3]"
          :key="index"
          class="register-form__digit"
        >
          <input
            type="number"
            v-model="codeDigits[index]"
            v-mask="'#'"
            @input="focusNext(index, $event)"
            @keyup.delete="focusPrev(index)"
            maxlength="1"
          />
        </div>
      </div>

      <div v-show="isCodeSubmitted" class="register-form__error register-form__error--code">
        Вы ввели неправильный код, попробуйте еще раз
      </div>
      <div v-if="isGetCodeAllowed" @click="getCode" class="register-form__repeat">
        Отправить код ещё раз
      </div>
      <div v-else class="register-form__repeat">
        Получить новый код можно через {{ seconds }} сек
      </div>
    </form>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        phone: '',
        codeDigits: ['', '', '', ''],
        isPhoneSubmitted: false,
        isCodeSubmitted: false,
        isGetCodeAllowed: false,
        seconds: 60
      }
    },
    validations: {
      phone: {
        required,
        minLength: minLength(16)
      }
    },
    watch: {
      isPhoneSubmitted(val) {
        if (val === true) {
          this.getCodeInterval = setInterval(this.tick, 1000);
          this.codeDigits = ['', '', '', ''];
          this.seconds = 60;
          this.isCodeSubmitted = false;
          this.focusDigit(0);
        } else if (this.getCodeInterval){
          clearInterval(this.getCodeInterval);
          this.focusPhone();
        } else {
          this.focusPhone();
        }
      },
      codeDigits(val) {
        if (val.join('').length === 4) {
          this.submitCode();
        }
      }
    },
    mounted() {
      this.focusPhone();
    },
    methods: {
      focusNext(index, event = {}) {
        if (event.inputType !== 'deleteContentBackward') {
          this.focusDigit(index + 1);
        }
      },
      focusPrev(index) {
        this.focusDigit(index - 1);
      },
      focusDigit(index) {
        const digits = this.$refs.digits.querySelectorAll('input');
        if (digits && digits[index]) {
          this.$nextTick(() => {
            digits[index].focus();
          });
        }
      },
      focusPhone() {
        this.$nextTick(() => {
          this.$refs.phone.focus();
        });
      },
      submitPhone() {
        // TODO: добавить AJAX отправку телефона
        this.isPhoneSubmitted = true;
      },
      submitCode() {
        // TODO: добавить AJAX отправку кода
        this.isCodeSubmitted = true;
      },
      showPhoneForm() {
        this.isPhoneSubmitted = false;
        this.phone = '';
      },
      getCode() {
        // TODO: добавить AJAX запрос нового кода
        this.isGetCodeAllowed = false;
        this.seconds = 60;
        this.codeDigits = ['', '', '', ''];
        this.focusDigit(0);
        this.getCodeInterval = setInterval(this.tick, 1000);
      },
      tick() {
        this.seconds--;
        if (this.seconds === 0) {
          this.isGetCodeAllowed = true;
          clearInterval(this.getCodeInterval);
        }
      }
    }
  }
</script>

<style lang="less">
  .register-form {
    width: 412px;

    @media(max-width: 520px) {
      width: 100%;
      min-width: 320px;
    }

    &__title {
      margin:0 0 38px;
      font-weight: 500;
      font-size: 25px;
      line-height: 20px;

      @media(max-width: 520px) {
        font-size: 22px;
      }
    }

    &__label {
      display: block;
      margin-bottom: 14px;
      font-size: 18px;
      line-height: 20px;
      color: #404040;

      @media(max-width: 520px) {
        font-size: 16px;
      }
    }

    &__message {
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 20px;
    }

    &__link {
      margin-bottom: 35px;
      font-size: 20px;
      line-height: 20px;
      color: #2F80F3;
      cursor: pointer;
    }

    &__input {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      padding: 22px 27px 23px;
      border: 1px solid #DCE4EE;
      box-sizing: border-box;
      font-size: 20px;
      line-height: 20px;
      color: #000000;

      @media(max-width: 520px) {
        font-size: 18px;
        padding: 22px 19px 23px;
      }
    }

    &__button {
      display: block;
      width: 100%;
      border: none;
      background: #2F80F3;
      color: #FFF;
      margin-bottom: 38px;
      padding: 22px 0 23px;
      box-sizing: border-box;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;

      @media(max-width: 520px) {
        font-size: 16px;
        margin-bottom: 50px;
      }

      &[disabled] {
        background: #DCE4EE;
        cursor: not-allowed;
      }
    }

    &__digits {
      display: flex;
      margin: 0 -8px 49px;
    }

    &__digit {
      padding: 0 8px;
      input {
        box-sizing: border-box;
        display: block;
        width: 100%;
        padding: 25px 0;
        font-size: 30px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #DCE4EE;
      }
    }

    &__error {
      position: absolute;
      margin-top: -36px;
      font-size: 14px;
      line-height: 20px;
      color: #DB5454;

      &--code {
        margin-top: -43px;
      }

      @media(max-width: 520px) {
        margin-top: -46px;
        font-size: 16px;
        line-height: 16px;
      }
    }

    &__repeat {
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      color: #788AA4;
      cursor: pointer;
    }

    &__info {
      font-size: 14px;
      line-height: 20px;

      a {
        color: inherit;
      }
    }
  }
</style>
