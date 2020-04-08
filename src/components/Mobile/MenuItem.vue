<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'MenuItem',
  components: { GxIcon },
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    statusText: {
      type: [String, Number],
      default: null,
    },
    statusIcon: {
      type: String,
      default: null,
    },
    statusIconColor: {
      type: String,
      default: 'text-white',
    },
    background: {
      type: String,
      default: null,
    },
    to: {
      type: Object,
      required: true,
    },
    todos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      company: null,
    }
  },
  computed: {
    todosWithItems() {
      if (this.todos) {
        const todosWithItems = this.todos.filter(({ items }) => {
          return items.length > 0
        })
        return todosWithItems.length
      }
      return null
    },
    computedText() {
      if (this.statusText) {
        return this.statusText
      }
      if (this.to.name === 'todos' && this.todos) {
        return this.todosWithItems > 99 ? '+99' : this.todosWithItems
      }
      return ''
    },
    active() {
      if (this.to.query) {
        return !!(
          JSON.stringify(this.to.query) === JSON.stringify(this.$route.query)
        )
      }
      return !!(
        this.$route.name === this.to.name ||
        (this.$route.meta.father === this.to.name &&
          !this.$route.meta.isSubmenu)
      )
    },
  },
}
</script>
<template>
  <RouterLink
    :to="to"
    tag="li"
    :class="{
      'border-b-4 border-primary-500 ': active,
      'border-b-4 border-transparent': !active,
    }"
    class="flex relative flex-auto text-2xl flex-col justify-center items-center menu-item bg-transparent"
    :data-testid="title.replace(' ', '')"
  >
    <GxIcon
      :icon="icon"
      :class="{ 'text-primary-500': active, 'text-gray-700': !active }"
      style="font-size:1.5rem"
    />
    <div
      v-if="computedText && !statusIcon"
      :class="[background]"
      class="section-status flex items-center justify-center border-white border text-center flex justify-center items-center leading-none  font-bold text-white  absolute rounded-full top-0 right-0"
    >
      <div
        v-if="todosWithItems > 99"
        style="width:4px; height:4px"
        class="rounded-full bg-white"
      >
      </div>
      <span v-else> {{ todosWithItems }}</span>
    </div>
    <span
      v-if="statusIcon && !computedText"
      :class="[background]"
      class="section-status  text-center flex justify-center items-center leading-none  font-bold text-white bg-alert absolute rounded-full top-0 right-0"
    >
      <GxIcon
        :class="[statusIconColor]"
        :icon="statusIcon"
        style="font-size:0.875rem"
      />
    </span>
    <p
      class="my-1 w-full text-center leading-none label-menu"
      :class="{ 'font-bold': active }"
      >{{ title }}</p
    >
  </RouterLink>
</template>
<style lang="scss" scoped>
.menu-item {
  max-width: 4.25rem;
  height: 2.875rem;
}
.label-menu {
  font-size: 10px;
}
.section-status {
  right: 0;
  left: 0;
  width: 14px;
  height: 14px;
  margin: 0 auto;
  font-size: 8px;
  transform: translateX(50%);
}
.list-demo-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.list-demo-enter-active {
  transition: all 0.3s 0.3s ease-out;
}
.list-demo-leave-active {
  position: absolute;
}
.list-demo-leave-to {
  opacity: 0;
}
.list-demo-move {
  transition: transform 0.3s 0s ease-in;
}
</style>
