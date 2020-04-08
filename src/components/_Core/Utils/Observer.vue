<script>
export default {
  name: 'Observer',
  props: {
    htmlTag: {
      type: String,
      default: 'div',
    },
    rootId: {
      type: String,
      default: null,
    },
    rootMargin: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fallback: false,
      observer: null,
    }
  },
  mounted() {
    const callback = this.callback
    if (IntersectionObserver) {
      let options
      if (this.rootId) {
        const root = document.getElementById(this.rootId)
        options = {
          root,
          rootMargin: this.rootMargin ? this.rootMargin : '0px',
          threshold: 0.4,
        }
      } else {
        // body is the default root
        options = {
          root: null,
          rootMargin: this.rootMargin ? this.rootMargin : '0px',
          threshold: 0.4,
        }
      }
      if (IntersectionObserver) {
        this.observer = new IntersectionObserver(callback, options)
        this.observer.observe(this.$el)
      }
    } else {
      this.fallback = true
    }
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    callback(entries) {
      if (this.loading) {
        return
      }
      if (entries[0].intersectionRatio > 0.4) {
        this.$emit('load')
      }
    },
  },
}
</script>
<template>
  <component :is="htmlTag">
    <template v-if="fallback">
      <GxButton :loading="loading" @click="$emit('load')">Cargar más</GxButton>
    </template>
    <template v-else>
      <slot>
        <!-- <GxButton :loading="loading" style="width:50px; height:50px;"/> -->
        <div class="loading rounded-full"></div>
      </slot>
    </template>
  </component>
</template>
<style lang="scss" scoped>
@keyframes spin {
  from {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(0deg);
  }
  to {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(360deg);
  }
}

.loading {
  width: 50px;
  min-width: 50px;
  height: 50px;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 0ms;
  animation-iteration-count: infinite;
}
</style>
