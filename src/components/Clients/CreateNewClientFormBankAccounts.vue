<script>
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxIcon from '@components/_Core/Icons/GxIcon'
import CreateNewClientFormBankAccount from './CreateNewClientFormBankAccount'

export default {
  name: 'CreateNewClientFormBankAccounts',
  components: {
    GxDivider,
    GxIcon,
    CreateNewClientFormBankAccount,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bankAccountsList: this.value.map((bank, index) => {
        const id = Date.now() + index

        const bankWithId = {
          ...bank,
          id,
        }
        return bankWithId
      }),
    }
  },
  computed: {
    editingClient() {
      if (this.$route.params.clientId) {
        return true
      } else return false
    },
  },
  watch: {
    bankAccountsList(newVal) {
      // Deleting front end validation variables not accepted in the data base
      const bankAccountsData = newVal.filter((account) => {
        // Valid bank accounts must have bank name and at least one of account number or CLABE
        return (
          account.bank.bankCode &&
          (account.bankAccountNumber || account.bankAccountDataLocalized.clabe)
        )
      })

      this.$emit('input', bankAccountsData)
    },
  },
  created() {
    if (this.value.length === 0) {
      this.addBankAccount()
    }
  },
  methods: {
    updateBankAccount(newValue) {
      const updateIndex = this.bankAccountsList.findIndex(
        (b) => b.id === newValue.id
      )
      const newBankAccount = this.bankAccountsList[updateIndex]
      newBankAccount.bank = newValue.bank
      newBankAccount.bankAccountDataLocalized =
        newValue.bankAccountDataLocalized
      newBankAccount.bankAccountNumber = newValue.bankAccountNumber
      this.bankAccountsList = [
        ...this.bankAccountsList.slice(0, updateIndex),
        newBankAccount,
        ...this.bankAccountsList.slice(updateIndex + 1),
      ]
    },
    addBankAccount() {
      const newAccount = {
        id: Date.now(),
        bankAccountNumber: '',
        bank: {
          name: '',
          bankCode: '',
        },
        bankAccountDataLocalized: {
          clabe: '',
        },
      }
      this.bankAccountsList = [...this.bankAccountsList, newAccount]

      if (this.bankAccountsList.length > 1) {
        setTimeout(() => {
          const el = document.getElementById(newAccount.id)
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }, 300)
      }
    },
    removeBankAccount(id) {
      const indexToRemove = this.bankAccountsList.findIndex((b) => b.id === id)
      this.bankAccountsList = [
        ...this.bankAccountsList.slice(0, indexToRemove),
        ...this.bankAccountsList.slice(indexToRemove + 1),
      ]
    },
  },
}
</script>
<template>
  <div>
    <MqLayout mq="mo">
      <GxDivider />
      <div
        class="flex-grow px-4 bg-gray-100 flex items-center text-gray-500 h-8 justify-between"
      >
        <h1 class="uppercase font-bold gx-caption pt-1">Cuenta bancaria</h1>
        <GxTextLink
          class="flex items-center"
          type="button"
          @click.prevent="addBankAccount"
        >
          <span class="mr-1">Agregar cuenta</span>
          <GxIcon icon="add" />
        </GxTextLink>
      </div>
      <GxDivider />
      <div class="flex-grow flex flex-col pt-4">
        <div
          v-for="(bank, index) in bankAccountsList"
          :id="bank.id"
          :key="bank.bankAccountId || bank.id"
          class="flex flex-col"
        >
          <div class="flex justify-end">
            <GxTextLink
              v-if="bankAccountsList.length > 1"
              class="flex mr-4 items-center"
              @click.prevent="removeBankAccount(bank.id)"
            >
              <span class="mr-1">Eliminar cuenta</span>
              <div
                class="bg-gray-200 rounded gxAddOther flex items-center justify-center"
              >
                <GxIcon
                  icon="remove_circle_outline"
                  style="font-size:0.5rem"
                  class="text-alert"
                />
              </div>
            </GxTextLink>
          </div>
          <CreateNewClientFormBankAccount
            :bank-account="bank"
            @update="updateBankAccount($event)"
          />
          <GxDivider
            v-if="index !== bankAccountsList.length - 1"
            class="mb-4 mt-2"
          />
        </div>
      </div>
    </MqLayout>
    <MqLayout mq="de">
      <GxDivider />
      <div
        class="flex-grow px-8 bg-gray-100 flex items-center text-gray-500 h-7 justify-between"
        :class="{ 'mb-4': bankAccountsList.length === 0 }"
      >
        <h1 class="uppercase font-bold de:gx-caption pt-1">Cuenta bancaria</h1>
        <GxTextLink
          class="flex items-center gxDeskLink"
          type="button"
          @click.prevent="addBankAccount"
        >
          <span class="mr-1">Agregar cuenta</span>
          <GxIcon icon="add" />
        </GxTextLink>
      </div>
      <div
        v-for="(bank, index) in bankAccountsList"
        :id="bank.id"
        :key="bank.bankAccountId || bank.id"
        class="flex flex-col pt-4"
      >
        <GxTextLink
          v-if="bankAccountsList.length > 1 || editingClient"
          class="gxDeskLink flex self-end px-8 items-center"
          @click.prevent="removeBankAccount(bank.id)"
        >
          <span class="mr-1 text-gray-700">Eliminar cuenta</span>
          <div
            class="bg-gray-200 rounded flex items-center justify-center h-3 w-3"
          >
            <GxIcon
              icon="remove_circle_outline"
              class="text-alert"
              style="font-size:0.5rem"
            />
          </div>
        </GxTextLink>

        <CreateNewClientFormBankAccount
          :bank-account="bank"
          @update="updateBankAccount($event)"
        />
        <GxDivider
          v-if="index !== bankAccountsList.length - 1"
          class="mb-4 mt-2"
        />
      </div>
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
.gxDeskLink {
  font-size: 12px;
}
</style>
