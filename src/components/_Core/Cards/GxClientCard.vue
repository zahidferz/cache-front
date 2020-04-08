<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxClientCard',
  components: {
    GxAvatar,
    GxIcon,
  },
  props: {
    commercialName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      default: '',
    },
    taxId: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    recientActivityStatus: {
      type: Number,
      default: 1,
    },
    showIconEye: {
      type: Boolean,
      default: false,
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    colorNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showIcon: false,
    }
  },
  computed: {
    avatarInitials() {
      const splitName = this.commercialName.split(' ')
      if (splitName.length > 1) {
        const firstInitial = splitName[0].split('')[0]
        const secondInitial = splitName[1].split('')[0]
        return `${firstInitial}${secondInitial}`
      } else {
        return splitName[0].slice(0, 2)
      }
    },
  },
  methods: {
    mouseOver() {
      if (this.showIconEye) {
        this.showIcon = true
      }
    },
    mouseLeave() {
      if (this.showIconEye) {
        this.showIcon = false
      }
    },
  },
}
</script>
<template>
  <div
    class="flex gxOutter p-4 de:hover:bg-gray-200 de:active:bg-secondary-50"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    v-on="$listeners"
  >
    <GxAvatar
      v-if="avatarUrl"
      class="rounded-full flex-shrink-0 relative mr-4 gxClientCardMo"
      :avatar-img="avatarUrl"
    >
      <div
        class="absolute w-3 h-3 border border-white rounded-full bottom-0 right-0"
        :class="{
          'bg-success': recientActivityStatus === 1,
          'bg-pending': recientActivityStatus === 2,
          'bg-alert': recientActivityStatus === 3,
        }"
      ></div>
    </GxAvatar>
    <div
      v-if="!avatarUrl"
      :class="
        `gxClientCardMo relative rounded-full mr-4 flex flex-shrink-0 items-center justify-center text-white gx-h5 font-bold bg-avatar-${colorNumber}`
      "
    >
      <div
        class="absolute w-3 h-3 border border-white rounded-full bottom-0 right-0"
        :class="{
          'bg-success': recientActivityStatus === 1,
          'bg-pending': recientActivityStatus === 2,
          'bg-alert': recientActivityStatus === 3,
        }"
      ></div>
      <span class="uppercase">{{ avatarInitials }}</span>
    </div>
    <div class="overflow-hidden flex flex-col flex-grow ">
      <p class="de:mb-1 truncate max-w-full">{{ commercialName }}</p>
      <p v-if="businessName" class="de:mb-1 truncate max-w-full">{{
        businessName
      }}</p>
      <div class="flex">
        <p>{{ taxId }}</p>
        <button class="ml-auto text-gray-500 z-1" @click.stop="iconClickHandler"
          ><GxIcon v-if="showIcon && showIconEye" icon="remove_red_eye"
        /></button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.gxClientCardMo {
  width: 2.875rem;
  height: 2.875rem;
}
.gxOutter:focus-within {
  background-color: var(--gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
}
</style>
