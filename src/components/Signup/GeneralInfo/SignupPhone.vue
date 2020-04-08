<script>
import gql from 'graphql-tag'

export default {
  name: 'SignupPhone',
  apollo: {
    user: gql`
      {
        user @client {
          name
          phone
        }
      }
    `,
  },
  data() {
    return {
      phone: '',
      invalidPhone: true,
      customError: '',
      hasFocus: false,
    }
  },
  computed: {
    firstName() {
      if (!this.user) return ''
      return this.user.name.split(' ')[0]
    },
  },
  watch: {
    phone(val) {
      this.customError = ''
    },
  },
  created() {
    if (localStorage.phone) this.phone = localStorage.phone
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      // this.$refs.phone.setFocus()
      // if (this.phone.length === 0) {
      //   this.customError = 'Este campo es necesario'
      // } else {
      //   this.customError = ''
      // }
      // if (this.invalidPhone) {
      //   return
      // }

      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($phone: String!) {
              updateUserPhone(phone: $phone) @client
            }
          `,
          // Parameters
          variables: {
            phone: this.phone.replace(/\D/gi, ''),
          },
        })
        .then(() => {
          if (this.$route.query.invitado) {
            // Skip email form if inside invitation flow
            this.$router.push({
              name: 'signupPassword',
              query: {
                invitado: this.$route.query.invitado,
                p: this.$route.query.p,
              },
            })
          } else {
            this.$router.push({ name: 'signupPassword' })
          }
          localStorage.setItem('phone', this.phone)
        })
    },
  },
}
</script>

<template>
  <div
    class="flex-grow flex flex-col items-center p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
    <!-- The double click makes this hack useless for a dummy back button -->
    <!-- <div
      v-if="hasFocus && $utils.isIphone"
      class="flex justify-start w-full mb-20"
    >
      <GxIcon
        icon="keyboard_backspace"
        style=" font-size: 24px;color: #fff;"
        @click="goBack"
      />
    </div> -->
    <p
      class="text-white text-center gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¿Y tu teléfono de contacto?</p
    >
    <div class="w-full flex">
      <GxForm class="w-full flex" @submit="onSubmit">
        <GxTextFieldDarkPhone
          v-model="phone"
          class="mr-4"
          label="Teléfono"
          assistive=" "
          autofocus
          required
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <!-- <GxInput
          ref="phone"
          v-model="phone"
          dark
          label="Teléfono"
          placeholder="Teléfono"
          class="mr-4"
          pattern="phone"
          :autofocus="$utils.isIphone ? false : true"
          :error="customError"
          @valid="invalidPhone = $event"
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        ></GxInput> -->
        <div>
          <GxButtonCircle
            dark
            label="Guardar"
            icon="arrow_forward"
            data-testid="phone"
            type="submit"
          />
        </div>
      </GxForm>
    </div>
  </div>
</template>
