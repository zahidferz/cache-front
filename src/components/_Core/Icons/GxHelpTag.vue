<script>
export default {
  name: 'GxHelpTag',
  components: {},
  props: {
    icon: {
      type: String,
      default: 'help',
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openModal: false,
    }
  },
  watch: {
    openModal(newVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.openModal = false
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto'
  },
  methods: {
    onClick(evt) {
      if (evt.target === this.$refs.modalContainer) {
        this.openModal = false
      }
    },
    onClose() {
      this.openModal = false
    },
  },
}
</script>
<template>
  <div class="flex items-center">
    <i
      class="material-icons-round cursor-pointer sm:hover:text-primary active:text-primary iconSize"
      @click="openModal = true"
      >{{ icon }}</i
    >
    <Portal v-if="openModal" to="modal">
      <div
        class="fixed h-screen w-screen inset-y-0 inset-x-0 flex items-center justify-center"
      >
        <div class="h-screen w-screen absolute bg-black opacity-75"> </div>
        <div
          ref="modalContainer"
          class="absolute w-full overflow-auto h-full flex justify-center items-center p-4 sm:max-w-2xl"
          @click="onClick"
        >
          <div class="modal rounded-lg flex flex-col items-center">
            <GxButtonCircle
              class="text-primary self-end mr-2 mt-2"
              icon="close"
              transparent
              @click="onClose"
            />
            <p class="text-center text-black px-4 pb-4">{{ message }}</p>
          </div>
        </div>
      </div>
    </Portal>
  </div>
</template>
<style lang="scss" scoped>
.iconSize {
  font-size: 1rem;
}
.modal {
  width: 100%;
  background: var(--white);
}
</style>
