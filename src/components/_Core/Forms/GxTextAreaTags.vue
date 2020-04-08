<script>
import GxChip from '@components/_Core/Chips/GxChip'

export default {
  name: 'GxTextAreaTags',
  components: {
    GxChip,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    validation: {
      type: Function,
      default: (input) => {
        const regex = /^\w+(?:\+?[.-]?\w+)*(?:\+)*@\w+(?:[.-]?\w+)*(?:\.\w{2,3})+$/
        return regex.test(input)
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tags: this.value ? this.value : [],
      inputValue: '',
    }
  },
  watch: {
    inputValue(newVal) {
      // SwiftKey keyboards automatically inject a whitespace after a .
      if (newVal.endsWith('. ')) {
        newVal = newVal.trim()
      }

      if (newVal.endsWith(',') || newVal.endsWith(' ')) {
        this.parseInputValue()
      }
    },
    tags(newVal, oldVal) {
      const validTags = newVal.filter((t) => !t.invalid)
      this.$emit('input', validTags)
      if (newVal.length < oldVal.length) return
      this.$nextTick(() => {
        this.$refs.tagInput.scrollIntoView()
      })
    },
  },
  methods: {
    parseInputValue() {
      const newTag = {
        id: Date.now(),
        value: this.inputValue.replace(/[,\s]/g, ''),
      }

      // No empty values
      if (newTag.value === '') return

      // Set tag to invalid for proper styling
      if (!this.validation(newTag.value)) {
        newTag.invalid = true
      }
      // Don't allow duplicate values

      for (let index = 0; index < this.tags.length; index++) {
        if (this.tags[index].value === newTag.value) {
          this.inputValue = ''
          newTag.invalid = true
        }
      }

      this.tags.push(newTag)
      this.inputValue = ''
    },
    removeTag(tag) {
      this.tags = [
        ...this.tags.slice(0, this.tags.indexOf(tag)),
        ...this.tags.slice(this.tags.indexOf(tag) + 1),
      ]
    },
    edit(tag) {
      this.inputValue = tag.value
      this.$refs.tagInput.focus()
      this.removeTag(tag)
    },
    onEnter(event) {
      // prevents submit events in  order to allow users to write more emails
      if (this.inputValue) {
        event.preventDefault()
      }
      this.parseInputValue()
    },
    onFocus() {
      this.$refs.tagInput.scrollIntoView()
    },
  },
}
</script>
<template>
  <label :for="_uid" class="w-full flex flex-col-reverse">
    <div>
      <span
        class="text-sm de:text-2xs de:inline-block"
        :class="{ 'text-primary': !dark, 'text-white': dark }"
        >{{ label }}
      </span>
      <div
        class="pr-2 pt-2 mt-2 de:mt-1 rounded-lg overflow-y-auto gxTextAreaHeight"
        :class="{
          'border-black': tags.length > 0,
          'text-white bg-secondary-200': dark,
        }"
      >
        <div class="flex flex-wrap tags">
          <GxChip
            v-for="tag in tags"
            :key="tag.id"
            class="mb-2 ml-2"
            :alert="tag.invalid"
            icon-right="close"
            type="button"
            @click.stop="edit(tag)"
            @click-icon-right="removeTag(tag)"
            >{{ tag.value }}</GxChip
          >
          <input
            :id="_uid"
            ref="tagInput"
            v-model="inputValue"
            :placeholder="placeholder"
            inputmode="email"
            class="text-base tracking-normal flex-grow flex-shrink pl-2 h-8 de:h-7 min-w-0 bg-transparent outline-none"
            :class="{ dark: dark }"
            @focus="onFocus"
            @blur="parseInputValue(inputValue)"
            @keydown.stop.enter="onEnter"
          />
        </div>
      </div>
    </div>
  </label>
</template>
<style lang="scss" scoped>
/* stylelint-disable */

.gxTextAreaHeight {
  min-height: 7.25rem;
  max-height: 9rem;
}

input.dark,
input.dark::placeholder,
input.dark::-webkit-input-placeholder {
  color: var(--white);
}

@screen de {
  input,
  input::-webkit-input-placeholder {
    font-size: 0.75rem;
  }
}
</style>
