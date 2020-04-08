<script>
import GxAvatar from '../Avatars/GxAvatar'
// import GxButtonCircle from '../Buttons/GxButtonCircle' // Now a global
import GxSwitch from '../Forms/GxSwitch'

export default {
  name: 'GxListItem',
  components: {
    GxAvatar,
    // GxButtonCircle,
    GxSwitch,
  },
  props: {
    hasSwitch: {
      type: Boolean,
      default: false,
    },
    listCaption: {
      type: String,
      default: '',
    },
    avatarImg: {
      type: String,
      default: '',
    },
    avatarShape: {
      type: String,
      default: 'circle',
    },
    listItemText: {
      type: String,
      default: '',
    },
    listItemIcon: {
      type: String,
      default: '',
    },
    switchValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasAvatar() {
      if (this.avatarImg !== '') {
        return true
      }
      return false
    },
    hasCaption() {
      if (this.listCaption !== '') {
        return true
      }
      return false
    },
    isReverse() {
      if (this.avatarImg === '' && this.listCaption === '') {
        return true
      }
      return false
    },
  },
}
</script>

<template>
  <div class="flex w-full mb-2">
    <GxAvatar v-if="hasAvatar" :shape="avatarShape" :avatar-img="avatarImg" />
    <div
      class="flex items-center flex-grow"
      :class="{
        'justify-between border-b ml-2 py-2': hasAvatar || hasCaption,
        'flex-row-reverse': isReverse,
      }"
    >
      <div
        :class="{ 'py-4 border-b flex-grow flex flex-row-reverse': isReverse }"
      >
        <GxSwitch v-if="isReverse && hasSwitch" v-model="switchValue" />
        <div class="flex-grow">
          <p class="gx-subtitle" :class="{ 'font-bold': hasCaption }">{{
            listItemText
          }}</p>
          <p class="gx-caption">{{ listCaption }}</p>
        </div>
      </div>
      <GxButtonCircle
        transparent
        :icon="listItemIcon"
        class="text-primary-500"
        :class="{ 'mr-2': isReverse }"
      />
    </div>
  </div>
</template>
