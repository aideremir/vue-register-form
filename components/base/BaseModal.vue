<template>
  <transition name="fade">
    <div v-if="isVisible" @click.self="close" class="modal">
      <div class="modal__body">
        <div @click="close" class="modal__close" title="Close">
          <close-icon class="modal__close-icon" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
  import CloseIcon from '@/assets/svg/close.svg';

  export default {
    components: {
      CloseIcon
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style lang="less">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(249, 250, 253, 0.91);
    z-index: 10;
    opacity: 1;
    transition: all 0.3s ease;

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    @media(max-width: 520px) {
      align-items: stretch;
    }

    &__body {
      position: relative;
      padding: 54px 60px 55px 48px;
      background: #FFFFFF;
      box-shadow: 0 7px 70px rgba(0, 50, 123, 0.1);

      @media(max-width: 520px) {
        width: 100%;
        padding: 52px 15px;
      }
    }

    &__close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 26px 24px;
      cursor: pointer;

      @media(max-width: 520px) {
        padding: 15px 17px;
      }
    }

    &__close-icon {
      width: 15px;
      height: 15px;
    }
  }
</style>
