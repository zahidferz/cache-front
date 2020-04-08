<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxAddressGoogleMaps from '@components/_Core/Forms/GxAddressGoogleMaps'

export default {
  name: 'CreateNewClientFormBankAccount',
  components: {
    GxInput,
    GxAddressGoogleMaps,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.branch.name,
      googleMapsAddress: null,
      address: {
        fullAddress: this.branch.address.fullAddress || '',
        street: this.branch.address.street || '',
        outsideNumber: this.branch.address.outsideNumber || '',
        insideNumber: this.branch.address.insideNumber || '',
        neighborhood: this.branch.address.neighborhood || '',
        municipality: this.branch.address.municipality || '',
        city: this.branch.address.city || '',
        state: this.branch.address.state || '',
        country: this.branch.address.country || '',
        countryCode: this.branch.address.countryCode || '',
        postalCode: this.branch.address.postalCode || '',
        reference: this.branch.address.reference || '',
      },
      id: this.branch.id,
      branchNameError: null,
    }
  },
  watch: {
    name() {
      this.emitUpdate()
    },
    googleMapsAddress(newVal) {
      this.address.fullAddress = this.googleMapsAddress.fullAddress
      this.address.street = this.googleMapsAddress.street
      this.address.outsideNumber = this.googleMapsAddress.outsideNumber
      this.address.insideNumber = this.googleMapsAddress.insideNumber
      this.address.neighborhood = this.googleMapsAddress.neighborhood
      this.address.municipality = this.googleMapsAddress.municipality
      this.address.city = this.googleMapsAddress.city
      this.address.state = this.googleMapsAddress.state
      this.address.country = this.googleMapsAddress.country
      this.address.countryCode = this.googleMapsAddress.countryCode
      this.address.postalCode = this.googleMapsAddress.postalCode
      this.emitUpdate()
    },
  },
  methods: {
    emitUpdate() {
      this.$emit('update', {
        name: this.name,
        address: this.address,
        id: this.id,
      })
    },
  },
}
</script>
<template>
  <div :class="{ gxGridContainer: $mq === 'de' }">
    <GxInput
      v-model="name"
      pattern="business-name"
      placeholder="Nombre de la sucursal"
      label="Nombre de la sucursal"
      icon="store_mall_directory"
      :error="branchNameError"
    />
    <GxAddressGoogleMaps
      v-model="address.fullAddress"
      label="Dirección"
      placeholder="Dirección"
      @validAddress="googleMapsAddress = $event"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
