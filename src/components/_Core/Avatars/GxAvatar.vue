<script>
export default {
  name: 'GxAvatar',
  props: {
    shape: {
      type: String,
      default: 'circle',
    },
    avatarImg: {
      type: String,
      default: '',
    },
    fontStyles: {
      type: String,
      default: '',
    },
  },
  computed: {
    imageClasses() {
      switch (this.shape) {
        case 'bigSquare':
        case 'square':
        case 'horizontal':
          return `rounded-lg`
        default:
          return `rounded-full`
      }
    },
    containerClasses() {
      switch (this.shape) {
        case 'bigSquare':
          return `w-20 h-20`
        case 'square':
          return `w-14 h-14`
        case 'horizontal':
          return `w-28 h-16`
        case 'maxCircle':
          return `w-14 h-14 rounded-full`
        case 'circle':
          return `w-11 h-11 rounded-full`
        case 'miniAvatar':
          return `w-6 h-6 rounded-full`
        default:
          return ''
      }
    },
  },
}
</script>

<template>
  <div :class="containerClasses" v-on="$listeners">
    <img
      v-if="avatarImg"
      class="w-full h-full flex justify-center items-center bg-white"
      :class="imageClasses"
      :src="avatarImg"
    />
    <div
      v-else
      class="bg-center bg-cover w-full h-full flex justify-center items-center"
      :class="imageClasses"
      :style="`background-image: url(${avatarImg}); ${fontStyles}`"
    >
      <slot />
    </div>
    <template v-if="avatarImg">
      <slot />
    </template>
  </div>
</template>
