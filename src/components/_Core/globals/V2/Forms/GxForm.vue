<script>
export default {
  name: 'GxForm',
  data() {
    return {
      inputComponents: [
        'GxTextField',
        'GxTextFieldDark',
        'GxDropdown2',
        'GxAutocomplete',
      ],
      inputs: [],
    }
  },
  mounted() {
    // Get all input types in the forms tree of Vue components.
    // Make sure to traverse the tree recursively
    function getChildrenOfTypes(component, types) {
      let inputs = []
      for (let index = 0; index < component.$children.length; index++) {
        const childComponent = component.$children[index]
        if (types.includes(childComponent.$options.name)) {
          inputs.push(childComponent)
        } else {
          inputs = [...inputs, ...getChildrenOfTypes(childComponent, types)]
        }
      }
      return inputs
    }
    this.inputs = getChildrenOfTypes(this, this.inputComponents)
  },
  methods: {
    onSubmit() {
      const inputsWithErrors = []
      this.inputs.forEach((input) => {
        if (!input.isValid()) {
          inputsWithErrors.push(input)
        }
      })
      if (inputsWithErrors.length) {
        // scrollIntoView is unavaiable when testing, so avoid error
        if (inputsWithErrors[0].$el.scrollIntoView) {
          inputsWithErrors[0].$el.scrollIntoView({ behavior: 'smooth' })
          // TODO: autofocus on error
          if (inputsWithErrors[0].setFocus) {
            inputsWithErrors[0].setFocus()
          }
        }
        /* eslint-disable */
        console.log('Inputs with errors: ', inputsWithErrors)
        /* eslint-enable */
        return
      }
      this.$emit('submit')
    },
  },
}
</script>
<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>
