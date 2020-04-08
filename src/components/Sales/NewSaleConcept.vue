<script>
import SaleItem from '@components/Sales/SaleItem'
import GxIcon from '@components/_Core/Icons/GxIcon'
import Big from 'big.js'

export default {
  name: 'NewSaleConcept',
  components: {
    SaleItem,
    GxIcon,
  },
  data() {
    return {
      saleItems: [{ localId: Date.now() }],
      validated: false,
      formIsEmptyError: '',
      isEditingConceptError: '',
      editingConceptIndex: 0,
    }
  },
  computed: {
    total() {
      const keysOnFirstItem = Object.keys(this.saleItems[0]).length
      if (this.saleItems.length > 1 || keysOnFirstItem > 1) {
        let subtotal = this.saleItems.reduce((total, item) => {
          if ('subtotalAmount' in item) {
            return Big(total)
              .plus(item.subtotalAmount)
              .round(6)
              .valueOf()
          }
          return total
        }, '0')
        subtotal = Big(subtotal)
          .round(2)
          .valueOf()
        // totalTransferredTaxes
        const totalTransferredTaxes = this.$utils.taxesSum(
          this.saleItems,
          'selectedTransferredTaxes'
        )
        const totalWithheldTaxes = this.$utils.taxesSum(
          this.saleItems,
          'selectedWithheldTaxes'
        )
        return Big(subtotal)
          .plus(totalTransferredTaxes)
          .minus(totalWithheldTaxes)
          .round(2)
          .valueOf()
      }
      return '0'
    },
    errorMsg() {
      if (this.total && Number(this.total) > 99999999999999) {
        return `No es posible vender una cantidad mayor a $99,999,999,999,999 en una sola venta.`
      }

      if (this.formIsEmptyError) {
        return this.formIsEmptyError
      }

      if (this.isEditingConceptError) {
        return this.isEditingConceptError
      }

      return null
    },
    formattedTotal() {
      const currency =
        this.sale && this.sale.currency
          ? this.sale.currency.split('-')[0]
          : 'MXN'
      return `$${this.total
        .replace(/^\d+$/, '$&.00')
        .replace(/\.\d$/, '$&0')
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${currency}`
    },
    title() {
      if (this.concepts) {
        return 'nuevo Concepto'
      }
      return 'concepto'
    },
  },
  created() {
    const saleObject = JSON.parse(
      localStorage.getItem('newSale--saleInfoObject')
    )
    if (!saleObject) {
      localStorage.removeItem('newSale--concepts')
      this.$router.push({ name: 'newsalechooseclient' })
      return
    } else {
      this.sale = saleObject
    }
    const saleItems = JSON.parse(localStorage.getItem('newSale--concepts'))
    if (saleItems) {
      this.saleItems = saleItems
      this.editingConceptIndex = this.saleItems.length - 1
      localStorage.removeItem('newSale--concepts')
    }
  },
  beforeDestroy() {
    this.saveSaleItems()
  },
  methods: {
    isSaleItemAtIndexEmpty(index) {
      return (
        !this.saleItems[index].description &&
        !this.saleItems[index].key &&
        !this.saleItems[index].itemAdditionalDataLocalizedInput_MEX &&
        !this.saleItems[index].quantity &&
        !this.saleItems[index].unit &&
        !this.saleItems[index].unitBasePrice
      )
    },
    goBack() {
      this.showDoItLater = true
    },
    saveSaleItems() {
      if (this.saleItems.length) {
        localStorage.setItem(
          'newSale--concepts',
          JSON.stringify(this.saleItems)
        )
      }
    },
    nextStep() {
      if (
        this.saleItems.length === 1 &&
        this.isSaleItemAtIndexEmpty(this.saleItems.length - 1)
      ) {
        this.formIsEmptyError = 'Faltan datos obligatorios'
        return
      }

      if (this.isSaleItemAtIndexEmpty(this.saleItems.length - 1)) {
        this.deleteConcept(this.saleItems[this.saleItems.length - 1].localId)
        this.formIsEmptyError = ''
      }

      if (this.isValid() && !this.errorMsg) {
        this.saveSaleItems()
        this.$router.push({ name: 'additionalinfo' })
      } else {
        if (!this.errorMsg) {
          // El primer tick abre el form con error
          // El segundo tick ya nos permite hacer scroll al error
          this.$nextTick(() => {
            this.$nextTick(() => {
              const element = document.querySelector('.js-error-anchor')
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
            })
          })
        }
        this.validated = true
      }
    },
    isValid() {
      if (this.$refs.saleItem) {
        for (let index = 0; index < this.saleItems.length; index++) {
          if (!this.$refs.saleItem[index].isValid()) {
            this.editingConceptIndex = index
            return false
          }
        }
      }

      return true
    },
    deleteConcept(conceptId) {
      const indexTodoDelete = this.saleItems.findIndex(
        ({ localId }) => localId === conceptId
      )
      this.saleItems = [
        ...this.saleItems.slice(0, indexTodoDelete),
        ...this.saleItems.slice(indexTodoDelete + 1),
      ]

      // Check if the concept deleted was the last one and was also the one being edited. If so, open
      // the new last one
      if (this.editingConceptIndex > this.saleItems.length - 1) {
        this.editingConceptIndex = this.saleItems.length - 1
      }
    },
    onUpdateItem(concept) {
      const indexToUpdate = this.saleItems.findIndex(
        ({ localId }) => localId === concept.localId
      )
      this.saleItems = [
        ...this.saleItems.slice(0, indexToUpdate),
        concept,
        ...this.saleItems.slice(indexToUpdate + 1),
      ]
      this.formIsEmptyError = ''
    },
    onNewItem(concept) {
      if (this.isSaleItemAtIndexEmpty(this.saleItems.length - 1)) {
        this.formIsEmptyError = 'Faltan datos obligatorios'
        return
      }
      this.saleItems.push({ localId: Date.now() })
      this.editingConceptIndex = this.saleItems.length - 1
      this.$nextTick(() => {
        document
          .getElementById(`conceptTitle${this.editingConceptIndex}`)
          .scrollIntoView({
            behavior: 'smooth',
          })
      })
    },
    updateEditingConceptIndex(index) {
      // Before collapsing the last form, check if it's empty, and delete if so
      if (this.isSaleItemAtIndexEmpty(this.saleItems.length - 1)) {
        this.deleteConcept(this.saleItems[this.saleItems.length - 1].localId)
      }
      this.editingConceptIndex = index
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col de:items-center w-screen de:w-full de:mb-4"
  >
    <div class="de:mx-4 de:shadow-3 de:rounded-lg  de:w-108 flex flex-col">
      <section class="pb-2 ml-auto de:pb-4 p-4 de:p-8 pb-8">
        <span
          ref="sectionTitle"
          class="text-gray-400 flex text-right justify-end gx-caption uppercase font-bold"
          >VENTA TOTAL</span
        >
        <h1 class="gx-h4 pt-4 text-right break-all">{{ formattedTotal }}</h1>
      </section>
      <template>
        <div
          v-for="(item, index) in saleItems"
          :key="item.localId"
          class="gx-caption de:gx-caption"
        >
          <p
            :id="`conceptTitle${index}`"
            class="flex text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold py-2 p-4 de:px-8 mb-4"
            >CONCEPTO {{ index + 1 }}
            <button
              v-if="saleItems.length > 1"
              class="flex ml-auto  gx-caption de:gx-caption items-center cursor-pointer"
              @click.prevent="deleteConcept(item.localId)"
              >Eliminar concepto
              <GxIcon
                class="text-alert ml-2"
                icon="remove_circle_outline"/></button
          ></p>
          <SaleItem
            ref="saleItem"
            :key="item.localId"
            :index="index"
            :item="item"
            :edit="editingConceptIndex === index"
            @update="onUpdateItem"
            @click="
              editingConceptIndex !== index
                ? updateEditingConceptIndex(index)
                : null
            "
          />
        </div>
      </template>
      <GxTextLinkIcon
        class="de:mr-8 mr-4 ml-auto"
        text="Agregar concepto"
        @click.stop.prevent="onNewItem"
      />
      <p
        v-if="errorMsg"
        class="text-alert text-center ml-auto mt-2 de:px-8 px-4"
        >{{ errorMsg }}</p
      >
      <GxButton class="ml-auto mr-4 de:mr-8 mt-2 mb-8" @click.stop="nextStep"
        >siguiente</GxButton
      >
    </div>
  </div>
</template>
