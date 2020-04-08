<script>
import gql from 'graphql-tag'
import { UPDATE_USER_LASTNAME } from '@src/apollo//mutations'

export default {
  name: 'SignupLastname',
  apollo: {
    user: gql`
      {
        user @client {
          name
        }
      }
    `,
  },
  data() {
    return {
      lastname: '',
      invalidLastname: true,
      customError: null,
      hasFocus: null,
    }
  },
  created() {
    if (localStorage.lastname) this.lastname = localStorage.lastname
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      // this.$refs.lastname.setFocus()
      try {
        // if (this.lastname.length === 0) {
        //   this.customError = 'Este campo es necesario'
        //   return
        // }
        // if (this.lastname.length === 1) {
        //   this.customError = 'Tu apellido es muy corto'
        //   return
        // }
        // if (this.invalidLastname) return

        this.$apollo.mutate({
          // Query
          mutation: UPDATE_USER_LASTNAME,
          // Parameters
          variables: {
            lastname: this.lastname,
          },
          error(error) {
            /* eslint-disable */
            console.log(error)
            /* eslint-enable */
          },
        })

        // Result
        /* eslint-disable */
        if (this.$route.query.invitado) {
          // Skip email form if inside invitation flow
          this.$router.push({
            name: 'signupPhone',
            query: {
              invitado: this.$route.query.invitado,
              p: this.$route.query.p,
            },
          })
        } else {
          this.$router.push({ name: 'signupEmail' })
          localStorage.setItem('lastname', this.lastname)
        }
      } catch (error) {}
    },
  },
  watch: {
    lastname() {
      this.customError = ''
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
    <!-- The double click makes this hack useless for a dummy back button -->
    <!-- <div v-if="hasFocus && $utils.isIphone" class="flex mb-12">
      <GxIcon
        icon="keyboard_backspace"
        style=" font-size: 24px;color: #fff;"
        @click="goBack"
        html-tag="button"
      />
    </div> -->
    <p
      v-if="user"
      class="text-white text-center gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¿Cuáles son tus apellidos, {{ user.name }}?</p
    >
    <GxForm class="w-full flex" @submit="onSubmit">
      <GxTextFieldDarkName
        v-model="lastname"
        required
        class="mr-4"
        left-icon="face"
        label="Apellidos"
        assistive=" "
        autofocus
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <!-- <GxInput
        dark
        ref="lastname"
        v-model="lastname"
        placeholder="Apellidos"
        label="Apellidos"
        icon="face"
        class="mr-4"
        pattern="lastname"
        @valid="invalidLastname = $event"
        :autofocus="$utils.isIphone ? false : true"
        :error="customError"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      ></GxInput> -->
      <div>
        <GxButtonCircle
          dark
          icon="arrow_forward"
          label="Guardar"
          type="submit"
        />
      </div>
    </GxForm>
  </div>
</template>
