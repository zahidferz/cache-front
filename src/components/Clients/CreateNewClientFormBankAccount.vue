<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import banks from '@src/assets/Catalogos/CAT_014_MEX_Bancos_Contabilidad_Electronica.json'

export default {
  name: 'CreateNewClientFormBankAccount',
  components: {
    GxInput,
    GxDropdown,
  },
  props: {
    bankAccount: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      banks,
      bankName: this.bankAccount.bank.name,
      clabe: this.bankAccount.bankAccountDataLocalized.clabe,
      bankAccountNumber: this.bankAccount.bankAccountNumber,
      custombankAccountNumberError: null,
      customAccountClabeError: null,
      id: this.bankAccount.id,
    }
  },
  computed: {
    bankCode() {
      if (this.bankName) {
        const result = this.banks.find(
          (bank) => bank.name.toLowerCase() === this.bankName.toLowerCase()
        )
        return result.bankCode
      }
      return null
    },
  },
  watch: {
    bankCode() {
      this.emitUpdate()
    },
    clabe(newVal) {
      this.emitUpdate()
      if (newVal.length < 18 && newVal.length > 0) {
        this.customAccountClabeError = `La CLABE se compone de 18 dígitos.`
      } else this.customAccountClabeError = null
    },
    bankAccountNumber() {
      this.emitUpdate()
      this.custombankAccountNumberError = null
    },
  },
  methods: {
    emitUpdate() {
      if (!this.banks || !this.banks.find((b) => b.bankCode === this.bankCode))
        return
      this.$emit('update', {
        bank: {
          bankCode: this.bankCode,
          name: this.banks.find((b) => b.bankCode === this.bankCode).name,
        },
        bankAccountDataLocalized: {
          clabe: this.clabe,
        },
        bankAccountNumber: this.bankAccountNumber,
        id: this.id,
      })
    },
  },
}
</script>
<template>
  <div v-if="$mq === 'mo'">
    <GxDropdown
      v-if="banks"
      v-model="bankName"
      placeholder="Banco"
      label="Banco"
      :options="banks.map((b) => b.name.toUpperCase())"
    />
    <GxInput
      v-model="bankAccountNumber"
      label="Cuenta"
      pattern="numeric"
      :maxlength="20"
      placeholder="Cuenta"
      icon="credit_card"
      :error="custombankAccountNumberError"
    />
    <GxInput
      v-model="clabe"
      label="CLABE"
      pattern="numeric"
      placeholder="CLABE"
      icon="vpn_key"
      :error="customAccountClabeError"
      :maxlength="18"
    />
  </div>
  <div v-else class="gxGridContainer px-4">
    <GxDropdown
      v-if="banks"
      v-model="bankName"
      placeholder="Banco"
      label="Banco"
      :options="banks.map((b) => b.name)"
    />
    <GxInput
      v-model="bankAccountNumber"
      label="Cuenta"
      pattern="numeric"
      :maxlength="20"
      placeholder="Cuenta"
      icon="credit_card"
      :error="custombankAccountNumberError"
    />
    <GxInput
      v-model="clabe"
      label="CLABE"
      pattern="clabe"
      placeholder="CLABE"
      icon="vpn_key"
      :error="customAccountClabeError"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
