<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxListItemDetail',
  components: {
    GxAvatar,
    GxIcon,
  },
  props: {
    dateString: {
      type: String,
      default: null,
    },
    avatarImg: {
      type: String,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      noAvatar: true,
    }
  },
}
</script>

<template>
  <div>
    <li
      class="flex cursor-pointer active:bg-secondary-50 border-l py-4"
      :class="{ 'pt-0': index === 0 }"
    >
      <GxIcon icon="check_circle" class="text-success iconTransition" />
      <GxAvatar v-if="!noAvatar" class="mr-2" :avatar-img="avatarImg" />
      <div
        v-else
        :class="
          `mr-2 w-10 h-10 rounded-full flex items-center justify-center text-white gx-h5 font-bold bg-avatar-${Math.floor(
            Math.random() * 19
          )}`
        "
      >
        RP
      </div>
      <div class="flex de:items-center" :class="{ 'flex-col': $mq === 'mo' }">
        <p class="font-bold text-black text-base de:text-xs font-gothic">
          Roberto Pérez</p
        >
        <p
          class="de:gx-caption gx-caption text-gray-500 flex items-center"
          :class="{ 'ml-1': $mq === 'de' }"
        >
          <span v-if="$mq === 'de'" class="mr-1"> - </span>
          <GxIcon icon="people" class="mr-2" />
          <span>Administrador</span>
        </p>
      </div>
    </li>
  </div>
</template>

<style lang="scss" scoped>
.iconTransition {
  font-size: 1rem;
  transform: translate(-50%, 30%);
}
li:last-child {
  padding-bottom: 0;
}
</style>
