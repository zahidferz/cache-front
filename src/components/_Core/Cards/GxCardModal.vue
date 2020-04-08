<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxChip from '@components/_Core/Chips/GxChip'
import GxModal from '@components/_Core/Modals/GxModal'
export default {
  name: 'GxCardModal',
  components: {
    GxCardCore,
    GxChip,
    GxModal,
  },
  props: {
    delayAnimation: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    cardImg: {
      type: String,
      default: null,
    },
    headline: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    textBody: {
      type: String,
      default: '',
    },
    bodyBold: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => {
        return []
      },
    },
    subtitle: {
      type: String,
      default: '',
    },
    chips: {
      type: Array,
      default: () => {
        return []
      },
    },
    alt: {
      type: String,
      default: '',
    },
  },
  computed: {
    subscriptionError() {
      return (
        this.headline === 'Tu cuenta está cancelada' ||
        this.headline === 'La compañía no existe'
      )
    },
  },
  methods: {
    onClose() {
      if (this.subscriptionError) {
        return
      }
      this.$emit('close')
    },
  },
}
</script>
<template>
  <GxModal
    :loading="loading"
    :delay-animation="delayAnimation"
    @close="onClose"
  >
    <transition name="grow" appear>
      <GxCardCore
        :class="{ 'de:pb-6': $slots.actions }"
        class="flex flex-col p-4 de:white w-82 de:w-108 de:p-8"
        :loading="loading"
        v-on="$listeners"
      >
        <div class="flex justify-center mb-4 de:mb-4">
          <img
            :src="subscriptionError ? $utils.alertImages.Dissapointed : cardImg"
            :alt="alt"
            width="176"
            height="176"
            class="gxCardImage"
          />
        </div>
        <div class="text-center">
          <h2
            class="gx-h3 text-black de:text-black font-bold"
            :class="{ 'gx-h4': $mq === 'de' }"
          >
            <slot name="headline">{{ headline }}</slot>
          </h2>
          <p class="gx-caption de:text-black">{{ caption }}</p>
          <div class="flex">
            <div v-for="(tag, index) in tags" :key="index">
              <p class="gx-caption font-bold mr-1">{{ tag }}</p>
            </div>
          </div>
          <slot name="body">
            <p class="mt-4 de:text-black text-center break-words">{{
              subscriptionError
                ? 'Si necesitas ayuda contáctanos en el chat'
                : textBody
            }}</p>
            <p v-if="subtitle" class="mb-2">{{ subtitle }}</p>
          </slot>
          <div v-if="chips" class="flex mb-2">
            <GxChip
              v-for="chip in chips"
              :key="chip.id"
              class="mr-2"
              :disabled="chip.disabled"
              @click="chip.clickHandler"
              >{{ chip.text }}</GxChip
            >
          </div>
        </div>
        <slot v-if="!subscriptionError" name="actions" />
        <div v-else class="flex justify-end mt-4">
          <GxButton plain @click.stop="$router.push({ name: 'logout' })"
            >ENTENDIDO</GxButton
          >
        </div>
      </GxCardCore>
    </transition>
  </GxModal>
</template>
<style lang="scss" scoped>
// .gxCardImage::before {
//   display: block;
//   padding-top: 56.25%;
//   content: '';
// }
.gxCardImage {
  max-height: 200px;
}
.grow-enter-active {
  animation: grow 0.5s;
}
.grow-leave-active {
  animation: grow 0.5s reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
