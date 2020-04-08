<script>
export default {
  name: 'GxChip',
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    alert: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    class="
    h-8
    de:h-7
    flex justify-center items-center
    px-4
    de:px-2
    rounded-full
    truncate
    max-w-full
    bg-secondary-50 text-secondary-300
   "
    :class="{
      'float-left flex non-clickable': !clickable,
      'sm:hover:bg-secondary-200 sm:hover:text-white active:text-whit e focus:text-white':
        !disabled && clickable,
      'text-gray-500 bg-gray-300 cursor-not-allowed': disabled,
      'active:text-white focus:bg-secondary-300 active:bg-secondary-300':
        !alert && clickable,
      'bg-alert text-white': alert,
    }"
    :disabled="disabled"
    v-on="$listeners"
  >
    <i
      v-if="iconLeft"
      data-testid="gxChipiconLeft"
      class="text-base de:text-xs material-icons-round mr-1"
      @click.stop="$emit('click-icon-left')"
      >{{ iconLeft }}</i
    >
    <span class="text-base de:text-xs truncate tracking-normal"
      ><slot></slot
    ></span>
    <i
      v-if="iconRight"
      data-testid="gxChipiconRight"
      class="text-base de:text-xs material-icons-round ml-1"
      @click.stop="$emit('click-icon-right')"
      >{{ iconRight }}</i
    >
  </component>
</template>
<style lang="scss" scoped>
.gxChipiconLeft {
  position: relative;
  top: 1px;
  // Compensate for trim area in material icons
  left: -3px;
  font-size: 1rem;
}
.gxChipiconRight {
  position: relative;
  top: 1px;
  // Compensate for trim area in material icons
  right: -3px;
  font-size: 1rem;
}

.gxChipContainer {
  min-height: 2rem;
}

.non-clickable {
  min-width: 88px;
}

@screen de {
  .gxChipiconLeft {
    top: -1px;
    font-size: 0.625rem;
  }
  .gxChipiconRight {
    top: -1px;
    font-size: 0.625rem;
  }
  .gxChipText {
    position: relative;
    // top: -2px;
    padding-top: 0;
    font-size: 0.625rem;
  }
  .gxChipContainer {
    height: 1.625rem;
    margin-bottom: 0.25rem;
  }
}
</style>
