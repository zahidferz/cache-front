<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'SaleInternalNote',
  components: {
    GxIcon,
  },
  props: {
    history: {
      type: Object,
      required: true,
    },
    saleNumber: {
      type: Number,
      required: true,
    },
    parsedDate: {
      type: String,
      required: true,
    },
    initals: {
      type: String,
      required: true,
    },
  },
}
</script>
<template>
  <div
    class="w-full flex pl-2 pt-4 pr-4 border-l-8 border-primary-600 overflow-hidden"
  >
    <div class="flex">
      <div
        :class="[`bg-avatar-${history.color}`]"
        style="width:2.875rem;height: 2.875rem;font-size:1.5rem"
        class="flex items-center justify-center rounded-full"
      >
        <GxIcon class="text-white" icon="message" />
      </div>
    </div>
    <div class="pl-2 flex flex-col overflow-hidden">
      <p>{{ history.movement }}</p>
      <div class="mt-4 w-full flex items-center overflow-hidden flex-shrink-0">
        <div
          :class="[`bg-avatar-${history.color}`]"
          class="rounded-full flex-shrink-0 w-4 h-4 flex justify-center  items-center"
        >
          <img
            v-if="history.image"
            :src="history.image"
            class="w-4 h-4 rounded-full"
          />
          <p
            v-else
            style="font-size:8px"
            class="uppercase leading-none text-white font-xs uppercase"
            >{{ initals }}</p
          >
        </div>
        <p
          class="ml-2 gx-subtitle leading-4 truncate flex-shrink-0 tracking-normal flex-grow w-2/5"
        >
          <span class="font-bold capitalize">{{
            history.fullName.toLowerCase()
          }}</span>
          dejó un comentario en
          <span class="font-bold">VE-{{ saleNumber }}</span>
        </p>
      </div>
      <p class="my-4 gx-caption de:gx-caption text-gray-500">
        {{ parsedDate }}
      </p>
    </div>
  </div>
</template>
