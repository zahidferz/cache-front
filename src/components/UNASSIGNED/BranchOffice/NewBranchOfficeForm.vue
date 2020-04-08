<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxDropdown from '@components/_Core/Forms/GxDropdown'

export default {
  components: {
    GxInput,
    GxDropdown,
  },
  methods: {
    nextPage() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <h1 class="gx-h3 text-white text-center my-8">¡Creemos otra sucursal!</h1>
    <div class="flex-grow flex flex-col ">
      <GxInput
        label="Nombre o Razón Social"
        placeholder="Nombre o Razón Social"
        dark
        pattern="taxId"
        icon="business"
        class="mb-4"
        input-id="branch-rfc"
      />
      <GxDropdown
        dark
        class="mb-4"
        placeholder="Dirección Fiscal"
        icon="location_on"
        :options="['option 1', 'option 2', 'option 3']"
        label="Some label"
      />
      <GxDropdown
        dark
        placeholder="Tipo de sucursal"
        :options="[
          { name: 'option 4' },
          { name: 'option 5' },
          { name: 'option 6' },
        ]"
        label=""
      />
      <GxInput
        placeholder="Teléfono de la sucursal"
        dark
        label="Teléfono de la sucursal"
        pattern="numeric"
        icon="phone_iphone"
        class="mb-4"
        input-id="branch-phone"
      />
      <GxInput
        placeholder="Mail de la sucursal"
        dark
        label="Mail de la sucursal"
        pattern="email"
        icon="email"
        class="mb-4"
        input-id="branch-mail"
      />
    </div>

    <div class="justify-end m-auto pb-4">
      <GxButton dark class="" @click="nextPage">continuar</GxButton>
    </div>
  </div>
</template>
