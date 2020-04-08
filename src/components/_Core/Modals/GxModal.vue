<script>
export default {
  props: {
    delayAnimation: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    overflowVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  created() {
    document.documentElement.style.overflow = 'hidden'

    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    }
    const clickHandler = (evt) => {
      const modalContainer = document.getElementById('modalSlotContainer')
      if (modalContainer && !modalContainer.contains(evt.target)) {
        this.$emit('close')
      }
    }
    document.addEventListener('keydown', escapeHandler)
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
      document.removeEventListener('click', clickHandler)
    })
  },
  mounted() {
    // Stop touch event in ordert to avoid  display drawer in case the modal is open
    this.$nextTick(() => {
      const stopTouchpropagation = (evt) => evt.stopImmediatePropagation()
      const modalRoot = document.getElementById('modalRoot')
      modalRoot.addEventListener('touchmove', stopTouchpropagation)
      modalRoot.addEventListener('touchend', stopTouchpropagation)
      this.$once('hook:beforeDestroy', () => {
        modalRoot.removeEventListener('touchmove', stopTouchpropagation)
        modalRoot.removeEventListener('touchend', stopTouchpropagation)
      })
    })
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto'
  },
}
</script>

<template>
  <Portal to="modal">
    <transition :name="delayAnimation ? 'fade-delay' : 'fade'" appear>
      <div
        id="modalRoot"
        class="fixed  h-screen w-screen inset-y-0 inset-x-0 flex items-center justify-center z-50"
      >
        <div class="h-screen w-screen absolute bg-black  opacity-80"> </div>
        <!-- Horizontal padding added to display shadows and borders -->
        <div
          id="modalSlotContainer"
          ref="modalContainer"
          class="gxModalContainer px-4 absolute flex items-center py-4"
          :class="{
            'overflow-auto': !loading,
            'overflow-visible': overflowVisible,
          }"
        >
          <slot />
        </div>
      </div>
    </transition>
  </Portal>
</template>

<style lang="scss">
/* stylelint-disable */
.gxModalContainer {
  // height: calc(100% - 2rem);
}
.gxModalDesk {
  width: 27rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-delay-enter-active,
.fade-delay-leave-active {
  transition: opacity 0.2s 0.3s;
}
.fade-delay-enter,
.fade-delay-leave-to,.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
