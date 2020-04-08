<script>
import GxAvatar from '../Avatars/GxAvatar'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxListItem',
  components: {
    GxAvatar,
    GxIcon,
  },
  props: {
    date: {
      type: String,
      default: null,
    },
    hasChevron: {
      type: Boolean,
      default: false,
    },
    chipText: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    avatarImg: {
      type: String,
      default: '',
    },
    avatarShape: {
      type: String,
      default: 'maxCircle',
    },
    title: {
      type: String,
      default: '',
    },

    subtitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasAvatar() {
      if (this.avatarImg !== '') {
        return true
      }
      return false
    },
  },
}
</script>

<template>
  <div
    class="mb-2 p-2 flex-grow flex flex-col border-b border-gray-300 active:bg-secondary-50"
    v-on="$listeners"
  >
    <p v-if="date" class="mb-2 font-bold gx-caption self-end">{{ date }}</p>
    <div class="flex">
      <div class="mr-2 self-center">
        <slot name="image">
          <GxAvatar
            v-if="hasAvatar"
            :shape="avatarShape"
            :avatar-img="avatarImg"
          />
        </slot>
      </div>
      <div class="flex-grow mr-2">
        <p class="font-bold pr-8">{{ title }}</p>
        <p class="gx-caption">{{ subtitle }}</p>
        <p class="gx-caption text-gray-500 mb-2">{{ caption }}</p>
      </div>
      <div class="flex items-center justify-center mb-2">
        <div
          class="gxTodoListItemPseudoChip gx-overline font-bold px-2 flex items-center justify-center rounded-full shadow-2 bg-secondary-200 text-white"
        >
          {{ chipText }}
        </div>
        <GxIcon v-if="hasChevron" class="ml-2" icon="chevron_right" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxTodoListItemPseudoChip {
  height: 22px;
  padding-top: 1px;
}

@media screen and (max-width: 440px) {
  .gxTodoListItemPseudoChip {
    display: none;
  }
}
</style>
